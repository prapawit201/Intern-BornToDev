const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();

const db = require("./database/config");
const mySqlRoute = require("./route/MySqlRoute");
const Users = require("./route/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/users", Users);
app.use("/api", mySqlRoute);

db.sync({
  force: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
  });
});
