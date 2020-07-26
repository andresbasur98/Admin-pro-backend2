const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: { type: String, required: true },
    email: { type:String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    role: { type: String, required: true, default: 'USER_ROLE' },
    google: { type: String, default: false }
});

UsuarioSchema.method('toJSON', function() { //Es para cambiar _id por uid no es necesario 
    const {__v, _id,password, ...object} = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);