const { response } = require("express");

const login  = async (req, res = response) => {

    const { email, password} = req.body;

    try {
        
        //Verificacion de Correo
        const usuarioDB = await Usuario.findOne({email});
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg:'Correo invalido'
            });
        }

        //Verificar Contra
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg:'Contra invalida'
            });
        }
            res.json({
                ok:true,
                msg:'Credenciales son correctas'
            })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Login'
        })
    }
}

module.exports = {

    login
}