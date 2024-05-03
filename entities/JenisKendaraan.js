const { z } = require("zod");
const FirebaseAdmin = require("../libs/FirebaseAdmin");
const { updateTimestampsInObject, convertStringsToDateObjects } = require("../utils/converter");

class JenisKendaraan {
  constructor(data) {
    this.uid = data.uid;
    this.id = data.id;
    this.nama_jenis_kendaraan = data.nama_jenis_kendaraan;
    this.kode_jenis_kendaraan = data.kode_jenis_kendaraan;
    this.jumlah_sumbu = data.jumlah_sumbu;
    this.id_jenis_mapping = data.id_jenis_mapping;
    this.id_model_kendaraan = data.id_model_kendaraan;
    this.kategori_jenis = data.kategori_jenis;
    this.createdAt = data.createdAt ? data.createdAt : new Date();
    this.updatedAt = data.updatedAt ? data.updatedAt : new Date();
  }

  static schema() {
    return z.object({
      id: z.string({ required_error: "ID jenis kendaraan is required" }),
      nama_jenis_kendaraan: z.string({ required_error: "Nama jenis kendaraan is required" }),
      kode_jenis_kendaraan: z.string({ required_error: "Kode jenis kendaraan is required" }),
      jumlah_sumbu: z.string().optional(),
      id_jenis_mapping: z.string().optional(),
      id_model_kendaraan: z.string().optional(),
      kategori_jenis: z.string().optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    });
  }

  validate(data) {
    const result = JenisKendaraan.schema().safeParse(data);
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
      nama_jenis_kendaraan: this.nama_jenis_kendaraan,
      kode_jenis_kendaraan: this.kode_jenis_kendaraan,
      jumlah_sumbu: this.jumlah_sumbu,
      id_jenis_mapping: this.id_jenis_mapping,
      id_model_kendaraan: this.id_model_kendaraan,
      kategori_jenis: this.kategori_jenis,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  async save() {
    const data = this.getData();
    const validatedData = this.validate(data);

    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("JenisKendaraan");

    // cek apakah id sudah ada dalam database
    const idSnapshot = await dbRef.where("id", "==", validatedData.id).get();
    if (!idSnapshot.empty) {
      throw new Error("ID jenis kendaraan sudah digunakan.");
    }

    // cek apakah nama_jenis_kendaraan sudah ada dalam database
    const namaSnapshot = await dbRef
      .where("nama_jenis_kendaraan", "==", validatedData.nama_jenis_kendaraan)
      .get();
    if (!namaSnapshot.empty) {
      throw new Error("Nama jenis kendaraan sudah digunakan.");
    }

    // cek apakah kode_jenis_kendaraan sudah ada dalam database
    const kodeSnapshot = await dbRef
      .where("kode_jenis_kendaraan", "==", validatedData.kode_jenis_kendaraan)
      .get();
    if (!kodeSnapshot.empty) {
      throw new Error("Kode jenis kendaraan sudah digunakan.");
    }

    const docRef = dbRef.doc();
    const dataJenisKendaraan = {
      uid: docRef.id,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await docRef.set(dataJenisKendaraan);
    return updateTimestampsInObject(dataJenisKendaraan);
  }

  static async getByUid(uid) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("JenisKendaraan");
    const doc = await dbRef.doc(uid).get();
    if (!doc.exists) {
      throw new Error("Jenis kendaraan not found");
    }
    return updateTimestampsInObject(new JenisKendaraan(doc.data()));
  }

  static async getAll() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("JenisKendaraan");
    const snapshot = await dbRef.orderBy("createdAt", "desc").get();
    if (snapshot.empty) {
      throw new Error("No jenis kendaraan records found.");
    }
    return snapshot.docs.map((doc) => updateTimestampsInObject(doc.data()));
  }

  async update(data) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("JenisKendaraan");
    const validData = convertStringsToDateObjects(data);
    const validatedUpdate = this.validate(validData);

    // cek apakah nama_jenis_kendaraan sudah ada dalam database
    const namaSnapshot = await dbRef
      .where("nama_jenis_kendaraan", "==", validatedUpdate.nama_jenis_kendaraan)
      .get();
    if (namaSnapshot.docs.some((doc) => doc.id !== this.uid)) {
      throw new Error("Nama jenis kendaraan sudah digunakan.");
    }

    // cek apakah kode_jenis_kendaraan sudah ada dalam database
    const kodeSnapshot = await dbRef
      .where("kode_jenis_kendaraan", "==", validatedUpdate.kode_jenis_kendaraan)
      .get();
    if (kodeSnapshot.docs.some((doc) => doc.id !== this.uid)) {
      throw new Error("Kode jenis kendaraan sudah digunakan.");
    }

    validatedUpdate.updatedAt = new Date();
    await dbRef.doc(this.uid).update({
      ...validatedUpdate,
    });

    const updatedJenisKendaraan = await dbRef.doc(this.uid).get();
    return updateTimestampsInObject(updatedJenisKendaraan.data());
  }

  async delete() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("JenisKendaraan");

    await dbRef.doc(this.uid).delete();
  }
}

module.exports = JenisKendaraan;
