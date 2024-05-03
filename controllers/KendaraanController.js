const Kendaraan = require("../entities/Kendaraan");

class KendaraanController {
  async getAllKendaraan(req, res) {
    try {
      const kendaraans = await Kendaraan.getAll();
      const size = kendaraans.length;
      res.status(200).json({
        success: true,
        message: "All kendaraan fetched successfully",
        size: size,
        data: kendaraans,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createKendaraan(req, res) {
    try {
      const kendaraan = new Kendaraan(req.body);
      const data = await kendaraan.save();
      res.status(201).json({
        success: true,
        message: "Kendaraan created successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getKendaraanByUid(req, res) {
    const { uid } = req.params;
    try {
      const kendaraan = await Kendaraan.getByUid(uid);
      res.status(200).json({
        success: true,
        message: "Kendaraan fetched successfully",
        data: kendaraan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getKendaraanByNoPolisi(req, res) {
    const { no_polisi } = req.params;
    try {
      const kendaraan = await Kendaraan.getByNoPolisi(no_polisi);
      res.status(200).json({
        success: true,
        message: "Kendaraan fetched successfully",
        data: kendaraan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateKendaraan(req, res) {
    const { uid } = req.params;
    try {
      const kendaraan = await Kendaraan.getByUid(uid);
      await kendaraan.update(req.body);
      res.status(200).json({
        success: true,
        message: "Kendaraan updated successfully",
        data: kendaraan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteKendaraan(req, res) {
    const { uid } = req.params;
    try {
      const kendaraan = await Kendaraan.getByUid(uid);
      await kendaraan.delete();
      res.status(200).json({
        success: true,
        message: "Kendaraan deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = KendaraanController;
