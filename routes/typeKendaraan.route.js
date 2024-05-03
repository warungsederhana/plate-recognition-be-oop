const express = require("express");
const router = express.Router();
const TypeKendaraanController = require("../controllers/TypeKendaraanController");
const typeKendaraanController = new TypeKendaraanController();
const middleware = require("../middlewares/auth.middleware");

// memberikan middleware otentikasi ke semua rute merek kendaraan
router.use([middleware.isUserMiddleware, middleware.isAdminMiddleware]);

router.get("/", (req, res) => typeKendaraanController.getAllTypeKendaraan(req, res));
router.post("/", (req, res) => typeKendaraanController.createTypeKendaraan(req, res));
router.get("/:uid", (req, res) => typeKendaraanController.getTypeKendaraanByUid(req, res));
router.put("/:uid", (req, res) => typeKendaraanController.updateTypeKendaraan(req, res));
router.delete("/:uid", (req, res) => typeKendaraanController.deleteTypeKendaraan(req, res));

module.exports = router;
