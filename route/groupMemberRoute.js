const express = require("express");
const groupMemberRoute = express.Router();
const {
  addUserToGroup,
  getUserGroup,
} = require("../controller/GroupMemberCtrl");
const isLogin = require("../middleware/Auth");

groupMemberRoute.post("/addUserToGroup/:id", isLogin, addUserToGroup);

groupMemberRoute.get("/getUserGroup/:id", isLogin, getUserGroup);

module.exports = groupMemberRoute;
