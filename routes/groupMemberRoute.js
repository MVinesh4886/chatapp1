const express = require("express");
const groupMemberRoute = express.Router();
const {
  addUserToGroup,
  getUserGroup,
  removeGroupMember,
  makeAdmin,
  removeAdmin,
} = require("../controllers/GroupMemberCtrl");
const isLogin = require("../middlewares/Auth");

groupMemberRoute.post("/addUserToGroup/:id", isLogin, addUserToGroup);

groupMemberRoute.get("/getUserGroup/:id", isLogin, getUserGroup);

groupMemberRoute.delete(
  "/GroupId/:groupId/userId/:userId",
  isLogin,
  removeGroupMember
);

groupMemberRoute.post("/makeAdmin/:groupId/:userId", isLogin, makeAdmin);
groupMemberRoute.post("/removeAdmin/:groupId/:userId", isLogin, removeAdmin);

module.exports = groupMemberRoute;
