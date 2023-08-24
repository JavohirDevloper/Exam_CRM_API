const Department = require("../schemas/departament.schemas");

// Barcha deportamentlarni olish
exports.getAllDeportaments = async (req, res) => {
  try {
    const deportaments = await Department.find().populate("center_ref_id");
    res.json(deportaments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Deportamentlarni olishda xatolik yuz berdi." });
  }
};
// Get directions and positions by department
// exports.getDirectionsAndPositionsByDepartment = async (req, res) => {
//   const { department, directions, positions } = req.params;
//   const { positions: positionsFilter, directions: directionsFilter } =
//     req.query;

//   try {
//     let query = {};

//     if (positionsFilter) {
//       query["pos_ref_id.name"] = positionsFilter;
//     }

//     if (directionsFilter) {
//       query["dir_ref_id.name"] = directionsFilter;
//     }

//     if (department && directions && positions) {
//       const departmentData = await Department.findById(department)
//         .populate({
//           path: "directions",
//           match: { _id: directions },
//           populate: {
//             path: "groups",
//             populate: { path: "users", match: query },
//           },
//         })
//         .populate({
//           path: "positions",
//           match: { _id: positions },
//           populate: { path: "users", match: query },
//         });

//       res.json(departmentData);
//     } else if (department && directions) {
//       const departmentData = await Department.findById(department).populate({
//         path: "directions",
//         match: { _id: directions },
//         populate: {
//           path: "groups",
//           populate: { path: "users", match: query },
//         },
//       });

//       res.json(departmentData);
//     } else if (department && positions) {
//       const departmentData = await Department.findById(department).populate({
//         path: "positions",
//         match: { _id: positions },
//         populate: { path: "users", match: query },
//       });

//       res.json(departmentData);
//     } else if (department) {
//       const departmentData = await Department.findById(department)
//         .populate({
//           path: "directions",
//           populate: {
//             path: "groups",
//             populate: { path: "users", match: query },
//           },
//         })
//         .populate("positions");

//       res.json(departmentData);
//     } else {
//       res.status(400).json({ error: "Invalid request parameters." });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while retrieving data." });
//   }
// };
// ID bo'yicha deportamentni olish
exports.getDeportamentById = async (req, res) => {
  try {
    const deportament = await Department.findById(req.params.id)
      .populate("center_ref_id")
      .select("positions");
    if (!deportament) {
      return res.status(404).json({ error: "Deportament topilmadi." });
    }
    res.json(deportament);
  } catch (error) {
    res.status(500).json({ error: "Deportamentni olishda xatolik yuz berdi." });
  }
};

// Yangi deportament yaratish
exports.createDeportament = async (req, res) => {
  const { deportament_id, deportament_name, center_ref_id } = req.body;
  try {
    const deportament = new Department({
      deportament_id,
      deportament_name,
      center_ref_id,
    });
    const savedDeportament = await deportament.save();
    const populatedDeportament = await Department.findById(
      savedDeportament._id
    ).populate("center_ref_id");
    res.status(201).json(populatedDeportament);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Deportament yaratishda xatolik yuz berdi." });
  }
};

// ID bo'yicha deportamentni yangilash
exports.updateDeportament = async (req, res) => {
  const { id } = req.params;
  const { deportament_id, deportament_name, center_ref_id } = req.body;
  try {
    const deportament = await Department.findByIdAndUpdate(
      id,
      { deportament_id, deportament_name, center_ref_id },
      { new: true }
    ).populate("center_ref_id");
    if (!deportament) {
      return res.status(404).json({ error: "Deportament topilmadi." });
    }
    res.json(deportament);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Deportamentni yangilashda xatolik yuz berdi." });
  }
};

// ID bo'yicha deportamentni o'chirish
exports.deleteDeportament = async (req, res) => {
  const { id } = req.params;
  try {
    const deportament = await Department.findByIdAndUpdate(id).populate(
      "center_ref_id"
    );
    if (!deportament) {
      return res.status(404).json({ error: "Deportament topilmadi." });
    }
    res.json({ message: "Deportament muvaffaqiyatli o'chirildi." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Deportamentni o'chirishda xatolik yuz berdi." });
  }
};
