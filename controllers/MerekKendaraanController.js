const MerekKendaraan = require("../entities/MerekKendaraan");

class MerekKendaraanController {
  async getAllMerekKendaraan(req, res) {
    try {
      const merekKendaraans = await MerekKendaraan.getAll();
      const size = merekKendaraans.length;
      res.status(200).json({
        success: true,
        message: "All merek kendaraan fetched successfully",
        size: size,
        data: merekKendaraans,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createMerekKendaraan(req, res) {
    try {
      const merekKendaraan = new MerekKendaraan(req.body);
      const data = await merekKendaraan.save();
      res.status(201).json({
        success: true,
        message: "Merek kendaraan created successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getMerekKendaraanById(req, res) {
    const { uid } = req.params;
    try {
      const merekKendaraan = await MerekKendaraan.getByUid(uid);
      res.status(200).json({
        success: true,
        message: "Merek kendaraan fetched successfully",
        data: merekKendaraan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateMerekKendaraan(req, res) {
    const { uid } = req.params;
    try {
      const merekKendaraan = await MerekKendaraan.getByUid(uid);
      await merekKendaraan.update(req.body);
      res.status(200).json({
        success: true,
        message: "Merek kendaraan updated successfully",
        data: merekKendaraan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteMerekKendaraan(req, res) {
    const { uid } = req.params;
    try {
      const merekKendaraan = await MerekKendaraan.getByUid(uid);
      await merekKendaraan.delete();
      res.status(200).json({
        success: true,
        message: "Merek kendaraan deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = MerekKendaraanController;
