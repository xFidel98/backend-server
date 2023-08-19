const { Schema, model} = require('mongoose');

const SucursalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    

})


module.exports = model('Sucursal', SucursalSchema);