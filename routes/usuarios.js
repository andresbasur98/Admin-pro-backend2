/*
 Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validatJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validatJWT ,getUsuarios);

router.post('/',
[ 
    check('nombre', 'El nombre es obligatorio').notEmpty(), 
    check('password', 'El password es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
] 
,crearUsuarios);

router.put('/:id', [
    
    validatJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(), 
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').notEmpty(),
    validarCampos

], actualizarUsuario);

router.delete('/:id',validatJWT,borrarUsuario );

module.exports = router;