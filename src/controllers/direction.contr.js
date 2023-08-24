const Direction = require("../schemas/direction.schemas");

// Get all directions
exports.getAllDirections = async (req, res) => {
  try {
    const directions = await Direction.find().populate("dep_ref_id");
    res.json(directions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving directions." });
  }
};

// Get direction by ID
exports.getDirectionById = async (req, res) => {
  try {
    const direction = await Direction.findById(req.params.id).populate(
      "dep_ref_id"
    );
    if (!direction) {
      return res.status(404).json({ error: "Direction not found." });
    }
    res.json(direction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the direction." });
  }
};

// Create a new direction
exports.createDirection = async (req, res) => {
  const {
    dep_id,
    dep_ref_id,
    dir_name,
    duration,
    salary,
    start_date,
    end_date,
  } = req.body;
  try {
    const direction = new Direction({
      dep_id,
      dep_ref_id,
      dir_name,
      duration,
      salary,
      start_date,
      end_date,
    });
    const savedDirection = await direction.save();
    const populatedDirection = await Direction.findById(
      savedDirection._id
    ).populate("dep_ref_id");
    res.status(201).json(populatedDirection);
  } catch (error) {
    res.status(500).json({ error: "Yo'nalish yaratishda xatolik yuz berdi." });
  }
};
// Update direction by ID
exports.updateDirection = async (req, res) => {
  const { id } = req.params;
  const {
    dir_id,
    dep_ref_id,
    dir_name,
    duration,
    salary,
    start_date,
    end_date,
  } = req.body;
  try {
    const direction = await Direction.findByIdAndUpdate(
      id,
      { dir_id, dep_ref_id, dir_name, duration, salary, start_date, end_date },
      { new: true }
    ).populate("dep_ref_id");
    if (!direction) {
      return res.status(404).json({ error: "Direction not found." });
    }
    res.json(direction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the direction." });
  }
};

// Delete direction by ID
exports.deleteDirection = async (req, res) => {
  const { id } = req.params;
  try {
    const direction = await Direction.findByIdAndUpdate(id).populate(
      "dep_ref_id"
    );
    if (!direction) {
      return res.status(404).json({ error: "Direction not found." });
    }
    res.json({ message: "Direction deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the direction." });
  }
};
