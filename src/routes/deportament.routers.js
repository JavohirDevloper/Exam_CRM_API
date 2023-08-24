const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/deportament.contr");
const isLoggedIn = require("../../shared/auth/is-loggedin");

router.get("/deportament", isLoggedIn, departmentController.getAllDeportaments);
router.get("/deportament/:id",isLoggedIn, departmentController.getDeportamentById);
router.post("/deportament",isLoggedIn,  departmentController.createDeportament);
router.put("/deportament/:id",isLoggedIn,  departmentController.updateDeportament);
router.delete("/deportament/:id",isLoggedIn,  departmentController.deleteDeportament);

module.exports = router;
