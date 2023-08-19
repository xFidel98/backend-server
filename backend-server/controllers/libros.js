const { response } = require('express');


const Libros = require('../models/libros');


//GET - MOSTRAR

const getLibros = async (req, res) => {


    const libros = await Libros.find({}, 'nombreLibro, cantidad');
    res.status(200).json({
        ok: true,
        libros
    })

}

// POST - MOSTRAR

const crearLibros = async (req, res = response) => {

    const { nombreLibro, cantidad } = req.body

    try {

        const nombreLibro = await Libros.findOne({ nombreLibro });

        if (nombreLibro) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre del libro yasta registrado'
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

const actualizarLibros = async () => {
    const uid = req.params.id;
    try {
        const libroDB = await Libros.findById(uid);

        if (!libroDB) {
            return res.status(400).json({
                ok: false,
                msg: 'el id de libros no existe'
            });
        }
        //Actualizar

        const { nombreLibro, cantidad, ...campos } = req.body;

        if (libroDB.nombreLibro !== nombreLibro) {
            const nombreLibro = await Libros.findOne({ nombreLibro });
            if (nombreLibro) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya hay nombre con este libro'
                });
            }
        }

        campos.nombreLibro = nombreLibro;



        const libroActualizado = await Libros.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuario: libroActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }


}

//Delete - Borrar

const borrarLibros = async (req, res = response) => {

    const uid = req

    try {
        const libroDB = await libros.findById(uid);

        if (!libroDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe id de libro'
            })
        }


        await Libros.findByIdAndDelete(uid);
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

    getLibros,
    crearLibros,
    actualizarLibros,
    borrarLibros
}