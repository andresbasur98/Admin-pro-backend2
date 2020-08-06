const express = require('express');
require('dotenv').config();
const path = require('path');
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

// Lo último
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'public/index.html')); //En caso de no encontrar las de arriba va al path(producción)
})

app.listen( process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})