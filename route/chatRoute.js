const express = require("express");
const chatRoute = express.Router();
const { createMessage, getMessage } = require("../controller/ChatCtrl");
const isLogin = require("../middleware/Auth");

chatRoute.post("/createMessage/:id", isLogin, createMessage);
chatRoute.get("/getMessage", isLogin, getMessage);

module.exports = chatRoute;
