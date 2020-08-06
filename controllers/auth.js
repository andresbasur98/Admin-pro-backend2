const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');
const { get } = require('mongoose');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async (req, res = response ) => {

    const { email, password } = req.body; 

    try {

        const usuarioDB = await Usuario.findOne({email});

        // Verificar email

        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado'
            })
        }
        
        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        // Generar el token - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( usuarioDB.role )
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req,res) => {

    const googleToken = req.body.token;

    try {

     const {name, email, picture} =  await googleVerify(googleToken);

     const usuarioDB = await Usuario.findOne({email});
     let usuario;
     if(!usuarioDB){
        usuario = new Usuario({
            nombre: name,
            email,
            password: ':)',
            img: picture,
            google: true
        })
     }else{
        // existe usuario

        usuario = usuarioDB;
        usuario.google = true;
        usuario.password = ':)';
     }

     //Guardar en BD
     await usuario.save();

     const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Google Signin',
            token,
            menu: getMenuFrontEnd( usuario.role )

        })
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg:'Token incorrecto'
        })
    }

}

const renewToken = async(req,res) =>{
    const uid = req.uid;
    const usuarioDB = await Usuario.findById(uid);

    // Generar token - JWT
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token,
        usuario:usuarioDB,
        menu: getMenuFrontEnd( usuarioDB.role )

    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}