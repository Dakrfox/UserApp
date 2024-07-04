const mongoose = require('mongoose');

const roles = {
  admin: {
    permissions: ['all'], // Acceso a todas las funcionalidades
  },
  editor: {
    permissions: ['create', 'read', 'readAll', 'Update', 'softDelete'],
  },
  user: {
    permissions: ['read', 'update', 'softDelete'],
  },
};

const userSchema = new mongoose.Schema({
  name : String,
  username: String,
  email: String,
  birthdate: Date,
  age : Number,
  phone : Number,
  password: String,
  rol: {
    type: String,
    enum: Object.keys(roles),
    default: 'user',
  },
  status: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;