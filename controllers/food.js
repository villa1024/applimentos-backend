const { response } = require('express');
const Alimento = require('../models/Alimento');

const getAlimentos = async (req, res = response) => {
    const alimentos = await Alimento.find();
    return res.json({
        ok: true,
        alimentos
    });
};

const crearAlimento = async (req, res = response) => {
    const alimento = new Alimento(req.body);
    try {
        const resp = await Alimento.find({nombre: alimento.nombre});
        // No existe
        if (resp.length === 0) {
            const alimentoGuardado = await alimento.save();
            return res.json({
                ok: true,
                alimento: alimentoGuardado
            });
        }
        // Si existe
        else {
            return res.json({
                ok: false,
                msg: 'El alimento ya existe'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

const eliminarAlimento = async (req, res = response) => {
    const alimentoID = req.params.id || undefined;
    try {
        const alimento = await Alimento.findById(alimentoID);
        if (!alimento) {
            return res.status(404).json({
                ok: false,
                msg: 'El alimento ID no existe'
            });
        }
        await Alimento.findByIdAndDelete(alimentoID);
        return res.json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
};

module.exports = {
    getAlimentos,
    crearAlimento,
    eliminarAlimento,
};