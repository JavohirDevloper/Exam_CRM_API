const Center = require("../schemas/center.schemas");

// CREATE
exports.createCenter = async (req, res) => {
  try {
    const newCenter = new Center(req.body);
    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getCenters = async (req, res) => {
  try {
    const centers = await Center.find();
    res.json(centers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCenterById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Invalid ID parameter" });
    }

    const center = await Center.findById(req.params.id);
    if (!center) {
      return res.status(404).json({ error: "Center not found" });
    }
    res.json(center);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateCenter = async (req, res) => {
  try {
    const center = await Center.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!center) {
      return res.status(404).json({ error: "Center not found" });
    }
    res.json(center);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteCenter = async (req, res) => {
  try {
    const center = await Center.findByIdAndUpdate(req.params.id);
    if (!center) {
      return res.status(404).json({ error: "Center not found" });
    }
    res.json({ message: "Center deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
