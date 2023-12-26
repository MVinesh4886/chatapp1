require("dotenv").config();
const db = require("./config/database");
const User = require("../chatapp/model/User");
const Chat = require("../chatapp/model/Chat");
const Group = require("../chatapp/model/Group");
const GroupMember = require("../chatapp/model/GroupMember");
const userRoute = require("../chatapp/route/userRoute");
const chatRoute = require("../chatapp/route/chatRoute");
const groupRoute = require("../chatapp/route/groupRoute");
const groupMemberRoute = require("../chatapp/route/groupMemberRoute");

Group.hasMany(GroupMember); //a group can have multiple group members.
GroupMember.belongsTo(User); //a group member belongs to a single user.

User.hasMany(Chat); //a user can have multiple chats.
Chat.belongsTo(Group); //chat belongs to a single group.

User.belongsToMany(Group, { through: "GroupMember" }); //a user can belong to multiple groups, and a group can have multiple users.
Group.belongsToMany(User, { through: "GroupMember" }); //a group can belong to multiple users, and a users can have multiple groups.

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
app.use("/api", chatRoute);
app.use("/api", groupRoute);
app.use("/api", groupMemberRoute);

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
