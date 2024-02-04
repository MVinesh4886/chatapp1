const express = require("express");
const groupRoute = express.Router();
const { createGroup, getCreatedGroup } = require("../controllers/GroupCtrl");
const isLogin = require("../middlewares/Auth");

groupRoute.post("/createGroup", isLogin, createGroup);
groupRoute.get("/getCreatedGroup", isLogin, getCreatedGroup);

module.exports = groupRoute;
