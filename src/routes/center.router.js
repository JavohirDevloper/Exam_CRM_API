const router = require("express").Router();
const centersController = require("../controllers/center.contr");
const isLoggedin = require("../../shared/auth/is-loggedin");

router.get("/center", isLoggedin, centersController.getCenters);
router.get("/center/:id", isLoggedin, centersController.getCenters);
router.post("/center", isLoggedin, centersController.createCenter);
router.put("/center/:id", isLoggedin, centersController.updateCenter);
router.delete("/center/:id", isLoggedin, centersController.deleteCenter);

module.exports = router;
