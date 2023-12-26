const Message = require("../model/Chat");
const Group = require("../model/Group");
const User = require("../model/User");

// Create a new message
const createMessage = async (req, res) => {
  try {
    const { emailId, content } = req.body;

    const GroupId = req.params.id;

    // Check if the group exists
    const group = await Group.findByPk(GroupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if the user exists
    const user = await User.findOne({ where: { emailId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the message
    const message = await Message.create({
      content,
      userId: user.id,
      GroupId: group.id,
    });

    res.status(200).json({ message: "Message sent successfully", message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

const getMessage = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createMessage, getMessage };
