const express = require("express");
const groupMemberRoute = express.Router();
const {
  addUserToGroup,
  getUserGroup,
  removeGroupMember,
} = require("../controller/GroupMemberCtrl");
const isLogin = require("../middleware/Auth");

groupMemberRoute.post("/addUserToGroup/:id", isLogin, addUserToGroup);

groupMemberRoute.get("/getUserGroup/:id", isLogin, getUserGroup);

groupMemberRoute.delete("/removeGroupMember/:id", isLogin, removeGroupMember);
module.exports = groupMemberRoute;
