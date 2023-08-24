const Outlay = require("../schemas/outly.schemas");

// Barcha xarajatlarni olish
exports.getAllOutlays = async (req, res) => {
  try {
    const outlays = await Outlay.find();
    res.json(outlays);
  } catch (error) {
    res.status(500).json({ error: "Xarajatlarni olishda xatolik yuz berdi." });
  }
};

// Yangi xarajat yaratish
exports.createOutlay = async (req, res) => {
  const { outlay_id, reason, amount, out_time } = req.body;
  try {
    const outlay = await Outlay.create({ outlay_id, reason, amount, out_time });
    res.status(201).json(outlay);
  } catch (error) {
    res.status(500).json({ error: "Xarajat yaratishda xatolik yuz berdi." });
  }
};
