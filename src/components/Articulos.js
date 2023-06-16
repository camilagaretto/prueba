import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import ListadoArticulos from './ListadoArticulos'

const Articulos = () => {
  const { register, handleSubmit } = useForm();
  
  const [lista, setLista] = useState(null);

  //solicitud GET al backend usando Axios
  //Los datos que se envían como parámetros de la solicitud se pasan a través del objeto data.
  //Una vez que recibo la respuesta del backend, el resultado se almacena en response.data 
  //y se establece en el estado lista. Esto actualizará el estado en el front y reflejará los datos en la interfaz
  //si hay error en la solicitud, se captura en el bloque catch y se muestra en consola
  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:4000/api/articulos', {
        params: data
      });
      
      console.log(response.data)

      setLista(response.data)
    } catch (error) {
      console.error(error);
    }
  };
//en la linea 55 se renderiza el componente ListadoArticulos, se pasa el estado lista y en el componente 
//ListadoArticulos, se puede acceder a la prop lista y utilizarla para mostrar los datos en la tabla.
  return (
    <div className="container">
     <h1>Articulos</h1>
     <hr />
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input type="text" className="form-control" {...register('Nombre')} />
            </div>
            <div className="mb-3">
              <label className="form-label">Activo:</label>
              <select className="form-select" {...register('Activo')}>
                <option value="">Todos</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
      {lista && <ListadoArticulos lista={lista} />}
    </div>
  );
};

export default Articulos;
