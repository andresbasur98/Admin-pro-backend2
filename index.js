const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');



//Crear el servidor de express
const app = express();

// Crear el servidor de express
app.use( cors());

// Lectura y parseo del body
app.use( express.json() );

// Base de datos

dbConnection();

// ZJEldLLVFSBg2Hv9 => password
//mean_user  => usuario

// Directorio público
app.use( express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medico', require('./routes/medicos'))
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.listen( process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})