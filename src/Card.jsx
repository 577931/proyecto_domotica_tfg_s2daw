import React from 'react';
import automatico from './images/automatico.png';
import pasillo from './images/pasillo.png';
import vacio from './images/vacio.png';
// Importa otras imágenes necesarias aquí

const Card = ({ nombre, estado, cambiarEstado }) => {
  let imagen;

  switch (nombre) {
    case 'automatico':
      imagen = automatico;
      break;
    case 'pasillo':
      imagen = pasillo;
      break;
    // Agrega más casos para cada nombre y su correspondiente imagen
    default:
      // Imagen por defecto si no se encuentra un caso coincidente
      imagen = vacio;
      break;
  }

  const handleCambiarEstado = (nuevoEstado) => {
    cambiarEstado(nuevoEstado, nombre);
  };

  return (
    <div>
      <div className="card">
        <img
          src={imagen}
          className="card-img-top"
          alt="Bombilla"
          crossOrigin="anonymous"
        />
        <div className="card-body">
          <h5 className="card-title">Estado actual: {estado}</h5>
          <h6 className="card-subtitle">Nombre: {nombre}</h6>
          <button onClick={() => handleCambiarEstado('encendido')} className="btn btn-success">
            Encender
          </button>
          <button onClick={() => handleCambiarEstado('apagado')} className="btn btn-danger">
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
