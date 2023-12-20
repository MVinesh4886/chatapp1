require("dotenv").config();
const db = require("./config/database");
const User = require("../chatapp/model/User");
const userRoute = require("../chatapp/route/userRoute");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    // methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
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
