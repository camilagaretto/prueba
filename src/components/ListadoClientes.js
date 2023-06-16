// se encarga de mostrar una tabla con los datos de los artículos
// este componente recibe una lista de clientes como prop (lista) y genera una tabla que muestra los clientes 
//con sus respectivos IdCliente, ApellidoYNombre y DNI. Cada cliente se muestra en una fila separada dentro de la tabla.
import React from 'react';

// Define una función de componente de flecha llamada ListadoClientes. Recibe un objeto lista como argumento 
// destructurado. Este objeto contiene la lista de clientes que se mostrará en la tabla.
const ListadoClientes = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>IdCliente</th>
            <th>Apellido y Nombre</th>
            <th>DNI</th>
        
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.IdCliente}>
              <td>{item.IdCliente}</td>
              <td>{item.ApellidoYNombre}</td>
              <td>{item.DNI}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoClientes;
