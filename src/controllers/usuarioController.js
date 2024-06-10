const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

// Listamos todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenemos un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Creamos un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });
    await usuario.save();
    res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editamos un usuario existente
exports.updateUsuario = async (req, res) => {
  try {
    const { nombre, email, estado, rol } = req.body;
    const usuarioId = req.params.id;
    const usuario = await Usuario.findByIdAndUpdate(usuarioId, { nombre, email, estado, rol }, { new: true });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado exitosamente', usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminamos un usuario existente
exports.deleteUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado exitosamente', usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Definimos un nuevo servicio que permita la autenticación de los usuarios por email y contraseña
exports.authenticateUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, 'tu_secreto', { expiresIn: '1h' });
    res.json({ message: 'Autenticación exitosa', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};