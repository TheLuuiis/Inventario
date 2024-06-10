const EstadoEquipo = require('../models/estadoEquipoModel');

// Listamos todos los estados de equipo
exports.getAllEstadosEquipo = async (req, res) => {
  try {
    const estadosEquipo = await EstadoEquipo.find();
    res.json(estadosEquipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenemos un estado de equipo por ID
exports.getEstadoEquipoById = async (req, res) => {
  try {
    const estadoEquipo = await EstadoEquipo.findById(req.params.id);
    if (!estadoEquipo) {
      return res.status(404).json({ message: 'Estado de equipo no encontrado' });
    }
    res.json(estadoEquipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Creamos un nuevo estado de equipo
exports.createEstadoEquipo = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const estadoEquipo = new EstadoEquipo({ nombre, estado });
    await estadoEquipo.save();
    res.status(201).json({ message: 'Estado de equipo creado exitosamente', estadoEquipo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editamos un estado de equipo existente
exports.updateEstadoEquipo = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const estadoEquipoId = req.params.id;
    const estadoEquipo = await EstadoEquipo.findByIdAndUpdate(estadoEquipoId, { nombre, estado }, { new: true });
    if (!estadoEquipo) {
      return res.status(404).json({ message: 'Estado de equipo no encontrado' });
    }
    res.json({ message: 'Estado de equipo actualizado exitosamente', estadoEquipo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminamos un estado de equipo existente
exports.deleteEstadoEquipo = async (req, res) => {
  try {
    const estadoEquipoId = req.params.id;
    const estadoEquipo = await EstadoEquipo.findByIdAndDelete(estadoEquipoId);
    if (!estadoEquipo) {
      return res.status(404).json({ message: 'Estado de equipo no encontrado' });
    }
    res.json({ message: 'Estado de equipo eliminado exitosamente', estadoEquipo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
