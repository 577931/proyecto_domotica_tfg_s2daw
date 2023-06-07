import React from 'react';
import bombiImage from './images/bombi.png';
import bombillaSinColorImage from './images/bombilla_sin_color.png';

const Card = ({ nombre, estado, cambiarEstado }) => {
  return (
    <div>
      <div className="card">
        <img
          src={estado === 'encendido' ? bombiImage : bombillaSinColorImage}
          className="card-img-top"
          alt="Bombilla"
          crossOrigin="anonymous"
        />
        <div className="card-body">
          <h5 className="card-title">Estado actual: {estado}</h5>
          <h6 className="card-subtitle">Nombre: {nombre}</h6>
          <button onClick={() => cambiarEstado('encendido')} className="btn btn-primary">
            Encender
          </button>
          <button onClick={() => cambiarEstado('apagado')} className="btn btn-danger">
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;