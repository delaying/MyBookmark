const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");

const folderRouter = require("./routes/folder");
const foldersRouter = require("./routes/folders");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const app = express();
const passportConfig = require("./passport");

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch(console.error);
passportConfig();

app.use(morgan("dev"));
//cors에러해결
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin:'https://mybookmark'
    // 쿠키를 같이전달하기위해 credentials을 true로 설정
    credentials: true,
  })
);
//  아래코드는 front에서 받은 데이터를 해석하여 db에 넣어줌. 아래2줄은 라우터 위쪽에 있어야함!
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //form데이터를 req.body안에 넣어줌
// 쿠키는 브라우저, 세션은 서버가관리 사용자가 누구인지 정보를담음.
// 쿠키에 user의 id만 매칭해둠으로써 메모리를 아낄 수 있음.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

//중복되는 주소를 아래처럼 작성하여줌! 자동으로 prefix로 붙게됨.
app.use("/folder", folderRouter);
app.use("/folders", foldersRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});
