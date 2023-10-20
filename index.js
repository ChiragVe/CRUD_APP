//Using the express,jsonwebtoken,auth modules
const express = require("express");
const auth = require("./Controllers/AuthController.js");
const task = require("./Controllers/TodoController.js");
const dotenv = require("dotenv");
dotenv.config();
require("./Database/dbconnection.js");

//initialize the app variable
const app = express();

//Allowing the app to use json
app.use(express.json());

//Use the auth Controller file
app.use("/auth", auth);

//Use the todo Controller file
app.use("/todo", task);
app.get("", (_req, res) => {
  res.json({
    message: "This is an authentication API using JWT",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at port: ` + PORT);
});
