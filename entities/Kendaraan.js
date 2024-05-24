const { z } = require("zod");
const FirebaseAdmin = require("../libs/FirebaseAdmin");
const { updateTimestampsInObject, convertStringsToDateObjects } = require("../utils/converter");

class Kendaraan {
  constructor(data) {
    this.uid = data.uid;
    this.id = data.id;
    this.no_daftar = data.no_daftar;
    this.no_daftar_eri = data.no_daftar_eri;
    this.id_kepemilikan = data.id_kepemilikan;
    this.no_kk = data.no_kk;
    this.no_polisi = data.no_polisi;
    this.no_polisi_lama = data.no_polisi_lama;
    this.nama_pemilik = data.nama_pemilik;
    this.nama_pemilik_lama = data.nama_pemilik_lama;
    this.alamat1 = data.alamat1;
    this.alamat2 = data.alamat2;
    this.id_kelurahan = data.id_kelurahan;
    this.no_telp = data.no_telp;
    this.id_jenis_kendaraan = data.id_jenis_kendaraan;
    this.id_merek_kendaraan = data.id_merek_kendaraan;
    this.id_type_kendaraan = data.id_type_kendaraan;
    this.id_model_kendaraan = data.id_model_kendaraan;
    this.id_jenis_map = data.id_jenis_map;
    this.tahun_buat = data.tahun_buat;
    this.tahun_rakit = data.tahun_rakit;
    this.tahun_ub = data.tahun_ub;
    this.cylinder = data.cylinder;
    this.id_golongan_kendaraan = data.id_golongan_kendaraan;
    this.id_warna_tnkb = data.id_warna_tnkb;
    this.warna_kendaraan = data.warna_kendaraan;
    this.id_lokasi = data.id_lokasi;
    this.dati2_induk = data.dati2_induk;
    this.id_fungsi_kendaraan = data.id_fungsi_kendaraan;
    this.id_bahan_bakar = data.id_bahan_bakar;
    this.no_rangka = data.no_rangka;
    this.no_mesin = data.no_mesin;
    this.no_bpkb = data.no_bpkb;
    this.jumlah_sumbu = data.jumlah_sumbu;
    this.kode_jenis = data.kode_jenis;
    this.status_blokir = data.status_blokir;
    this.progresif = data.progresif;
    this.progresif_tarif = data.progresif_tarif;
    this.id_pendaftaran = data.id_pendaftaran;
    this.id_lokasi_proses = data.id_lokasi_proses;
    this.dati2_proses = data.dati2_proses;
    this.tujuan_mutasi = data.tujuan_mutasi;
    this.tanggal_faktur = data.tanggal_faktur;
    this.tanggal_kwitansi = data.tanggal_kwitansi;
    this.tanggal_akhir_stnk = data.tanggal_akhir_stnk;
    this.tanggal_akhir_stnk_lama = data.tanggal_akhir_stnk_lama;
    this.tanggal_jatuh_tempo = data.tanggal_jatuh_tempo;
    this.tanggal_jatuh_tempo_lama = data.tanggal_jatuh_tempo_lama;
    this.id_status = data.id_status;
    this.bbn1_pokok = data.bbn1_pokok;
    this.bbn1_denda = data.bbn1_denda;
    this.pkb_pokok = data.pkb_pokok;
    this.pkb_denda = data.pkb_denda;
    this.pkb_bunga = data.pkb_bunga;
    this.swdkllj_pokok = data.swdkllj_pokok;
    this.swdkllj_denda = data.swdkllj_denda;
    this.stnk = data.stnk;
    this.no_skpd = data.no_skpd;
    this.no_kohir = data.no_kohir;
    this.no_skum = data.no_skum;
    this.tanggal_daftar = data.tanggal_daftar;
    this.tanggal_bayar = data.tanggal_bayar;
    this.tahun_berlaku = data.tahun_berlaku;
    this.tanggal_max_bayar_pkb = data.tanggal_max_bayar_pkb;
    this.tanggal_max_bayar_bbn = data.tanggal_max_bayar_bbn;
    this.tanggal_max_bayar_swdkllj = data.tanggal_max_bayar_swdkllj;
    this.kode_pembayaran = data.kode_pembayaran;
    this.dpwkp = data.dpwkp;
    this.ket_dpwkp = data.ket_dpwkp;
    this.tanggal_jatuh_tempo_dpwkp = data.tanggal_jatuh_tempo_dpwkp;
    this.subsidi = data.subsidi;
    this.njkb = data.njkb;
    this.createdAt = data.createdAt ? data.createdAt : new Date();
    this.updatedAt = data.updatedAt ? data.updatedAt : new Date();
  }

  static schema() {
    return z.object({
      id: z.string({ required_error: "ID is required" }),
      no_daftar: z.string({ required_error: "No daftar is required" }),
      no_daftar_eri: z.string({ required_error: "No daftar ERI is required" }),
      id_kepemilikan: z.string({ required_error: "ID kepemilikan is required" }),
      no_kk: z.string({ required_error: "No KK is required" }),
      no_polisi: z.string({ required_error: "No polisi is required" }),
      no_polisi_lama: z.string().optional(),
      nama_pemilik: z.string({ required_error: "Nama pemilik is required" }),
      nama_pemilik_lama: z.string().optional(),
      alamat1: z.string({ required_error: "Alamat1 is required" }),
      alamat2: z.string().optional(),
      id_kelurahan: z.string().optional(),
      no_telp: z.string({ required_error: "No telepon is required" }),
      id_jenis_kendaraan: z.string({ required_error: "ID jenis kendaraan is required" }),
      id_merek_kendaraan: z.string({ required_error: "ID merk kendaraan is required" }),
      id_type_kendaraan: z.string({ required_error: "ID type kendaraan is required" }),
      id_model_kendaraan: z.string({ required_error: "ID model kendaraan is required" }),
      id_jenis_map: z.string().optional(),
      tahun_buat: z
        .number()
        .int()
        .positive({ required_error: "Tahun buat must be a positive integer" }),
      tahun_rakit: z
        .number()
        .int()
        .positive({ required_error: "Tahun rakit must be a positive integer" }),
      tahun_ub: z
        .number()
        .int()
        .positive({ required_error: "Tahun ub must be a positive integer" }),
      cylinder: z
        .number()
        .int()
        .positive({ required_error: "Cylinder must be a positive integer" }),
      id_golongan_kendaraan: z.string().optional(),
      id_warna_tnkb: z.number().int().positive().optional(),
      warna_kendaraan: z.string({ required_error: "Warna kendaraan is required" }),
      id_lokasi: z.string().optional(),
      dati2_induk: z.string().optional(),
      id_fungsi_kendaraan: z.number().int().positive().optional(),
      id_bahan_bakar: z.number().int().positive().optional(),
      no_rangka: z.string({ required_error: "No rangka is required" }),
      no_mesin: z.string({ required_error: "No mesin is required" }),
      no_bpkb: z.string({ required_error: "No BPKB is required" }),
      jumlah_sumbu: z.number().int().positive().optional(),
      kode_jenis: z.string().optional(),
      status_blokir: z.boolean(),
      progresif: z.number().int(),
      progresif_tarif: z.number().int(),
      id_pendaftaran: z.string().optional(),
      id_lokasi_proses: z.string().optional(),
      dati2_proses: z.string().optional(),
      tujuan_mutasi: z.string().optional(),
      tanggal_faktur: z.coerce.date(),
      tanggal_kwitansi: z.coerce.date(),
      tanggal_akhir_stnk: z.coerce.date(),
      tanggal_akhir_stnk_lama: z.coerce.date(),
      tanggal_jatuh_tempo: z.coerce.date(),
      tanggal_jatuh_tempo_lama: z.coerce.date(),
      id_status: z.string().optional(),
      bbn1_pokok: z.number().nonnegative(),
      bbn1_denda: z.number().nonnegative(),
      pkb_pokok: z.number().nonnegative(),
      pkb_denda: z.number().nonnegative(),
      pkb_bunga: z.number().nonnegative(),
      swdkllj_pokok: z.number().nonnegative(),
      swdkllj_denda: z.number().nonnegative(),
      stnk: z.number().nonnegative(),
      no_skpd: z.string({ required_error: "No SKPD is required" }),
      no_kohir: z.string({ required_error: "No Kohir is required" }),
      no_skum: z.string({ required_error: "No SKUM is required" }),
      tanggal_daftar: z.coerce.date().optional(),
      tanggal_bayar: z.coerce.date().optional(),
      tahun_berlaku: z.number().int(),
      tanggal_max_bayar_pkb: z.coerce.date(),
      tanggal_max_bayar_bbn: z.coerce.date(),
      tanggal_max_bayar_swdkllj: z.coerce.date(),
      kode_pembayaran: z.string().optional(),
      dpwkp: z.number().optional(),
      ket_dpwkp: z.string().optional(),
      tanggal_jatuh_tempo_dpwkp: z.coerce.date().optional(),
      subsidi: z.boolean(),
      njkb: z.number().nonnegative(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    });
  }

  validate(data) {
    const result = Kendaraan.schema().safeParse(data);
    if (!result.success) {
      throw new Error(
        `Validation errors: ${result.error.issues.map((i) => `${i.path}: ${i.message}`).join(", ")}`
      );
    }
    return result.data;
  }

  getData() {
    return {
      uid: this.uid,
      id: this.id,
      no_daftar: this.no_daftar,
      no_daftar_eri: this.no_daftar_eri,
      id_kepemilikan: this.id_kepemilikan,
      no_kk: this.no_kk,
      no_polisi: this.no_polisi,
      no_polisi_lama: this.no_polisi_lama,
      nama_pemilik: this.nama_pemilik,
      nama_pemilik_lama: this.nama_pemilik_lama,
      alamat1: this.alamat1,
      alamat2: this.alamat2,
      id_kelurahan: this.id_kelurahan,
      no_telp: this.no_telp,
      id_jenis_kendaraan: this.id_jenis_kendaraan,
      id_merek_kendaraan: this.id_merek_kendaraan,
      id_type_kendaraan: this.id_type_kendaraan,
      id_model_kendaraan: this.id_model_kendaraan,
      id_jenis_map: this.id_jenis_map,
      tahun_buat: this.tahun_buat,
      tahun_rakit: this.tahun_rakit,
      tahun_ub: this.tahun_ub,
      cylinder: this.cylinder,
      id_golongan_kendaraan: this.id_golongan_kendaraan,
      id_warna_tnkb: this.id_warna_tnkb,
      warna_kendaraan: this.warna_kendaraan,
      id_lokasi: this.id_lokasi,
      dati2_induk: this.dati2_induk,
      id_fungsi_kendaraan: this.id_fungsi_kendaraan,
      id_bahan_bakar: this.id_bahan_bakar,
      no_rangka: this.no_rangka,
      no_mesin: this.no_mesin,
      no_bpkb: this.no_bpkb,
      jumlah_sumbu: this.jumlah_sumbu,
      kode_jenis: this.kode_jenis,
      status_blokir: this.status_blokir,
      progresif: this.progresif,
      progresif_tarif: this.progresif_tarif,
      id_pendaftaran: this.id_pendaftaran,
      id_lokasi_proses: this.id_lokasi_proses,
      dati2_proses: this.dati2_proses,
      tujuan_mutasi: this.tujuan_mutasi,
      tanggal_faktur: this.tanggal_faktur,
      tanggal_kwitansi: this.tanggal_kwitansi,
      tanggal_akhir_stnk: this.tanggal_akhir_stnk,
      tanggal_akhir_stnk_lama: this.tanggal_akhir_stnk_lama,
      tanggal_jatuh_tempo: this.tanggal_jatuh_tempo,
      tanggal_jatuh_tempo_lama: this.tanggal_jatuh_tempo_lama,
      id_status: this.id_status,
      bbn1_pokok: this.bbn1_pokok,
      bbn1_denda: this.bbn1_denda,
      pkb_pokok: this.pkb_pokok,
      pkb_denda: this.pkb_denda,
      pkb_bunga: this.pkb_bunga,
      swdkllj_pokok: this.swdkllj_pokok,
      swdkllj_denda: this.swdkllj_denda,
      stnk: this.stnk,
      no_skpd: this.no_skpd,
      no_kohir: this.no_kohir,
      no_skum: this.no_skum,
      tanggal_daftar: this.tanggal_daftar,
      tanggal_bayar: this.tanggal_bayar,
      tahun_berlaku: this.tahun_berlaku,
      tanggal_max_bayar_pkb: this.tanggal_max_bayar_pkb,
      tanggal_max_bayar_bbn: this.tanggal_max_bayar_bbn,
      tanggal_max_bayar_swdkllj: this.tanggal_max_bayar_swdkllj,
      kode_pembayaran: this.kode_pembayaran,
      dpwkp: this.dpwkp,
      ket_dpwkp: this.ket_dpwkp,
      tanggal_jatuh_tempo_dpwkp: this.tanggal_jatuh_tempo_dpwkp,
      subsidi: this.subsidi,
      njkb: this.njkb,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  async save() {
    const data = this.getData();
    const validatedData = this.validate(convertStringsToDateObjects(data));

    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("Kendaraan");

    // cek apakah id sudah ada dalam database
    const idSnapshot = await dbRef.where("id", "==", validatedData.id).get();
    if (!idSnapshot.empty) {
      throw new Error("ID kendaraan sudah digunakan.");
    }

    const docRef = dbRef.doc();
    const dataKendaraan = {
      uid: docRef.id,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await docRef.set(dataKendaraan);
    return updateTimestampsInObject(dataKendaraan);
  }

  static async getByUid(uid) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("Kendaraan");
    const doc = await dbRef.doc(uid).get();
    if (!doc.exists) {
      throw new Error("Kendaraan not found");
    }
    return updateTimestampsInObject(new Kendaraan(doc.data()));
  }

  static async getByNoPolisi(no_polisi) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("Kendaraan");
    const snapshot = await dbRef.where("no_polisi", "==", no_polisi).get();
    if (snapshot.empty) {
      throw new Error("No kendaraan records found.");
    }
    return snapshot.docs.map((doc) => updateTimestampsInObject(doc.data()));
  }

  static async getAll() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("Kendaraan");
    const snapshot = await dbRef.orderBy("createdAt", "desc").get();
    if (snapshot.empty) {
      throw new Error("No kendaraan records found.");
    }
    return snapshot.docs.map((doc) => updateTimestampsInObject(doc.data()));
  }

  async update(data) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("Kendaraan");
    const validData = convertStringsToDateObjects(data);
    const validatedUpdate = this.validate(validData);

    // Ambil nilai createdAt sebelum pembaruan
    const existingData = await dbRef.doc(this.uid).get();
    const createdAt = existingData.data().createdAt;

    validatedUpdate.createdAt = createdAt;
    validatedUpdate.updatedAt = new Date();
    await dbRef.doc(this.uid).update({
      ...validatedUpdate,
    });

    const updatedKendaraan = await dbRef.doc(this.uid).get();
    return updateTimestampsInObject(updatedKendaraan.data());
  }

  async delete() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("Kendaraan");

    await dbRef.doc(this.uid).delete();
  }
}

module.exports = Kendaraan;
