const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

const authController = new AuthController();

router.post("/signup", (req, res) => authController.signup(req, res));
router.post("/signin", (req, res) => authController.signin(req, res));
router.get("/verify-token", (req, res) => authController.verifyToken(req, res));

module.exports = router;
