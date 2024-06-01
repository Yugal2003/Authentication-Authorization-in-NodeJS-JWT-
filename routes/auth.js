const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/api/v1/signup", authController.signup);

router.post("/api/v1/login", authController.login);

module.exports = router;