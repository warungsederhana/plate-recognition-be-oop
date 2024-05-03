const dotenv = require("dotenv");
const FirebaseAdmin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
dotenv.config();

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

module.exports = FirebaseAdmin;
