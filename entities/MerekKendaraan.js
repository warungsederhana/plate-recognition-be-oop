const { z } = require("zod");
const FirebaseAdmin = require("../libs/FirebaseAdmin");
const { updateTimestampsInObject, convertStringsToDateObjects } = require("../utils/converter");

class MerekKendaraan {
  constructor(data) {
    this.uid = data.uid;
    this.id = data.id;
    this.nama_merek = data.nama_merek;
    this.kode_negara_asal = data.kode_negara_asal;
    this.createdAt = data.createdAt ? data.createdAt : new Date();
    this.updatedAt = data.updatedAt ? data.updatedAt : new Date();
  }

  static schema() {
    return z.object({
      id: z.string({ required_error: "ID merek kendaraan is required" }),
      nama_merek: z.string({ required_error: "Nama merek kendaraan is required" }),
      kode_negara_asal: z.string({ required_error: "Kode negara asal is required" }),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    });
  }

  validate(data) {
    const result = MerekKendaraan.schema().safeParse(data);
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
      nama_merek: this.nama_merek,
      kode_negara_asal: this.kode_negara_asal,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  async save() {
    const data = this.getData();
    const validatedData = this.validate(data);

    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("MerekKendaraan");

    // cek apakah id sudah ada dalam database
    const idSnapshot = await dbRef.where("id", "==", validatedData.id).get();
    if (!idSnapshot.empty) {
      throw new Error("ID merek kendaraan sudah digunakan.");
    }

    // cek apakah nama_merek sudah ada dalam database
    const namaSnapshot = await dbRef.where("nama_merek", "==", validatedData.nama_merek).get();
    if (!namaSnapshot.empty) {
      throw new Error("Nama merek kendaraan sudah digunakan.");
    }

    const docRef = dbRef.doc();
    const dataMerekKendaraan = {
      uid: docRef.id,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await docRef.set(dataMerekKendaraan);
    return updateTimestampsInObject(dataMerekKendaraan);
  }

  static async getByUid(uid) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("MerekKendaraan");
    const doc = await dbRef.doc(uid).get();
    if (!doc.exists) {
      throw new Error("Merek kendaraan not found");
    }
    return updateTimestampsInObject(new MerekKendaraan(doc.data()));
  }

  static async getAll() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("MerekKendaraan");
    const snapshot = await dbRef.orderBy("createdAt", "desc").get();
    if (snapshot.empty) {
      throw new Error("No merek kendaraan records found.");
    }
    return snapshot.docs.map((doc) => updateTimestampsInObject(doc.data()));
  }

  async update(data) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("MerekKendaraan");
    const validData = convertStringsToDateObjects(data);
    const validatedUpdate = this.validate(validData);

    // cek apakah nama_merek sudah ada dalam database
    const namaSnapshot = await dbRef.where("nama_merek", "==", validatedUpdate.nama_merek).get();
    if (namaSnapshot.docs.some((doc) => doc.id !== this.uid)) {
      throw new Error("Nama jenis kendaraan sudah digunakan.");
    }

    validatedUpdate.updatedAt = new Date();
    await dbRef.doc(this.uid).update({
      ...validatedUpdate,
    });

    const updatedMerekKendaraan = await dbRef.doc(this.uid).get();
    return updateTimestampsInObject(updatedMerekKendaraan.data());
  }

  async delete() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("MerekKendaraan");
    await dbRef.doc(this.uid).delete();
  }
}

module.exports = MerekKendaraan;
