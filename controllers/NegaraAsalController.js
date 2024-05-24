const NegaraAsal = require("../entities/NegaraAsal");

class NegaraAsalController {
  async getAllNegaraAsal(req, res) {
    try {
      const negaraAsals = await NegaraAsal.getAll();
      const size = negaraAsals.length;
      res.status(200).json({
        success: true,
        message: "All Negara Asal fetched successfully",
        size: size,
        data: negaraAsals,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createNegaraAsal(req, res) {
    try {
      const negaraAsal = new NegaraAsal(req.body);
      const data = await negaraAsal.save();
      res.status(201).json({
        success: true,
        message: "Negara Asal created successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getNegaraAsalByUid(req, res) {
    const { uid } = req.params;
    try {
      const negaraAsal = await NegaraAsal.getByUid(uid);
      res.status(200).json({
        success: true,
        message: "Negara Asal fetched successfully",
        data: negaraAsal,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateNegaraAsal(req, res) {
    const { uid } = req.params;
    try {
      const negaraAsal = await NegaraAsal.getByUid(uid);
      await negaraAsal.update(req.body);
      res.status(200).json({
        success: true,
        message: "Negara Asal updated successfully",
        data: negaraAsal,
      });
    } catch (error) {
      console.log(error.message + "ini error");
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteNegaraAsal(req, res) {
    const { uid } = req.params;
    try {
      const negaraAsal = await NegaraAsal.getByUid(uid);
      await negaraAsal.delete();
      res.status(200).json({
        success: true,
        message: "Negara Asal deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = NegaraAsalController;
