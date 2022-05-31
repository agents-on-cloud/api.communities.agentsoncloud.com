const express = require("express");
const tagssRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const {
  getAllTags,
  addTag,
  getTagsByIdAndType,
  deleteTag,
} = require("../controllers/tags");

/* -------------------------------------------------------------------------------------------------------------- */

tagssRoute.get("/allTags", getAllTags);
tagssRoute.get("/tag/:id/:type", getTagsByIdAndType);
tagssRoute.post("/addTag", addTag);
tagssRoute.delete("/tag/:id", deleteTag);

/* -------------------------------------------------------------------------------------------------------------- */

module.exports = tagssRoute;
