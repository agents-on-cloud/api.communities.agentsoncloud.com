const express = require("express");
const favoritesRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const {
  createFavorite,
  getFavoritesByUserAndType,
  getFavoritesByEntityAndType,
  deleteFavorite,
  checkFavorite,
} = require("../controllers/favorites");

/* -------------------------------------------------------------------------------------------------------------- */

favoritesRoute.post("/like", createFavorite);
favoritesRoute.get("/check/:user_id/:entity_id/:entity_type", checkFavorite);
favoritesRoute.get("/entities/:user_id/:entity_type", getFavoritesByUserAndType);
favoritesRoute.get("/users/:entity_id/:entity_type", getFavoritesByEntityAndType);
favoritesRoute.put("/unLike/:user_id/:entity_id/:entity_type", deleteFavorite);

/* -------------------------------------------------------------------------------------------------------------- */

module.exports = favoritesRoute;
