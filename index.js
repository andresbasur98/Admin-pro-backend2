const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');



//Crear el servidor de express
const app = express();

// Crear el servidor de express
app.use( cors());

// Base de datos

dbConnection();

// ZJEldLLVFSBg2Hv9 => password
//mean_user  => usuario

// Rutas
app.get('/', (req,res) =>{
    
    res.status(200).json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen( process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})