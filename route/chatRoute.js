const express = require("express");
const chatRoute = express.Router();
const {
  createMessage,
  getMessage,
  uploadFile,
} = require("../controller/ChatCtrl");
const isLogin = require("../middleware/Auth");

chatRoute.post("/createMessage/:id", isLogin, createMessage);
chatRoute.get("/getMessage/:id", isLogin, getMessage);
chatRoute.post("/upload/:id", isLogin, uploadFile);

module.exports = chatRoute;
