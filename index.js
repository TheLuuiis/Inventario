const express = require('express');
const mongoose = require('mongoose');
const usuarioRoutes = require('./routes/usuarioRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const estadoEquipoRoutes = require('./routes/estadoEquipoRoutes');
const marcaEquipoRoutes = require('./routes/marcaEquipoRoutes');
const tipoEquipoRoutes = require('./routes/tipoEquipoRoutes');
const bodyParser = require('body-parser');

const index = express();

// Middleware
index.use(bodyParser.json());

// Conectamos la base de datos
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

index.use('/api/usuarios', usuarioRoutes);
index.use('/api/inventarios', inventarioRoutes);
index.use('/api/estado-equipos', estadoEquipoRoutes);
index.use('/api/marcas', marcaEquipoRoutes);
index.use('/api/tipo-equipos', tipoEquipoRoutes);

const PORT = process.env.PORT || 5000;
index.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
