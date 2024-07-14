const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'miClaveSecreta'; 
const bcrypt = require('bcrypt');
//asd
//Loging 
router.post('/', async (req, res)=> {
    const { email, password } = req.body;

    // Validar datos de entrada
    if (!email || !password) {
      return res.status(400).json({ message: 'Some credetials are missing' });
    }
  
    try {
      // Buscar usuario por nombre de usuario
      const user = await User.findOne({ email });
      if (!user || user.status === 0) {
        return res.status(401).json({ message: 'wrong email and/or password' });
      }
  
      // Comparar contraseña ingresada con la hasheada
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'wrong email and/or password' });
      }
      // Generar token JWT
      const token = jwt.sign({ userId: user._id, TimeStamp: Date.now() }, secretKey);

      res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
})

module.exports = router;