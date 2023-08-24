const Group = require("../schemas/groups.schemas");
const Position = require("../schemas/position.schemas");
const User = require("../schemas/user.schemas");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("group_ref_id")
      .populate("pos_ref_id");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving users." });
  }
};

///////
exports.getUsersByFilters = async (req, res) => {
  const { group, onsite, username, contact, gender } = req.query;
  try {
    let query = {};

    if (group) {
      query.group_ref_id = group;
    }

    if (onsite === "off") {
      query.onsite = false;
    }

    if (username) {
      query.username = username;
    }

    if (contact) {
      query.contact = contact;
    }

    if (gender) {
      query.gender = gender;
    }

    const users = await User.find(query)
      .populate("group_ref_id")
      .populate("pos_ref_id");

    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving users." });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const {
    user_id,
    first_name,
    last_name,
    email,
    password,
    contact,
    gender,
    group_ref_id,
    pos_ref_id,
    come_date,
    left_date,
  } = req.body;

  try {
    const group = await Group.findById(group_ref_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    const position = await Position.findById(pos_ref_id);
    if (!position) {
      return res.status(404).json({ error: "Position not found" });
    }

    const newUser = new User({
      user_id,
      first_name,
      last_name,
      email,
      password,
      contact,
      gender,
      group_ref_id,
      pos_ref_id,
      come_date,
      left_date,
    });

    newUser.group_ref_id = group;
    newUser.pos_ref_id = position;

    await newUser.save();

    await newUser
      .populate("group_ref_id")
      .populate("pos_ref_id")
      .execPopulate();

    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};
// Update user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, password, role },
      { new: true }
    )
      .populate("group_ref_id")
      .populate("pos_ref_id");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id)
      .populate("group_ref_id")
      .populate("pos_ref_id");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};
