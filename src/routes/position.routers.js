const express = require("express");
const router = express.Router();
const positionController = require("../controllers/position.contr");
const isLoggedIn = require("../../shared/auth/is-loggedin");

router.get("/position", isLoggedIn, positionController.getAllPositions);
router.get("/position/:id", isLoggedIn, positionController.getPositionById);
router.post("/position", isLoggedIn, positionController.createPosition);
router.put("/position/:id", isLoggedIn, positionController.updatePosition);
router.delete("/position/:id", isLoggedIn, positionController.deletePosition);

module.exports = router;
