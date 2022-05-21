const express = require("express");
const app = express();
const cors = require("cors");
// require("./db/db");
const { sequelize } = require("./models/index");
sequelize.sync();
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
