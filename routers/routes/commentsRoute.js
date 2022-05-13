const express = require("express");
const commentsRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const {
  crateComment,
  getTaskCooments,
  deleteComment,
  addReplay,
  getAllReplay,
  deleteReplay,
  updateComment,
  updateReplay,
} = require("../controllers/comments");

/* -------------------------------------------------------------------------------------------------------------- */

commentsRoute.post("/addComment", crateComment);
commentsRoute.put("/updateComment/:id", updateComment);
commentsRoute.delete("/deleteComment/:id", deleteComment);
commentsRoute.get("/task/:id/:type", getTaskCooments);
commentsRoute.post("/addReplay", addReplay);
commentsRoute.get("/getReplays/:id", getAllReplay);
commentsRoute.delete("/deleteReplay/:id", deleteReplay)
commentsRoute.put("/updateReplay/:id", updateReplay);


/* -------------------------------------------------------------------------------------------------------------- */

module.exports = commentsRoute;
