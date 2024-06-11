const Usuario = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generamos un token JWT
const generarToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

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
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editamos un usuario existente
exports.updateUsuario = async (req, res) => {
  try {
    const { nombre, email, estado } = req.body;
    const usuarioId = req.params.id;
    const usuario = await Usuario.findByIdAndUpdate(usuarioId, { nombre, email, estado }, { new: true });
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

// Registro del usuario
exports.registerUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    usuario = new Usuario({ nombre, email, password });
    await usuario.save();

    const payload = { userId: usuario.id, rol: usuario.rol };
    const token = generarToken(payload);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Creamos el inicio de sesión de usuario
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const payload = { userId: usuario.id, rol: usuario.rol };
    const token = generarToken(payload);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtenemos información del usuario autenticado
exports.getUsuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.userId).select('-password');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizamos información del usuario autenticado
exports.actualizarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    let usuario = await Usuario.findById(req.user.userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (password) usuario.password = password;

    await usuario.save();

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Eliminamos un usuario autenticado
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.user.userId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
