const express = require("express");

const { Folder, User, Subfolder, Site } = require("../models");

const router = express.Router();

//GET /folders
router.get("/", async (req, res, next) => {
  try {
    const folders = await Folder.findAll({
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
        {
          model: Subfolder,
        },
        {
          model: Site,
        },
      ],
    });
    console.log(folders);
    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
