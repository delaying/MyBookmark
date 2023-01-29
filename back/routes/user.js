const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User, Folder, Subfolder, Site, Hashtag } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        // 비밀번호만 제외하고 가져온다는 뜻
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Folder,
          },
          {
            model: Subfolder,
          },
          {
            model: Site,
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//POST /user
router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    // 공식문서 보고 함수가 비동기인지 아닌지 찾아보아야함!
    // email unique검사
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      //이메일이 이미 존재하면 404에러띄움
      //   res는 무조건 한번만 보내야하므로 이메일존재시 return사용하여 res.send한번만 보낼수있도록
      return res.status(403).send("이미 사용중인 아이디입니다.");
      //   400번대는 클라이언트 요청에서 잘못됐을때, 500번대는 서버에서 처리시 잘못됐을때 띄움
    }
    // 숫자는 10~13 숫자가클수록 오래걸림
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send("ok"); //201은 잘 생성됨 이라는 뜻
  } catch (error) {
    console.error(error);
    next(error); //status 500 (서버쪽에러이므로)
  }
});

//POST /user/login
//미들웨어 확장 - express기법
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    //클라이언트에러
    if (info) {
      //401은 허가되지않음 이라는 뜻.
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        // 비밀번호만 제외하고 가져온다는 뜻
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Folder,
          },
          {
            model: Subfolder,
          },
          {
            model: Site,
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout(() => {
    res.send("ok");
  });
});

module.exports = router;
