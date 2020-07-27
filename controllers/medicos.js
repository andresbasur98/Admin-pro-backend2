const { response } = require('express');
const Medico = require('../models/medico')

const getMedicos = async (req, res = response ) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre')
                                .populate('hospital','nombre')

    res.json({
        ok: true,
        medicos    
    })   
}

const crearMedico = async (req, res = response ) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

     
}

const actualizarMedico = async(req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;
    

    try {
       const medicoDB = await Medico.findById(id);
       if(!medicoDB){
           res.status(404).json({
               ok: false,
               msg: 'El medico con es id no existe en la BD'
           })
        }
           const cambiosMedico = {
               ...req.body,
               usuario: uid
           }

          const medicoActualizado =  await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

          res.json({
              ok: true,
              medicoActualizado
          })

       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
 
}

const borrarMedico = async(req, res = response ) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById(id);
        if(!medicoDB){
            res.status(404).json({
                ok: false,
                msg:'Medico no encontrado en la BD'
            })
        }

        const medicoBorrado = await Medico.findByIdAndDelete(id);

        res.json({
        ok: true,
        medico: medicoBorrado
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}