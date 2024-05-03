const { z } = require("zod");
const FirebaseAdmin = require("../libs/FirebaseAdmin");
const FirebaseClient = require("../libs/FirebaseClient");
const { updateTimestampsInObject, convertStringsToDateObjects } = require("../utils/converter");

class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.nama = data.nama;
    this.isAdmin = data.isAdmin ? data.isAdmin : false;
    this.createdAt = data.createdAt ? data.createdAt : new Date();
    this.updatedAt = data.updatedAt ? data.updatedAt : new Date();
  }

  static schema() {
    return z.object({
      id: z.string({ required_error: "ID user is required" }),
      email: z.string({ required_error: "Email is required" }),
      nama: z.string({ required_error: "Nama is required" }),
      isAdmin: z.boolean().optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    });
  }

  validate(data) {
    const result = User.schema().safeParse(data);
    if (!result.success) {
      throw new Error(
        `Validation errors: ${result.error.issues.map((i) => `${i.path}: ${i.message}`).join(", ")}`
      );
    }
    return result.data;
  }

  static async getUserByUid(uid) {
    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("Users");
    const doc = await dbRef.doc(uid).get();
    if (!doc.exists) {
      throw new Error("User not found");
    }
    return updateTimestampsInObject(new User(doc.data()));
  }

  async signup() {
    const data = this.getData();
    const validatedData = this.validate(data);

    // Initialize Firestore reference
    const dbRef = FirebaseAdmin.firestore().collection("Users");

    await dbRef.doc(validatedData.id).set(validatedData);
    const user = await dbRef.doc(validatedData.id).get();
    return updateTimestampsInObject(user.data());
  }
}

module.exports = User;
