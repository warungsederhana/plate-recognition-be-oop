const NegaraAsal = require("../entities/NegaraAsal");
const Kendaraan = require("../entities/Kendaraan");
const MerekKendaraan = require("../entities/MerekKendaraan");
const TypeKendaraan = require("../entities/TypeKendaraan");
const JenisKendaraan = require("../entities/JenisKendaraan");

class MainController {
  async getAllData(req, res) {
    try {
      const negaraAsals = (await NegaraAsal.getAll()).map((negaraAsal) => ({
        id: negaraAsal.id,
        nama_negara: negaraAsal.nama_negara,
        kode_negara: negaraAsal.kode_negara,
      }));
      const kendaraans = (await Kendaraan.getAll()).map((kendaraan) => ({
        nama_pemilik: kendaraan.nama_pemilik,
        no_polisi: kendaraan.no_polisi,
        no_bpkb: kendaraan.no_bpkb,
        no_mesin: kendaraan.no_mesin,
        no_rangka: kendaraan.no_rangka,
      }));
      const merekKendaraans = (await MerekKendaraan.getAll()).map((merekKendaraan) => ({
        id: merekKendaraan.id,
        nama_merek: merekKendaraan.nama_merek,
        kode_negara_asal: merekKendaraan.kode_negara_asal,
      }));
      const typeKendaraans = (await TypeKendaraan.getAll()).map((typeKendaraan) => ({
        id: typeKendaraan.id,
        nama_type_kendaraan: typeKendaraan.nama_type_kendaraan,
        id_jenis_kendaraan: typeKendaraan.id_jenis_kendaraan,
        id_merek_kendaraan: typeKendaraan.id_merek_kendaraan,
        kode_negara_asal: typeKendaraan.kode_negara_asal,
      }));
      const jenisKendaraans = (await JenisKendaraan.getAll()).map((jeniKendaran) => ({
        id: jeniKendaran.id,
        nama_jenis_kendaraan: jeniKendaran.nama_jenis_kendaraan,
        kode_jenis_kendaraan: jeniKendaran.kode_jenis_kendaraan,
        jumlah_sumbu: jeniKendaran.jumlah_sumbu,
      }));

      const negaraAsalSize = negaraAsals.length;
      const kendaraanSize = kendaraans.length;
      const merekKendaraanSize = merekKendaraans.length;
      const typeKendaraanSize = typeKendaraans.length;
      const jenisKendaraanSize = jenisKendaraans.length;

      const data = {
        negaraAsal: {
          title: "NEGARA ASAL",
          size: negaraAsalSize,
          data: negaraAsals,
        },
        kendaraan: {
          title: "KENDARAAN",
          size: kendaraanSize,
          data: kendaraans,
        },
        merekKendaraan: {
          title: "MEREK KENDARAAN",
          size: merekKendaraanSize,
          data: merekKendaraans,
        },
        typeKendaraan: {
          title: "TYPE KENDARAAN",
          size: typeKendaraanSize,
          data: typeKendaraans,
        },
        jenisKendaraan: {
          title: "JENIS KENDARAAN",
          size: jenisKendaraanSize,
          data: jenisKendaraans,
        },
      };

      res.status(200).json({
        success: true,
        message: "All data fetched successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = MainController;
