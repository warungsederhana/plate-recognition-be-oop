const TypeKendaraan = require("../entities/TypeKendaraan");

class TypeKendaraanController {
  async getAllTypeKendaraan(req, res) {
    try {
      const typeKendaraans = await TypeKendaraan.getAll();
      const size = typeKendaraans.length;
      res.status(200).json({
        success: true,
        message: "All type kendaraan fetched successfully",
        size: size,
        data: typeKendaraans,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createTypeKendaraan(req, res) {
    try {
      const typeKendaraan = new TypeKendaraan(req.body);
      const data = await typeKendaraan.save();
      res.status(201).json({
        success: true,
        message: "Type kendaraan created successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getTypeKendaraanByUid(req, res) {
    const { uid } = req.params;
    try {
      const typeKendaraan = await TypeKendaraan.getByUid(uid);
      res.status(200).json({
        success: true,
        message: "Type kendaraan fetched successfully",
        data: typeKendaraan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateTypeKendaraan(req, res) {
    const { uid } = req.params;
    try {
      const typeKendaraan = await TypeKendaraan.getByUid(uid);
      await typeKendaraan.update(req.body);
      res.status(200).json({
        success: true,
        message: "Type kendaraan updated successfully",
        data: typeKendaraan,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteTypeKendaraan(req, res) {
    const { uid } = req.params;
    try {
      const typeKendaraan = await TypeKendaraan.getByUid(uid);
      await typeKendaraan.delete();
      res.status(200).json({
        success: true,
        message: "Type kendaraan deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = TypeKendaraanController;
