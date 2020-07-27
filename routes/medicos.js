/*
 Medicos:
 ruta: /api/medico
  */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{ getMedicos,actualizarMedico,crearMedico,borrarMedico } = require('../controllers/medicos')

const { validatJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/' ,getMedicos);

router.post('/',[
    validarJWT,
    check('nombre','El nombre del medico es necesario').notEmpty(),
    check('hospital','El hospital id debe de ser válido').isMongoId(), // Válidar un id válido que venga de Mongo
    validarCampos
],crearMedico);

router.put('/:id',[
   validarJWT,
   check('nombre','El nombre del medico es necesario').notEmpty(),
   check('hospital','El hospital id debe de ser válido').isMongoId(),
   validarCampos
], actualizarMedico);

router.delete('/:id',borrarMedico);

module.exports = router;