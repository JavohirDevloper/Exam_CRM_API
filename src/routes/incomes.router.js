const express = require("express");
const incomeController = require("../controllers/incomes.contr");
const isLoggedIn = require("../../shared/auth/is-loggedin");

const router = express.Router();

router.get("/income", isLoggedIn, [
  incomeController.getAllIncomes,
  incomeController.getAllOutlays,
  incomeController.getIncomesByMonth,
  incomeController.getOutlaysByMonth,
  incomeController.getIncomesAndOutlay,
]);
router.get("/income/:id", isLoggedIn, incomeController.getIncomeById);
router.get("income", isLoggedIn, incomeController.getIncomesAndOutlay);
router.post("/income", isLoggedIn, incomeController.createIncome);
router.put("/income/:id", isLoggedIn, incomeController.updateIncome);
router.delete("/income/:id", isLoggedIn, incomeController.deleteIncome);

module.exports = router;
