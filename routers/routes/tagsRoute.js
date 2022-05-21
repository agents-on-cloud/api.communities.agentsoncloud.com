const express = require("express");
const tagssRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const { getAllTags, addTag } = require("../controllers/tags");

/* -------------------------------------------------------------------------------------------------------------- */

tagssRoute.get("/allTags", getAllTags);
tagssRoute.post("/addTag", addTag);

/* -------------------------------------------------------------------------------------------------------------- */

module.exports = tagssRoute;
