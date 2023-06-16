const express = require('express');
const cors = require('cors');
const app = express();

// leer archivo de configuracion
require('dotenv').config();

// crear base si no existe
require("./base-orm/sqlite-init"); 

// para poder leer json en el body
//para poder interpretar los datos de las peticiones que vienen en formato json, 
//necesitamos agregar la funcionalidad para que express interprete los datos enviados en el body de la peticion 
app.use(express.json()); 

// Configuración de CORS
app.use(cors());

//cargo el modulo de ruta que es el controlador de nuestro recurso para vicularlo con express
// Configuración de rutas
const routeArticulos = require('./routes/articulos');
app.use('/', routeArticulos);

const routeClientes = require('./routes/clientes');
app.use('/', routeClientes);

// Inicio del servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

module.exports = app;

