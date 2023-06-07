import React from 'react';

const Card = ({ estado, cambiarEstado }) => {
  const estadoObjeto = { estado };

  return (
    <div>
      <div className="card">
        <img
          src={estadoObjeto.estado === 'encendido' ? './images/bombilla_amarilla.png' : './images/bombilla_sin_color.png'}
          className="card-img-top"
          alt="Bombilla"
        />
        <div className="card-body">
          <h5 className="card-title">Estado actual: {estadoObjeto.estado}</h5>
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
