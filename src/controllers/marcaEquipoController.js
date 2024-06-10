const Marca = require('../models/marcaEquipoModel');

// Listamos todas las marcas
exports.getAllMarcas = async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.json(marcas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenemos una marca por ID
exports.getMarcaById = async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.id);
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    res.json(marca);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Creamos una nueva marca
exports.createMarca = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const marca = new Marca({ nombre, estado });
    await marca.save();
    res.status(201).json({ message: 'Marca creada exitosamente', marca });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editamos una marca existente
exports.updateMarca = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const marcaId = req.params.id;
    const marca = await Marca.findByIdAndUpdate(marcaId, { nombre, estado }, { new: true });
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    res.json({ message: 'Marca actualizada exitosamente', marca });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminamos una marca existente
exports.deleteMarca = async (req, res) => {
    try {
      const marcaId = req.params.id;
      const marca = await Marca.findByIdAndDelete(marcaId);
      if (!marca) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
      res.json({ message: 'Marca eliminada exitosamente', marca });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  