const Position = require("../schemas/position.schemas");

// Get all positions
exports.getAllPositions = async (req, res) => {
  try {
    const positions = await Position.find().populate("dep_ref_id");
    res.json(positions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving positions." });
  }
};

// Get position by ID
exports.getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id).populate("dep_ref_id");
    if (!position) {
      return res.status(404).json({ error: "Position not found." });
    }
    res.json(position);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the position." });
  }
};

// Create a new position
exports.createPosition = async (req, res) => {
  const { pos_id, dep_ref_id, pos_name, delete_at, salary } = req.body;
  try {
    const position = new Position({
      pos_id,
      dep_ref_id,
      pos_name,
      salary,
      delete_at,
    }) 
    const savedPosition = await position.save();
    const populatedPosition = await Position.findById(
      savedPosition._id
    ).populate("dep_ref_id");
    res.status(201).json(populatedPosition);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the position." });
  }
};

// Update position by ID
exports.updatePosition = async (req, res) => {
  const { id } = req.params;
  const { pos_id, dep_ref_id, pos_name, delete_at, salary } = req.body;
  try {
    const position = await Position.findByIdAndUpdate(
      id,
      { pos_id, dep_ref_id, pos_name, delete_at, salary },
      { new: true }
    ).populate("dep_ref_id");
    if (!position) {
      return res.status(404).json({ error: "Position not found." });
    }
    res.json(position);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the position." });
  }
};

// Delete position by ID
exports.deletePosition = async (req, res) => {
  const { id } = req.params;
  try {
    const position = await Position.findByIdAndUpdate(id).populate(
      "dep_ref_id"
    );
    if (!position) {
      return res.status(404).json({ error: "Position not found." });
    }
    res.json({ message: "Position deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the position." });
  }
};
