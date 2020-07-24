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

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen( process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})