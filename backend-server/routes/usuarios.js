//Creacion de Rutas
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const router = Router();



router.get('/', getUsuarios);
router.post('/', [
    check('nombre', 'Este es un campo obligatorio').not().isEmpty(),
    check('password', 'Este es un campo obligatorio').not().isEmpty(),
    check('email', 'Este es un campo obligatorio').isEmail(),
    validarCampos,
],
    crearUsuario
);



router.put('/:id',[
    check('nombre', 'Este es un campo obligatorio').not().isEmpty(),
    check('email', 'Este es un campo obligatorio').isEmail(),
    check('role', 'Este es un campo obligatorio').isEmail(),
    validarCampos

],

actualizarUsuario
);


//Ruta del DELETE
router.delete('/:id',
borrarUsuario);

module.exports = router;
