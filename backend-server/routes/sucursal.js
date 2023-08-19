const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getSucursal, crearSucursal, actualizarSucursal, borrarSucursal} = require('../controllers/sucursal');

const router = Router();

router.get('/', getSucursal);
router.post('/', [
    check('nombre', 'Este es un campo obligatorio').not().isEmpty(),
    
    validarCampos,
],
    crearSucursal
);

router.put('/:id',[
    check('nombre', 'Este es un campo obligatorio').not().isEmpty(),
    validarCampos

],

actualizarSucursal
);

//Ruta del DELETE
router.delete('/:id',
borrarSucursal);


module.exports = router;