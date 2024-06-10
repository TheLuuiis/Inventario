const Inventario = require('../models/inventarioModel');

//Listamos todos los equipos en el inventario
exports.getAllEquiposInventario = async (req, res) => {
    try {
      const equiposInventario = await Inventario.find();
      res.json(equiposInventario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Obtenemos un equipo en el inventario por su ID
  exports.getEquipoInventarioById = async (req, res) => {
    try {
      const equipoInventario = await Inventario.findById(req.params.id);
      if (!equipoInventario) {
        return res.status(404).json({ message: 'Equipo en inventario no encontrado' });
      }
      res.json(equipoInventario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Creamos un nuevo equipo en el inventario
  exports.createEquipoInventario = async (req, res) => {
    try {
      const equipoInventario = await Inventario.create(req.body);
      res.status(201).json({ message: 'Equipo añadido al inventario exitosamente', equipoInventario });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Editamos un equipo en el inventario
  exports.updateEquipoInventario = async (req, res) => {
    try {
      const equipoInventarioId = req.params.id;
      const updatedEquipoInventario = await Inventario.findByIdAndUpdate(equipoInventarioId, req.body, { new: true });
      if (!updatedEquipoInventario) {
        return res.status(404).json({ message: 'Equipo en inventario no encontrado' });
      }
      res.json({ message: 'Equipo en el inventario actualizado exitosamente', updatedEquipoInventario });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Eliminamos un equipo en el inventario
  exports.deleteEquipoInventario = async (req, res) => {
    try {
      const equipoInventarioId = req.params.id;
      const deletedEquipoInventario = await Inventario.findByIdAndDelete(equipoInventarioId);
      if (!deletedEquipoInventario) {
        return res.status(404).json({ message: 'Equipo en inventario no encontrado' });
      }
      res.json({ message: 'Equipo en el inventario eliminado exitosamente', deletedEquipoInventario });
    } catch (err) {
      res.status(500).json({ error: err.message });
    };
  };
  