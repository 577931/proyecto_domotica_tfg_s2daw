import React, { useEffect } from 'react';
import bombiImage from './images/bombi.png';
import bombillaSinColorImage from './images/bombilla_sin_color.png';

const Card = ({ nombre, obtenerEstado, estado, cambiarEstado }) => {
  useEffect(() => {
    obtenerEstado(nombre); // Llamada inicial a obtenerEstado

    // Limpieza del efecto
    return () => {
      // Realizar alguna limpieza si es necesario
    };
  }, [nombre, obtenerEstado, estado]); // Agregar 'nombre', 'obtenerEstado' y 'estado' como dependencias

  const handleCambiarEstado = (nuevoEstado) => {
    cambiarEstado(nuevoEstado, nombre);
  };

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
