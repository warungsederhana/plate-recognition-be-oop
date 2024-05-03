const express = require("express");
const router = express.Router();
const MainController = require("../controllers/MainController");
const mainController = new MainController();
const middleware = require("../middlewares/auth.middleware");

// memberikan middleware otentikasi ke semua route main
// router.use([middleware.isUserMiddleware, middleware.isAdminMiddleware]);
router.get("/", (req, res) => mainController.getAllData(req, res));

module.exports = router;
