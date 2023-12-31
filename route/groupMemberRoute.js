const express = require("express");
const groupMemberRoute = express.Router();
const {
  addUserToGroup,
  getUserGroup,
  removeGroupMember,
  makeAdmin,
  removeAdmin,
} = require("../controller/GroupMemberCtrl");
const isLogin = require("../middleware/Auth");

groupMemberRoute.post("/addUserToGroup/:id", isLogin, addUserToGroup);

groupMemberRoute.get("/getUserGroup/:id", isLogin, getUserGroup);

groupMemberRoute.delete(
  "/GroupId/:groupId/userId/:userId",
  isLogin,
  removeGroupMember
);

groupMemberRoute.post("/makeAdmin/:id", isLogin, makeAdmin);
groupMemberRoute.post("/removeAdmin/:id", isLogin, removeAdmin);

module.exports = groupMemberRoute;
