const JenisKendaraan = require("../entities/JenisKendaraan");

class JenisKendaraanController {
  async getAllJenisKendaraan(req, res) {
    try {
      const jenisKendaraans = await JenisKendaraan.getAll();
      const size = jenisKendaraans.length;
      res.status(200).json({
        success: true,
        message: "All jenis kendaraan fetched successfully",
        size: size,
        data: jenisKendaraans,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createJenisKendaraan(req, res) {
    try {
      const jenisKendaraan = new JenisKendaraan(req.body);
      const data = await jenisKendaraan.save();
      res.status(201).json({
        success: true,
        message: "Jenis kendaraan created successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getJenisKendaraanByUid(req, res) {
    const { uid } = req.params;
    try {
      const jenisKendaraan = await JenisKendaraan.getByUid(uid);
      res.status(200).json({
        success: true,
        message: "Jenis kendaraan fetched successfully",
        data: jenisKendaraan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateJenisKendaraan(req, res) {
    const { uid } = req.params;
    try {
      const jenisKendaraan = await JenisKendaraan.getByUid(uid);
      await jenisKendaraan.update(req.body);
      res.status(200).json({
        success: true,
        message: "Jenis kendaraan updated successfully",
        data: jenisKendaraan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteJenisKendaraan(req, res) {
    const { uid } = req.params;
    try {
      const jenisKendaraan = await JenisKendaraan.getByUid(uid);
      await jenisKendaraan.delete();
      res.status(200).json({
        success: true,
        message: "Jenis kendaraan deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = JenisKendaraanController;
