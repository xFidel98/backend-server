const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuarios');



//GET / MOSTRAR
const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.status(200).json({
        ok: true,
        usuarios
    })
}



// POST - INSERTAR
const crearUsuario = async (req, res = response) => {

    const { email, password, nombre } = req.body

    try {

        const existEmail = await Usuario.findOne({ email });

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email yasta registrado'
            });
        }

        //Encriptado de contrase;a
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario con la contra encriptada

        await usuario.save();
        res.status(200).json({
            ok: true,
            usuario
        });


        const usuario = new Usuario(req.body);

        await usuario.save();

        res.status(200).json({
            ok: true,
            usuario
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos'
        })
    }
}


//PUT-ACTUALIZAR

const actualizarUsuario = async () => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El id de usuario no exista'
            });
        }

        //Actualizar
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: ' Se encuenta un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

//DELETE - BORRAR

const borrarUsuario = async(req, re = response) =>{
    const uid = req

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg: 'No existe ID de usuario'
            })
        }



        await Usuario.findByIdAndDelete (uid);
        res.json({
            ok: true,
            ms:'Usuario Eliminado Correctamente'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al borrar registro'
        })
    }

}


module.exports = {

    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}