const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const bcrypt = require("bcrypt");
//asd
//Loging
const SECRETKEY = process.env.SECRETKEY;
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Validar datos de entrada
  if (!email || !password) {
    return res.status(400).json({ message: "Some credetials are missing" });
  }

  try {
    // Buscar usuario por nombre de usuario
    const user = await User.findOne({ email });
    if (!user || user.status === 0) {
      return res.status(401).json({ message: "wrong email and/or password" });
    }

    // Comparar contraseña ingresada con la hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "wrong email and/or password" });
    }
    // Generar token JWT
    const token = jwt.sign(
      {
        userId: user._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 12 * 60,
        TimeStamp: Date.now(),
      },
      SECRETKEY
    );

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

module.exports = router;
