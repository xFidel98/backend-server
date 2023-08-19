//Importacion de librerias
var express = require('express');

require('dotenv').config();
const cors = require('cors');


const { dbConnection } = require('./database/config');

//Inicializacion de variables
var app = express();

//Configuracion de CORS

app.use(cors());


//Base de Datos
dbConnection();


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/libros', require('./routes/libros'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/sucursal', require('./routes/sucursal'));

app.listen(process.env.PORT, () => {
    console.log('express Server puerto 3000:\x1b[32m%s\x1b[0m', 'online')
});