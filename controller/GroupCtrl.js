const Group = require("../model/Group");
// Controller to create a new group
const createGroup = async (req, res) => {
  try {
    const { GroupName } = req.body;

    // We Create the group with a GroupName;
    const group = await Group.create({ GroupName });

    res.status(201).json({
      message: "Group created successfully",
      // group,
      id: group.id,
      GroupName: group.GroupName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getCreatedGroup = async (req, res) => {
  try {
    const createdGroup = await Group.findAll();
    res.status(200).json({ createdGroup });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createGroup, getCreatedGroup };

// Add the group creator as a group member
// await GroupMember.create({
//   GroupId: group.id,
//   userId: req.user.id, //authenticated userId
// });
