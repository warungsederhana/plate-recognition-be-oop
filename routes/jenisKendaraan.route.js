const express = require("express");
const router = express.Router();
const JenisKendaraanController = require("../controllers/JenisKendaraanController");
const jenisKendaraanController = new JenisKendaraanController();
const middleware = require("../middlewares/auth.middleware");

// memberikan middleware otentikasi ke semua rute merek kendaraan
router.use([middleware.isUserMiddleware, middleware.isAdminMiddleware]);

router.get("/", (req, res) => jenisKendaraanController.getAllJenisKendaraan(req, res));
router.post("/", (req, res) => jenisKendaraanController.createJenisKendaraan(req, res));
router.get("/:uid", (req, res) => jenisKendaraanController.getJenisKendaraanByUid(req, res));
router.put("/:uid", (req, res) => jenisKendaraanController.updateJenisKendaraan(req, res));
router.delete("/:uid", (req, res) => jenisKendaraanController.deleteJenisKendaraan(req, res));

module.exports = router;
