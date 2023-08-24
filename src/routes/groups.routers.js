const express = require("express");
const groupController = require("../controllers/groups.contr");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const router = express.Router();

router.get("/groups", isLoggedIn, groupController.getAllGroups);
router.get("/groups/:id", isLoggedIn, groupController.getGroupById);
router.post("/groups", isLoggedIn, groupController.createGroup);
router.put("/groups/:id", isLoggedIn, groupController.updateGroup);
router.delete("/groups/:id", isLoggedIn, groupController.deleteGroup);

module.exports = router;
