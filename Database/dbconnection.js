const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Connection of db
const connection = mongoose
  .connect(process.env.DB, { dbName: "auth_users" })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => console.log(err.message));

module.exports = connection;
