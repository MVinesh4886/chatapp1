const GroupMember = require("../model/GroupMember");
const Group = require("../model/Group");
const User = require("../model/User");

// Add a user to a group
const addUserToGroup = async (req, res) => {
  try {
    const GroupId = req.params.id;
    const group = await Group.findByPk(GroupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ where: { emailId: req.body.emailId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user already exists in the group
    const existingMember = await GroupMember.findOne({
      where: { GroupId: group.id, userId: user.id },
    });

    if (existingMember) {
      return res
        .status(400)
        .json({ error: "User already exists in the group" });
    }

    // Add the user to the group
    await GroupMember.create({ GroupId: group.id, userId: user.id });

    res.status(200).json({ message: "User added to group successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add user to group" });
  }
};

const getUserGroup = async (req, res) => {
  try {
    // const GroupId = req.params.id;
    const userId = req.params.id;
    const members = await GroupMember.findAll({ where: { userId } });
    res.status(200).json({ members });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addUserToGroup, getUserGroup };
