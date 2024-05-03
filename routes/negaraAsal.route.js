const express = require("express");
const router = express.Router();
const NegaraAsalController = require("../controllers/NegaraAsalController");
const negaraAsalController = new NegaraAsalController();
const middleware = require("../middlewares/auth.middleware");

// memberikan middleware otentikasi ke semua rute merek kendaraan
router.use([middleware.isUserMiddleware, middleware.isAdminMiddleware]);

router.get("/", (req, res) => negaraAsalController.getAllNegaraAsal(req, res));
router.post("/", (req, res) => negaraAsalController.createNegaraAsal(req, res));
router.get("/:uid", (req, res) => negaraAsalController.getNegaraAsalByUid(req, res));
router.put("/:uid", (req, res) => negaraAsalController.updateNegaraAsal(req, res));
router.delete("/:uid", (req, res) => negaraAsalController.deleteNegaraAsal(req, res));

module.exports = router;
