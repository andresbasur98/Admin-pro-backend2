const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res ) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre')
    res.json({
        ok: true,
        hospitales
    })   
}

const crearHospital = async(req, res ) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save()

        res.json({
        ok: true,
        hospital: hospitalDB
    })   
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarHospital = (req, res ) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })   
}

const borrarHospital = async(req, res ) => {

    const id = req.params.id;    

    try {
        const hospital = await Hospital.findById(id);

        if( !hospital ){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            })
        }

         await Hospital.findByIdAndDelete( id );
        res.json({
                ok: true,
                msg: 'Hosital borrado'
        })   
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        })
    }

 
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}