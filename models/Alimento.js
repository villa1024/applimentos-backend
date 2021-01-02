const { Schema, model } = require('mongoose');

const AlimentoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    porcion: {
        type: Number,
        required: true,
    },
    caloriasPorcion: {
        type: Number,
        required: true
    }
});

module.exports = model('Alimento', AlimentoSchema);