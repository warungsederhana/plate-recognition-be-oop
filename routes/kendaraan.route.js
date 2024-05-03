const express = require("express");
const router = express.Router();
const KendaraanController = require("../controllers/KendaraanController");
const kendaraanController = new KendaraanController();
const middleware = require("../middlewares/auth.middleware");

// spesifik route untuk mendapatkan kendaraan berdasarkan nomor polisi
router.get("/no-polisi/:no_polisi", middleware.isUserMiddleware, (req, res) =>
  kendaraanController.getKendaraanByNoPolisi(req, res)
);

// route khusus untuk admin
router.get("/", [middleware.isUserMiddleware, middleware.isAdminMiddleware], (req, res) =>
  kendaraanController.getAllKendaraan(req, res)
);
router.post("/", [middleware.isUserMiddleware, middleware.isAdminMiddleware], (req, res) =>
  kendaraanController.createKendaraan(req, res)
);
router.get("/:uid", [middleware.isUserMiddleware, middleware.isAdminMiddleware], (req, res) =>
  kendaraanController.getKendaraanByUid(req, res)
);
router.put("/:uid", [middleware.isUserMiddleware, middleware.isAdminMiddleware], (req, res) =>
  kendaraanController.updateKendaraan(req, res)
);
router.delete("/:uid", [middleware.isUserMiddleware, middleware.isAdminMiddleware], (req, res) =>
  kendaraanController.deleteKendaraan(req, res)
);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const KendaraanController = require("../controllers/KendaraanController");
// const kendaraanController = new KendaraanController();
// const middleware = require("../middlewares/auth.middleware");

// // memberikan middleware otentikasi ke semua rute merek kendaraan
// router.use([middleware.isUserMiddleware, middleware.isAdminMiddleware]);

// router.get("/", (req, res) => kendaraanController.getAllKendaraan(req, res));
// router.post("/", (req, res) => kendaraanController.createKendaraan(req, res));
// router.get("/:uid", (req, res) => kendaraanController.getKendaraanByUid(req, res));
// router.put("/:uid", (req, res) => kendaraanController.updateKendaraan(req, res));
// router.delete("/:uid", (req, res) => kendaraanController.deleteKendaraan(req, res));
// router.get("/no-polisi/:no_polisi", (req, res) =>
//   kendaraanController.getKendaraanByNoPolisi(req, res)
// );

// module.exports = router;
