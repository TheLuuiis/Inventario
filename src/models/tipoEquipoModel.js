const mongoose = require('mongoose');

const tipoEquipoModel = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TipoEquipo', tipoEquipoModel);
