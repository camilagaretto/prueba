
//este codigo configura y define los modelos de datos usando sequelize. 
//Se especifica la estructura de las tablas, los tipos de datos, las validaciones. Esto facilita la interacción con la base de datos y el manejo de los datos en la aplicación.

// configurar ORM sequelize
//Se importa el objeto Sequelize y DataTypes desde el paquete "sequelize".
const { Sequelize, DataTypes } = require("sequelize");
//Se crea una instancia de Sequelize y se especifica que se usara SQLite
const sequelize = new Sequelize("sqlite:" + process.env.base);

//se define del modelo articulos y se especifica la estructura de las columnas y las validaciones que se deben aplicar a los datos.
const articulos = sequelize.define(
  "articulos",
  {
    IdArticulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      //validaciones de nombre con sus mensajes de error
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre ya existe en la tabla!",
      },
    },
    Precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      //validacion de precio con su mensaje de error
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        }
      }
    },
    CodigoDeBarra: {
      type: DataTypes.STRING(13),
      allowNull: false,
          //validaciones de codigo con su mensaje de error
      validate: {
        notNull: {
          args: true,
          msg: "Codigo De Barra es requerido",
        },
        is: {
          args: ["^[0-9]{13}$", "i"],
          msg: "Codigo de Barra debe ser numerico de 13 digitos",
        },
      },
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock es requerido",
        }
      }
    },
    FechaAlta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Alta es requerido",
        }
      }
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        }
      }
    },
  },
  {
    // los hooks para pasar a mayusculas los datos y evitan que se ingresen datos con espacios en blanco 
    // al inicio o al final, junto a estilos en el frontend, 
    // dan coherencia a los datos ingresados por el usuario.
    hooks: {
      beforeValidate: function (articulo, options) {
        if (typeof articulo.Nombre === "string") {
          articulo.Nombre = articulo.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

const clientes = sequelize.define(
  "clientes",
  {
    IdCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ApellidoYNombre: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    DNI: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (clientes, options) {
        if (typeof clientes.ApellidoYNombre === "string") {
          clientes.ApellidoYNombre = clientes.ApellidoYNombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);


module.exports = {
  sequelize,
  articulos,
  clientes
};
