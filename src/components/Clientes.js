//El componente Clientes representa una interfaz de búsqueda de clientes. Al enviar el formulario, 
//se realiza una solicitud HTTP a una API en http://localhost:4000/api/Clientes con los datos del formulario 
//como parámetros. La respuesta de la solicitud se almacena en el estado local lista y se muestra utilizando
//el componente ListadoClientes.
import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import ListadoClientes from './ListadoClientes'

const Clientes = () => {
  //Utiliza el hook useForm para obtener las funciones register y handleSubmit, 
  //que se utilizarán para registrar campos de formulario y manejar el envío del formulario
  const { register, handleSubmit } = useForm();
  
  const [lista, setLista] = useState(null);

  const onSubmit = async (data) => {
    try {
      //Realiza una solicitud GET utilizando Axios a la URL pasando los datos del formulario como parámetros en la URL.
      const response = await axios.get('http://localhost:4000/api/Clientes', {
        params: data
      });
      
      console.log(response.data)

      //Actualiza el estado lista con los datos de respuesta obtenidos de la solicitud HTTP.
      setLista(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  //En resumen, esta parte del código representa un formulario de búsqueda de clientes. 
  //El usuario puede ingresar un apellido y un nombre en el campo de entrada, y al hacer clic en el botón "Buscar", se ejecutará la función onSubmit y se mostrará la lista de clientes coincidentes utilizando el componente ListadoClientes.
  return (
    <div className="container">
     <h1>Clientes</h1>
     <hr />
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Apellido y Nombre:</label>
              <input type="text" className="form-control" {...register('ApellidoYNombre')} />
            </div>
           
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
      {lista && <ListadoClientes lista={lista} />}
    </div>
  );
};

export default Clientes;