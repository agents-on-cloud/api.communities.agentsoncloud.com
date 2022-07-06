const express = require("express");
const watchListRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const {
  createWatchList,
  getWatchListByUserAndType,
  getWatchListByEntityAndType,
  deleteWatchList,
  checkWatchList,
} = require("../controllers/watchLists");

/* -------------------------------------------------------------------------------------------------------------- */
watchListRoute.post("/watch", createWatchList);
watchListRoute.get("/check/:user_id/:entity_id/:entity_type", checkWatchList);
watchListRoute.get("/entities/:user_id/:entity_type", getWatchListByUserAndType);
watchListRoute.get("/users/:entity_id/:entity_type", getWatchListByEntityAndType);
watchListRoute.put("/unWatch/:user_id/:entity_id/:entity_type", deleteWatchList);

/* -------------------------------------------------------------------------------------------------------------- */

module.exports = watchListRoute;
