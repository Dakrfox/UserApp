const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authMiddleware = require("../middleware/middlewareAuthentication");

//Create User
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    // Validate user data (e.g., username length, email format)
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Hash password securely
    const saltRounds = 10; // Adjust salt rounds as needed
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create user object with secure password
    const newUser = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      birthdate: req.body.birthdate,
      age: req.body.age,
      phone: req.body.phone,
      password: hashedPassword,
      rol: "user",
      status: 1,
    };

    // Insert user into database using secure methods (avoid SQL injection)
    const user = new User(newUser);
    user
      .save()
      .then(() => console.log("Usuario creado"))
      .catch((err) => console.error(err));

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//get user
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ status: 1 });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "internal error" });
  }
});
//get all user + deleted
router.get("/audit/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "internal error" });
  }
});
//get user by id
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userById = await User.findById(id);

    // Handle case where user is not found
    if (!userById || userById.status === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userById);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: " internal error" });
  }
});
//update user
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body; // Contiene los datos actualizados
    if (updatedUserData.password) {
      const hashedPassword = await bcrypt.hash(
        updatedUserData.password,
        10
      );
      updatedUserData.password = hashedPassword;
    }
      
    
    // Validar datos actualizados (opcional)
    // Implementar validación para garantizar la integridad de los datos

    const userById = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    }); // Actualizar y obtener usuario actualizado

    // Manejar caso donde no se encuentre el usuario
    if (!userById) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userById);
  } catch (error) {
    next(error);
  }
});
//soft delete User
router.patch("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const updateUSer = await User.findByIdAndUpdate(
      id,
      { status: 0 },
      { new: true }
    );
    if (!updateUSer) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: `user soft deleted sucessfully ${updateUSer}` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" });
  }
});
//hard delete users
router.delete("/delete/hard/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `user hard deleted sucessfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "user cant not be deleted" });
  }
});

module.exports = router;
