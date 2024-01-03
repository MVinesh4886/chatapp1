require("dotenv").config();

const express = require("express");
const db = require("./config/database");
const path = require("path");
const User = require("../chatapp/model/User");
const Messages = require("../chatapp/model/Chat");
const Group = require("../chatapp/model/Group");
const GroupMember = require("../chatapp/model/GroupMember");
const userRoute = require("../chatapp/route/userRoute");
const chatRoute = require("../chatapp/route/chatRoute");
const groupRoute = require("../chatapp/route/groupRoute");
const groupMemberRoute = require("../chatapp/route/groupMemberRoute");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

User.hasMany(Group); //a User can have multiple groups.
Group.belongsTo(User); //a group belongs to a single user.

Group.hasMany(GroupMember); //a group can have multiple group members.
GroupMember.belongsTo(User); //a group member belongs to a single user.

User.hasMany(Messages); //a user can have multiple messages.
Messages.belongsTo(Group); //messages belongs to a single group.

User.belongsToMany(Group, { through: "GroupMember" }); //a user can belong to multiple groups, and a group can have multiple users.
Group.belongsToMany(User, { through: "GroupMember" }); //a group can belong to multiple users, and a users can have multiple groups.

const cors = require("cors");

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

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `Frontend/${req.url}`));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // console.log(socket);
  console.log("Id of the socket: ", socket.id);
});

const PORT = process.env.PORT;

db.sync()
  .then((result) => {
    // console.log(result);
    // app.listen(PORT, () => {
    //   console.log(`Server is listening on ${PORT}`);
    // });
    console.log("Database and tables created!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
