const { Router } = require("express");
const userContr = require("../controllers/user.contr");
const isLoggedin = require("../../shared/auth/is-loggedin");
const router = Router();

router.get("/users", isLoggedin, userContr.getAllUsers);
router.get("/users/:id", isLoggedin, userContr.getUsersByFilters);
router.post("/users", isLoggedin, userContr.createUser);
router.put("/users/:id", isLoggedin, userContr.updateUser);
router.delete("/users/:id", isLoggedin, userContr.deleteUser);

module.exports = router;
