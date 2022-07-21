const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
// require("./db/db");
const { sequelize } = require("./models/index");
sequelize.sync({ alter: true }).then(() => {
  console.log("DB successfully");
});
app.use(express.json());
app.use(cors());

const commentsRoute = require("./routers/routes/commentsRoute");
const tagssRoute = require("./routers/routes/tagsRoute");
const favoritesRoute = require("./routers/routes/favoritesRoute");
const watchListsRoute = require("./routers/routes/watchListsRoute");

////////////////////////////

app.use("/comments", commentsRoute);
app.use("/tags", tagssRoute);
app.use("/favorites", favoritesRoute);
app.use("/watchLists", watchListsRoute);

////////////////////////////
const Port = 30252;
app.listen(Port, () => {
  console.log("server is running on " + Port);
});
