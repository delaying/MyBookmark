const express = require("express");

const { Hashtag, User, Site, Folder, Subfolder } = require("../models");

const router = express.Router();

router.get("/:hashtag", async (req, res, next) => {
  // GET /hashtag/노드
  try {
    const sites = await Site.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.hashtag) },
        },
        {
          model: Folder,
        },
        {
          model: Subfolder,
        },
      ],
    });
    res.status(200).json(sites);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
