const express = require("express");
const router = express.Router();
const { adminLogin, getTokenByCode } = require("../controllers/admin");

router.post("/admin/login", adminLogin);
router.get("/pass/code/:code", getTokenByCode);

module.exports = router;
