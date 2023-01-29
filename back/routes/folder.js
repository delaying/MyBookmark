const express = require("express");

const { Folder, Subfolder, Site, User, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const folder = await Folder.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullFolder = await Folder.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: Subfolder,
        },
        {
          model: Site,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullFolder);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get(`/:folderId`, isLoggedIn, async (req, res, next) => {
  try {
    const folder = await Folder.findOne({
      where: { id: req.params.folderId },
    });
    if (!folder) {
      return res.status(403).send("존재하지 않는 폴더입니다.");
    }
    const subfolder = await Subfolder.findOne({
      where: { FolderId: folder.id },
      include: [
        {
          model: Subfolder,
        },
        {
          model: Site,
        },
      ],
    });
    res.status(200).json(subfolder);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(`/:folderId/subfolder`, isLoggedIn, async (req, res, next) => {
  try {
    const folder = await Folder.findOne({
      where: { id: req.params.folderId },
    });
    if (!folder) {
      return res.status(403).send("존재하지 않는 폴더입니다.");
    }
    const subfolder = await Subfolder.create({
      subfolder: req.body.subfolder,
      FolderId: parseInt(req.params.folderId, 10),
      UserId: req.user.id,
    });
    res.status(200).json(subfolder);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post(
  `/:folderId/subfolder/:subfolderId/site`,
  isLoggedIn,
  async (req, res, next) => {
    try {
      const hashtags = req.body.explain.match(/#[^\s#]+/g);

      const folder = await Folder.findOne({
        where: { id: req.params.folderId },
      });
      const subfolder = await Subfolder.findOne({
        where: { id: req.params.subfolderId },
      });
      const site = await Site.create({
        link: req.body.link,
        explain: req.body.explain,
        FolderId: parseInt(req.params.folderId, 10),
        SubfolderId: parseInt(req.params.subfolderId, 10),
        UserId: req.user.id,
      });

      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) =>
            Hashtag.findOrCreate({
              where: { name: tag.slice(1).toLowerCase() },
            })
          )
        ); // [[노드, true], [리액트, true]] 이런식으로 생성됨. 그러므로 첫번째만 추출해서 담아주어야함.아래코드!
        await site.addHashtags(result.map((v) => v[0]));
      }
      if (!folder) {
        return res.status(403).send("존재하지 않는 폴더입니다.");
      }
      if (!subfolder) {
        return res.status(403).send("존재하지 않는 서브폴더입니다.");
      }
      res.status(200).json(site);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

//폴더이름변경
router.patch("/:folderId", isLoggedIn, async (req, res, next) => {
  // PATCH /post/10
  try {
    await Folder.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.folderId,
          UserId: req.user.id,
        },
      }
    );
    res.status(200).json({
      FolderId: parseInt(req.params.folderId, 10),
      content: req.body.content,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//서브폴더이름변경
router.patch(
  "/:folderId/subfolder/:subfolderId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      await Subfolder.update(
        {
          subfolder: req.body.listname,
        },
        {
          where: {
            id: req.params.subfolderId,
            FolderId: req.params.folderId,
            UserId: req.user.id,
          },
        }
      );
      res.status(200).json({
        FolderId: parseInt(req.params.folderId, 10),
        SubfolderId: parseInt(req.params.subfolderId, 10),
        subfolder: req.body.listname,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

//사이트 변경
router.patch(
  "/subfolder/:subfolderId/site/:siteId",
  isLoggedIn,
  async (req, res, next) => {
    const hashtags = req.body.explain.match(/#[^\s#]+/g);
    try {
      await Site.update(
        {
          link: req.body.link,
          explain: req.body.explain,
        },
        {
          where: {
            id: req.params.siteId,
            SubfolderId: req.params.subfolderId,
            UserId: req.user.id,
          },
        }
      );
      const site = await Site.findOne({ where: { id: req.params.siteId } });
      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) =>
            Hashtag.findOrCreate({
              where: { name: tag.slice(1).toLowerCase() },
            })
          )
        ); // [[노드, true], [리액트, true]]
        await site.setHashtags(result.map((v) => v[0]));
      }

      res.status(200).json({
        SiteId: parseInt(req.params.siteId, 10),
        SubfolderId: parseInt(req.params.subfolderId, 10),
        link: req.body.link,
        explain: req.body.explain,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

//폴더 삭제
router.delete("/:folderId", isLoggedIn, async (req, res, next) => {
  try {
    await Folder.destroy({
      where: { id: req.params.folderId, UserId: req.user.id },
    });
    res.status(200).json({ FolderId: parseInt(req.params.folderId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//subfolder 삭제
router.delete("/subfolder/:subfolderId", isLoggedIn, async (req, res, next) => {
  try {
    await Subfolder.destroy({
      where: { id: req.params.subfolderId, UserId: req.user.id },
    });
    res.status(200).json({ SubfolderId: parseInt(req.params.subfolderId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//사이트 삭제
router.delete("/site/:siteId", isLoggedIn, async (req, res, next) => {
  try {
    await Site.destroy({
      where: { id: req.params.siteId, UserId: req.user.id },
    });
    res.status(200).json({ SiteId: parseInt(req.params.siteId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//폴더이름 수정
router.patch("/:folderId", isLoggedIn, async (req, res, next) => {
  try {
    await Folder.update(
      {
        content: req.body.content,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ content: req.body.content });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
