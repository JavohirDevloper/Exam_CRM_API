const express = require("express");
const router = express.Router();
const directionController = require("../controllers/direction.contr");
const isLoggedIn = require("../../shared/auth/is-loggedin");

router.get("/direction", isLoggedIn, directionController.getAllDirections);
router.get("/direction/:id", isLoggedIn, directionController.getDirectionById);
router.post("/direction", isLoggedIn, directionController.createDirection);
router.put("/direction/:id", isLoggedIn, directionController.updateDirection);
router.delete(
  "/direction/:id",
  isLoggedIn,
  directionController.deleteDirection
);

module.exports = router;
