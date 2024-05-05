const dotenv = require("dotenv");
dotenv.config();

const FirebaseAdmin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.serviceAccountKey);

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

module.exports = FirebaseAdmin;
