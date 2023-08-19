//Creacion de Rutas
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {getLibros, crearLibros, actualizarLibros, borrarLibros } = require('../controllers/libros');
const router = Router();


router.get('/',getLibros);
router.post('/',[
    check('nombreLibro', 'Este es un campo obligatorio').not().isEmpty(),
    check('cantidad', 'Este es un campo obligatorio').not().isEmpty(),
    validarCampos
],
crearLibros
)

router.put('/:id',[
    check('nombreLibro', 'Este es un campo obligatorio').not().isEmpty(),
    check('cantidad', 'Este es un campo obligatorio').not().isEmpty(),
    validarCampos

],
actualizarLibros
);

//Ruta del DELETE
router.delete('/:id',
borrarLibros);

module.exports = router;
