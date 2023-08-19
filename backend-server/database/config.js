//Importacion
const mongoose = require('mongoose');

//Crear Funcion para crear conexion DBD
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos Online')

    } catch (error) {

        console.log(error);
        throw new error('Error al iniciar base de datos')
    }
}

module.exports = {

    dbConnection
}