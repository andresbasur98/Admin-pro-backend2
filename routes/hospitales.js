/*
 Hospitales:
 ruta: /api/hospitales
*/

/*
 Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const{ getHospitales,actualizarHospital,crearHospital,borrarHospital } = require('../controllers/hospitales')

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/' ,getHospitales);

router.post('/',[ 
    validarJWT,
    check('nombre','El nombre el hospital es necesario').notEmpty(),
    validarCampos
],crearHospital);

router.put('/:id', [
    validarJWT,
    check('nombre','El nombre del hospital es necesario').notEmpty(),
    validarCampos
], actualizarHospital);

router.delete('/:id', validarJWT,borrarHospital);

module.exports = router;