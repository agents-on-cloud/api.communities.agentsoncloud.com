const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
// require("./db/db");
const { sequelize } = require("./models/index");
sequelize.sync({ force: true }).then(() => {
  console.log("DB successfully");
});
app.use(express.json());
app.use(cors());

const commentsRoute = require("./routers/routes/commentsRoute");
const tagssRoute = require("./routers/routes/tagsRoute");

////////////////////////////

app.use("/comments", commentsRoute);
app.use("/tags", tagssRoute);

////////////////////////////
const Port = 30252;
app.listen(Port, () => {
  console.log("server is running on " + Port);
});
