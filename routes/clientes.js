//gestionara el recurso clientes con los datos provenientes de la base de datos a traves del ORM (Object-Relational Mapping) llamado Sequelize
//Se importa el módulo Express y se crea un enrutador(router) utilizando express.Router(). Esto permitirá definir las rutas y controladores asociados a ellas.
const express = require("express");
const router = express.Router();

// el acceso al ORM mediante el modulo: sequelize-init. Este contiene contiene la inicialización de Sequelize y permite acceder al ORM para interactuar con la base de datos.
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// se define un controlador de ruta GET para la ruta "/api/clientes" que devolvera serializado como json el array de datos obtenido de la solicitud get, obtenido desde la base
router.get("/api/clientes", async function (req, res) {
    //se hace una consulta a la tabla "clientes" usando el método findAndCountAll() proporcionado por Sequelize. Se aplican filtros y se especifican los campos a devolver y el orden de los resultados.
    let where = {};
    if (req.query.ApellidoYNombre != undefined && req.query.ApellidoYNombre !== "") {
        where.ApellidoYNombre = {
            [Op.like]: "%" + req.query.ApellidoYNombre + "%",
        };
    }
  
  let items = await db.clientes.findAndCountAll({
    attributes: [
      "IdCliente",
      "ApellidoYNombre",
      "DNI",
    ],
    order: [["ApellidoYNombre", "ASC"]],
    where,
  });

  // se envía la respuesta en formato JSON con los registros de clientes encontrados en la base de datos
  res.json(items.rows);
});

//Se exporta el enrutador router para que pueda ser utilizado por otros módulos en la aplicación principal.
module.exports = router;

//este código define una ruta para acceder a los datos de clientes en la base de datos a través de Sequelize. 
//Aplica filtros, selecciona los campos deseados y devuelve los resultados en formato JSON. 
//El código utiliza el enrutador de Express y el ORM Sequelize para facilitar la interacción con la base de datos.