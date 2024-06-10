const mongoose = require('mongoose');

const inventarioModel = new mongoose.Schema({
  serial: {
    type: String,
    required: true,
    unique: true
  },
  modelo: {
    type: String,
    required: true,
    unique: true
  },
  descripcion: {
    type: String
  },
  fotoEquipo: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  fechaCompra: {
    type: Date,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  marca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Marca',
    required: true
  },
  estadoEquipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EstadoEquipo',
    required: true
  },
  tipoEquipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoEquipo',
    required: true
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

module.exports = mongoose.model('Inventario', inventarioModel);
