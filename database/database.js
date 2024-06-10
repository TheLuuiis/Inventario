const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECT);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Base de Datos conectada exitosamente a MongoDB');
});