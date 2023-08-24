const Check = require("../schemas/checks.schemas");
const Group = require("../schemas/groups.schemas");
const User = require("../schemas/user.schemas");

// Get all checks
exports.getAllChecks = async (req, res) => {
  try {
    const checks = await Check.find()
      .populate("gr_ref_id")
      .populate("user_ref_id");
    res.json(checks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving checks." });
  }
};

// Get check by ID
exports.getCheckById = async (req, res) => {
  try {
    const check = await Check.findById(req.params.id)
      .populate("gr_ref_id")
      .populate("user_ref_id");
    if (!check) {
      return res.status(404).json({ error: "Check not found." });
    }
    res.json(check);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the check." });
  }
};

// Create a new check
exports.createCheck = async (req, res) => {
  const { check_id, gr_ref_id, user_ref_id, not_in_class, add_date } = req.body;
  try {
    const group = await Group.findById(gr_ref_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found." });
    }

    const user = await User.findById(user_ref_id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const check = await Check.create({
      check_id,
      gr_ref_id,
      user_ref_id,
      not_in_class,
      add_date,
    });
    res.status(201).json(check);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the check." });
  }
};

// Update check by ID
exports.updateCheck = async (req, res) => {
  const { id } = req.params;
  const { check_id, check_name, description } = req.body;
  try {
    const check = await Check.findByIdAndUpdate(
      id,
      { check_id, check_name, description },
      { new: true }
    );
    if (!check) {
      return res.status(404).json({ error: "Check not found." });
    }
    res.json(check);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the check." });
  }
};

// Delete check by ID
exports.deleteCheck = async (req, res) => {
  const { id } = req.params;
  try {
    const check = await Check.findByIdAndUpdate(id);
    if (!check) {
      return res.status(404).json({ error: "Check not found." });
    }
    res.json({ message: "Check deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the check." });
  }
};
