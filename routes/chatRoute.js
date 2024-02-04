const express = require("express");
const chatRoute = express.Router();
const {
  createMessage,
  getMessage,
  uploadFile,
} = require("../controllers/ChatCtrl");
const isLogin = require("../middlewares/Auth");

chatRoute.post("/createMessage/:id", isLogin, createMessage);
chatRoute.get("/getMessage/:id", isLogin, getMessage);
chatRoute.post("/upload/:id", isLogin, uploadFile);

module.exports = chatRoute;
