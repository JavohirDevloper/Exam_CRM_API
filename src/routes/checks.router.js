const express = require("express");
const checkController = require("../controllers/checks.contr");
const isLoggedIn = require('../../shared/auth/is-loggedin')
const router = express.Router();

router.get("/checks",isLoggedIn,  checkController.getAllChecks);
router.get("/checks/:id",isLoggedIn,  checkController.getCheckById);
router.post("/checks",isLoggedIn,  checkController.createCheck);
router.put("/checks/:id", isLoggedIn, checkController.updateCheck);
router.delete("/checks/:id",isLoggedIn,  checkController.deleteCheck);

module.exports = router;
