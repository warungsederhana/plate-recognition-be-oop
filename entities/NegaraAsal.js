const { z } = require("zod");
const FirebaseAdmin = require("../libs/FirebaseAdmin");
const { updateTimestampsInObject, convertStringsToDateObjects } = require("../utils/converter");

class NegaraAsal {
  constructor(data) {
    this.uid = data.uid; // Consider keeping a unique identifier if needed
    this.id = data.id;
    this.nama_negara = data.nama_negara;
    this.kode_negara = data.kode_negara;
    this.createdAt = data.createdAt ? data.createdAt : new Date();
    this.updatedAt = data.updatedAt ? data.updatedAt : new Date();
  }

  static schema() {
    return z.object({
      id: z.string({ required_error: "ID negara asal is required" }),
      nama_negara: z.string({ required_error: "Nama negara asal is required" }),
      kode_negara: z.string({ required_error: "Kode negara asal is required" }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    });
  }

  validate(data) {
    const result = NegaraAsal.schema().safeParse(data);
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
      nama_negara: this.nama_negara,
      kode_negara: this.kode_negara,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  async save() {
    const data = this.getData();
    const validatedData = this.validate(data);

    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("NegaraAsal");

    // cek apakah id sudah ada dalam database
    const idSnapshot = await dbRef.where("id", "==", validatedData.id).get();
    if (!idSnapshot.empty) {
      throw new Error("ID negara asal sudah digunakan.");
    }

    // cek apakah nama_negara sudah ada dalam database
    const namaSnapshot = await dbRef.where("nama_negara", "==", validatedData.nama_negara).get();
    if (!namaSnapshot.empty) {
      throw new Error("Nama negara asal sudah digunakan.");
    }

    // cek apakah kode_negara sudah ada dalam database
    const kodeSnapshot = await dbRef.where("kode_negara", "==", validatedData.kode_negara).get();
    if (!kodeSnapshot.empty) {
      throw new Error("Kode negara asal sudah digunakan.");
    }

    const docRef = dbRef.doc();
    const dataNegaraAsal = {
      uid: docRef.id,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await docRef.set(dataNegaraAsal);
    return updateTimestampsInObject(dataNegaraAsal);
  }

  static async getByUid(uid) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("NegaraAsal");
    const doc = await dbRef.doc(uid).get();
    if (!doc.exists) {
      throw new Error("Negara asal not found");
    }
    return updateTimestampsInObject(new NegaraAsal(doc.data()));
  }

  static async getAll() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("NegaraAsal");
    const snapshot = await dbRef.orderBy("createdAt", "desc").get();
    if (snapshot.empty) {
      throw new Error("No negara asal records found.");
    }
    return snapshot.docs.map((doc) => updateTimestampsInObject(doc.data()));
  }

  async update(data) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("NegaraAsal");
    const validData = convertStringsToDateObjects(data);
    const validatedUpdate = this.validate(validData);

    // Cek apakah nama_negara sudah ada dalam database dan bukan pada dokumen yang sama
    const namaSnapshot = await dbRef.where("nama_negara", "==", validatedUpdate.nama_negara).get();
    if (namaSnapshot.docs.some((doc) => doc.id !== this.uid)) {
      throw new Error("Nama negara asal sudah digunakan.");
    }

    // Cek apakah kode_negara sudah ada dalam database dan bukan pada dokumen yang sama
    const kodeSnapshot = await dbRef.where("kode_negara", "==", validatedUpdate.kode_negara).get();
    if (kodeSnapshot.docs.some((doc) => doc.id !== this.uid)) {
      throw new Error("Kode negara asal sudah digunakan.");
    }

    // Ambil nilai createdAt sebelum pembaruan
    const existingData = await dbRef.doc(this.uid).get();

    const createdAt = existingData.data().createdAt;

    validatedUpdate.createdAt = createdAt;
    validatedUpdate.updatedAt = new Date();
    await dbRef.doc(this.uid).update({
      ...validatedUpdate,
    });

    const updatedNegaraAsal = await dbRef.doc(this.uid).get();
    return updateTimestampsInObject(updatedNegaraAsal.data());
  }

  async delete() {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("NegaraAsal");

    await dbRef.doc(this.uid).delete();
  }
}

module.exports = NegaraAsal;
