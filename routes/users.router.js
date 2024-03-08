const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');



// **Create User**
router.post('/', async (req, res) => {
  try {
    // Validate user data (e.g., username length, email format)
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hash password securely
    const saltRounds = 10; // Adjust salt rounds as needed
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create user object with secure password
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    // Insert user into database using secure methods (avoid SQL injection)
    const createdUser = await User.create(newUser);

    res.status(201).json({ message: 'User created successfully', user: createdUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//get user
router.get('/', async (req, res) => {
  res.send('Hola Mundo!');
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    res.send(id);
  } catch (error) {
    next(error)
  }
  
});

router.patch('/:id', async(req, res, next)=>{
  try {
    const id = req.params?.id;
    const password = req.body?.password;
    const email = req.body?.email;
    /*
      const updatedUser = await User.update(req.body, {
      where: { id: userId },
      // Solo actualizar los campos especificados en la solicitud
      saltRounds=10;
      if(req.body.password) await bcrypt.hash(req.body.password, saltRounds);
      fields: ['name', 'email', 'password'],
    });
    if(updatedUser[0]===0){
          return res.status(404).json({ message: 'User not found' });
    }
    */
   res.send(`updated user: ${id} , ${password}, ${email}`)
  } catch (error) {
    next(error)
  }
});
  //delete User
  router.patch('/delete/:id', async(req, res, next)=>{
    try {
      const id = req.params.id;
      /*const updateUSer = await User.delete({where: {id: userId}})
      (updateUser[0]===0)?
      res.status(404).json({message: 'user not found'}):*/
      res.status(200).json({message: `user soft deleted sucessfully ${id}`})
    } catch (error) {
      next(error)
    }
  })



module.exports = router;