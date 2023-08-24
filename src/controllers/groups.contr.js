const Group = require("../schemas/groups.schemas");

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("dir_ref_id");
    res.json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving groups." });
  }
};

// Get group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("dir_ref_id");
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }
    res.json(group);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the group." });
  }
};

// Create a new group
exports.createGroup = async (req, res) => {
  const { dir_ref_id, group_id, group_name, begin_date, end_date } = req.body;
  try {
    const group = new Group({
      dir_ref_id,
      group_id,
      group_name,
      begin_date,
      end_date,
    });
    const savedGroup = await group.save();
    const populatedGroup = await Group.findById(savedGroup._id).populate(
      "dir_ref_id"
    );
    res.status(201).json(populatedGroup);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the group." });
  }
};

// Update group by ID
exports.updateGroup = async (req, res) => {
  const { id } = req.params;
  const { group_id, group_name, description } = req.body;
  try {
    const group = await Group.findByIdAndUpdate(
      id,
      { group_id, group_name, description },
      { new: true }
    ).populate("dir_ref_id");
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }
    res.json(group);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the group." });
  }
};

// Delete group by ID
exports.deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findByIdAndUpdate(id).populate("dir_ref_id");
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }
    res.json({ message: "Group deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the group." });
  }
};
