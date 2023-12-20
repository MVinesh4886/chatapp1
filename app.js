require("dotenv").config();
const db = require("./config/database");
const User = require("../chatapp/model/User");
const userRoute = require("../chatapp/route/userRoute");
const express = require("express");

const app = express();

app.use(express.json());

app.use("/user", userRoute);

const PORT = process.env.PORT;

db.sync()
  .then((result) => {
    // console.log(result);
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
