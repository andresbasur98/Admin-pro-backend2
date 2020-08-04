const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


 const getUsuarios =async (req,res) =>{
    
    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario
    //                    .find({}, 'nombre email role google')
    //                     .skip( desde )
    //                     .limit(5);
    // const total = Usuario.count();                     

    const [usuarios, total ] = await Promise.all([ //Para ejecutarlo de manera simultanea
         Usuario.find({}, 'nombre email role google img')
                .skip( desde )
                .limit(5),
         Usuario.countDocuments()  
        ])

   res.json({
        ok: true,
        usuarios,
        uid: req.uid,
        total
    });
}

const crearUsuarios = async (req,res = response) => { //ponemos res = response para que nos ofrezca las ayudas de teclado
    const { email, password, nombre} = req.body;

    
    try{

        const existeEmail = await Usuario.findOne({email});

        if( existeEmail){
          return res.status(400).json({
              ok: false,
              msg: 'El correo ya está registrado'
          });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);
    
        const token = await generarJWT(usuario.id);
        // Guardar usuario
        await usuario.save();
       
        
        res.json({
            ok: true,
            usuario,
            token
        })

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

   
}

const actualizarUsuario = async (req, res = response) =>{
// TODO: Validar token y comprobar si es el usuario correcto
 
 const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        
    const {password,google,email, ...campos} = req.body; // desestructuro de esa manera y saco el password y google para que no se actualicen

    if( usuarioDB.email !== email ){
   
        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email',
                email
            })
        }
    }

    if(!usuarioDB.google){ // Si el usuario es de google no se puede actualizar
        campos.email = email;
    }else if(usuarioDB.email !== email){
        return res.status(400).json({
            ok: false,
            msg: 'Usuario de google no puede cambiar su email'
        })
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate( uid , campos, { new: true });

        res.json({
            ok: true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}   

const borrarUsuario = async (req, res = response) =>{
    const uid = req.params.id;
    
    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con es id'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
         })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador' 
        })
    }

    
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}