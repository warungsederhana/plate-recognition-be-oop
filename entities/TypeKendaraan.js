const { z } = require("zod");
const FirebaseAdmin = require("../libs/FirebaseAdmin");
const { updateTimestampsInObject, convertStringsToDateObjects } = require("../utils/converter");

class TypeKendaraan {
  constructor(data) {
    this.uid = data.uid;
    this.id = data.id;
    this.nama_type_kendaraan = data.nama_type_kendaraan;
    this.nama_type_kendaraan_eri = data.nama_type_kendaraan_eri;
    this.id_jenis_kendaraan = data.id_jenis_kendaraan;
    this.id_merek_kendaraan = data.id_merek_kendaraan;
    this.kode_negara_asal = data.kode_negara_asal;
    this.createdAt = data.createdAt ? data.createdAt : new Date();
    this.updatedAt = data.updatedAt ? data.updatedAt : new Date();
  }

  static schema() {
    return z.object({
      id: z.string({ required_error: "ID type kendaraan is required" }),
      nama_type_kendaraan: z.string({ required_error: "Nama type kendaraan is required" }),
      nama_type_kendaraan_eri: z.string({ required_error: "Nama type kendaraan eri is required" }),
      id_jenis_kendaraan: z.string({ required_error: "ID jenis kendaraan is required" }),
      id_merek_kendaraan: z.string({ required_error: "ID merek kendaraan is required" }),
      kode_negara_asal: z.string({ required_error: "Kode negara asal is required" }),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    });
  }

  validate(data) {
    const result = TypeKendaraan.schema().safeParse(data);
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
      nama_type_kendaraan: this.nama_type_kendaraan,
      nama_type_kendaraan_eri: this.nama_type_kendaraan_eri,
      id_jenis_kendaraan: this.id_jenis_kendaraan,
      id_merek_kendaraan: this.id_merek_kendaraan,
      kode_negara_asal: this.kode_negara_asal,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  async save() {
    const data = this.getData();
    const validatedData = this.validate(data);

    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("TypeKendaraan");
    const jenisKendaraanRef = FirebaseAdmin.firestore().collection("JenisKendaraan");
    const merekKendaraanRef = FirebaseAdmin.firestore().collection("MerekKendaraan");
    const negaraAsalRef = FirebaseAdmin.firestore().collection("NegaraAsal");

    // cek apakah id sudah ada dalam database
    const idSnapshot = await dbRef.where("id", "==", validatedData.id).get();
    if (!idSnapshot.empty) {
      throw new Error("ID type kendaraan sudah digunakan.");
    }

    // cek apakah nama_type_kendaraan sudah ada dalam database
    const namaSnapshot = await dbRef
      .where("nama_type_kendaraan", "==", validatedData.nama_type_kendaraan)
      .get();
    if (!namaSnapshot.empty) {
      throw new Error("Nama type kendaraan sudah digunakan.");
    }

    // cek apakah nama_type_kendaraan_eri sudah ada dalam database
    const namaEriSnapshot = await dbRef
      .where("nama_type_kendaraan_eri", "==", validatedData.nama_type_kendaraan_eri)
      .get();
    if (!namaEriSnapshot.empty) {
      throw new Error("Nama type eri kendaraan sudah digunakan.");
    }

    // cek apakah id_jenis_kendaraan ada di database
    const jenisKendaraanSnapshot = await jenisKendaraanRef
      .where("id", "==", validatedData.id_jenis_kendaraan)
      .get();
    if (jenisKendaraanSnapshot.empty) {
      throw new Error("ID jenis kendaraan tidak ditemukan.");
    }

    // cek apakah id_merek_kendaraan ada di database
    const merekKendaraanSnapshot = await merekKendaraanRef
      .where("id", "==", validatedData.id_merek_kendaraan)
      .get();
    if (merekKendaraanSnapshot.empty) {
      throw new Error("ID merek kendaraan tidak ditemukan.");
    }

    // cek apakah kode_negara_asal ada di database
    const negaraAsalSnapshot = await negaraAsalRef
      .where("kode_negara", "==", validatedData.kode_negara_asal)
      .get();
    if (negaraAsalSnapshot.empty) {
      throw new Error("Kode negara asal tidak ditemukan.");
    }

    const docRef = dbRef.doc();
    const dataTypeKendaraan = {
      uid: docRef.id,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await docRef.set(dataTypeKendaraan);
    return updateTimestampsInObject(dataTypeKendaraan);
  }

  static async getByUid(uid) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("TypeKendaraan");
    const doc = await dbRef.doc(uid).get();
    if (!doc.exists) {
      throw new Error("Type kendaraan not found");
    }
    return updateTimestampsInObject(new TypeKendaraan(doc.data()));
  }

  static async getAll() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("TypeKendaraan");
    const snapshot = await dbRef.orderBy("createdAt", "desc").get();
    if (snapshot.empty) {
      throw new Error("No jenis kendaraan records found.");
    }
    return snapshot.docs.map((doc) => updateTimestampsInObject(doc.data()));
  }

  async update(data) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("TypeKendaraan");
    const jenisKendaraanRef = FirebaseAdmin.firestore().collection("JenisKendaraan");
    const merekKendaraanRef = FirebaseAdmin.firestore().collection("MerekKendaraan");
    const negaraAsalRef = FirebaseAdmin.firestore().collection("NegaraAsal");

    const validData = convertStringsToDateObjects(data);
    const validatedUpdate = this.validate(validData);

    // cek apakah nama_type_kendaraan sudah ada dalam database
    const namaSnapshot = await dbRef
      .where("nama_type_kendaraan", "==", validatedUpdate.nama_type_kendaraan)
      .get();
    if (namaSnapshot.docs.some((doc) => doc.id !== this.uid)) {
      throw new Error("Nama jenis kendaraan sudah digunakan.");
    }

    // cek apakah nama_type_kendaraan_eri sudah ada dalam database
    const kodeSnapshot = await dbRef
      .where("nama_type_kendaraan_eri", "==", validatedUpdate.nama_type_kendaraan_eri)
      .get();
    if (kodeSnapshot.docs.some((doc) => doc.id !== this.uid)) {
      throw new Error("Kode jenis kendaraan sudah digunakan.");
    }

    // cek apakah id_jenis_kendaraan ada di database
    const jenisKendaraanSnapshot = await jenisKendaraanRef
      .where("id", "==", validatedUpdate.id_jenis_kendaraan)
      .get();
    if (jenisKendaraanSnapshot.empty) {
      throw new Error("ID jenis kendaraan tidak ditemukan.");
    }

    // cek apakah id_merek_kendaraan ada di database
    const merekKendaraanSnapshot = await merekKendaraanRef
      .where("id", "==", validatedUpdate.id_merek_kendaraan)
      .get();
    if (merekKendaraanSnapshot.empty) {
      throw new Error("ID merek kendaraan tidak ditemukan.");
    }

    // cek apakah kode_negara_asal ada di database
    const negaraAsalSnapshot = await negaraAsalRef
      .where("kode_negara", "==", validatedUpdate.kode_negara_asal)
      .get();
    if (negaraAsalSnapshot.empty) {
      throw new Error("Kode negara asal tidak ditemukan.");
    }

    validatedUpdate.updatedAt = new Date();
    await dbRef.doc(this.uid).update({
      ...validatedUpdate,
    });

    const updatedTypeKendaraan = await dbRef.doc(this.uid).get();
    return updateTimestampsInObject(updatedTypeKendaraan.data());
  }

  async delete() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("TypeKendaraan");

    await dbRef.doc(this.uid).delete();
  }
}

module.exports = TypeKendaraan;
