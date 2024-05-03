const express = require("express");
const router = express.Router();
const MerekKendaraanController = require("../controllers/MerekKendaraanController");
const merekKendaraanController = new MerekKendaraanController();
const middleware = require("../middlewares/auth.middleware");

// memberikan middleware otentikasi ke semua rute merek kendaraan
router.use([middleware.isUserMiddleware, middleware.isAdminMiddleware]);

router.get("/", (req, res) => merekKendaraanController.getAllMerekKendaraan(req, res));
router.post("/", (req, res) => merekKendaraanController.createMerekKendaraan(req, res));
router.get("/:uid", (req, res) => merekKendaraanController.getMerekKendaraanById(req, res));
router.put("/:uid", (req, res) => merekKendaraanController.updateMerekKendaraan(req, res));
router.delete("/:uid", (req, res) => merekKendaraanController.deleteMerekKendaraan(req, res));

module.exports = router;
