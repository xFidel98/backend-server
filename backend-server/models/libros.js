const { Schema, model} = require('mongoose');

const LibroSchema = Schema({

    nombreLibro: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    cantidad: {
        type: Number,
        required: true
    },

})


module.exports = model('Libro', LibroSchema);