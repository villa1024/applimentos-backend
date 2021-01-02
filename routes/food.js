/*
    Event Routes
    /api/alimentos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { getAlimentos, crearAlimento, eliminarAlimento } = require('../controllers/food');


router.get('/', getAlimentos);

// Desde Postman
router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('porcion', 'La porcion es obligatoria').not().isEmpty(),
        check('caloriasPorcion', 'Total de calorias por porción es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearAlimento
);

router.delete('/:id', eliminarAlimento);

module.exports = router;