const Income = require("../schemas/income.schemas");
const Outlay = require("../schemas/outly.schemas");
const User = require("../schemas/user.schemas");

// Get all incomes
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().populate("user_ref_id");
    res.json(incomes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving incomes." });
  }
};
exports.getIncomesByMonth = async (req, res) => {
  const { month } = req.query;
  try {
    const incomes = await Income.find({ month: Number(month) }).populate("user_ref_id");
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: "Belgilangan oylik (month) incomes ma'lumotlarini olishda xatolik yuz berdi." });
  }
};

exports.getAllOutlays = async (req, res) => {
  try {
    const outlays = await Outlay.find().populate("user_ref_id");
    res.json(outlays);
  } catch (error) {
    res.status(500).json({ error: "Outlay ma'lumotlarini olishda xatolik yuz berdi." });
  }
};

exports.getOutlaysByMonth = async (req, res) => {
  const { month } = req.query;
  try {
    const outlays = await Outlay.find({ month: Number(month) }).populate("user_ref_id");
    res.json(outlays);
  } catch (error) {
    res.status(500).json({ error: "Belgilangan oylik (month) outlay ma'lumotlarini olishda xatolik yuz berdi." });
  }
};
// Get incomes and outlay
exports.getIncomesAndOutlay = async (req, res) => {
  const { month } = req.query;

  try {
    let query = {};

    if (month) {
      query.month = month;
    }

    if (req.path === "/incomes") {
      const incomes = await Income.find(query);

      res.json(incomes);
    } else if (req.path === "/outlay") {
      const outlays = await Outlay.find(query);

      res.json(outlays);
    } else {
      res.status(404).json({ error: "Invalid URL path." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving data." });
  }
};
// Get income by ID
exports.getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id).populate("user_ref_id");
    if (!income) {
      return res.status(404).json({ error: "Income not found." });
    }
    res.json(income);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the income." });
  }
};

// Create a new income
exports.createIncome = async (req, res) => {
  const { income_id, user_ref_id, reason, amount, inc_time } = req.body;
  try {
    const user = await User.findById(user_ref_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const income = new Income({
      income_id,
      user_ref_id,
      reason,
      amount,
      inc_time,
    });
    income.user_ref_id = user;
    await income.save();

    res.status(201).json(income);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the income." });
  }
};
// Update income by ID
exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const { income_id, user_ref_id, reason, amount, inc_time } = req.body;
  try {
    const income = await Income.findByIdAndUpdate(
      id,
      { income_id, user_ref_id, reason, amount, inc_time },
      { new: true }
    ).populate("user_ref_id");
    if (!income) {
      return res.status(404).json({ error: "Income not found." });
    }
    res.json(income);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the income." });
  }
};

// Delete income by ID
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findByIdAndUpdate(id);
    if (!income) {
      return res.status(404).json({ error: "Income not found." });
    }
    res.json({ message: "Income deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the income." });
  }
};
