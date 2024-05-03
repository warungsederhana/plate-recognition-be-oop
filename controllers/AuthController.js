const User = require("../entities/User");
const FirebaseClient = require("../libs/FirebaseClient");
const { getAuth } = require("firebase-admin/auth");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { getAuth: firebaseGetAuth } = require("firebase/auth");

class AuthController {
  async signup(req, res) {
    try {
      const user = new User(req.body);
      await user.signup();
      res.status(201).json({
        success: true,
        message: "User signed up successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;

      const userCredential = await signInWithEmailAndPassword(
        firebaseGetAuth(FirebaseClient),
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      return res.status(200).send({
        success: true,
        message: "User signed in successfully",
        data: {
          access_token: token,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async verifyToken(req, res) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
    const idToken = req.headers.authorization.split("Bearer ")[1];

    try {
      const decodedToken = await getAuth().verifyIdToken(idToken);
      const uid = decodedToken.uid;

      if (!uid) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await User.getUserByUid(uid);
      if (!user) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Token is valid",
        data: {
          id: uid,
          nama: user.nama,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      res.status(error.code === "auth/id-token-expired" ? 401 : 500).send({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
