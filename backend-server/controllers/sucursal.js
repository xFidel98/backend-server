const { response } = require('express');
const bcrypt = require('bcryptjs');

const Sucursal = require('../models/sucursal');

const getSucursal = async (req, res) => {

    const sucursal = await Sucursal.find({}, 'nombre');

    res.status(200).json({
        ok: true,
        sucursal
    })
}


// POST - CREAR
const crearSucursal = async (req, res = response) => {

    const { nombre } = req.body

    try {

        const nombre = await Sucursal.findOne({ nombre });

        if (nombre) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de la sucursal yasta registrado'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al ingresar'
        })
    }
}

//PUT-ACTUALIZAR

const actualizarSucursal = async () => {
    const uid = req.params.id;
    try {
        const sucursalDB = await Sucursal.findById(uid);

        if (!sucursalDB) {
            return res.status(400).json({
                ok: false,
                msg: 'el id de sucursal no existe'
            });
        }
        //Actualizar

        const { nombre, ...campos } = req.body;

        if (sucursalDB.nombre !== nombre) {
            const nombre = await Sucursal.findOne({ nombre });
            if (nombre) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya hay nombre con esta Sucursal'
                });
            }
        }

        campos.nombre = nombre;



        const sucursalActualizado = await Sucursal.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuario: sucursalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarSucursal = async (req, res = response) => {

    const uid = req

    try {
        const sucursalDB = await Sucursal.findById(uid);

        if (!sucursalDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe id de sucursal'
            })
        }


        await Sucursal.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }

}


module.exports = {

    getSucursal,
    crearSucursal,
    actualizarSucursal,
    borrarSucursal
}