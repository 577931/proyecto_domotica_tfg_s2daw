import React from 'react';
import './styles/card.css';
import automatico from './images/automatico.png';
import pasillo from './images/pasillo.png';
import garaje from './images/garaje.png';
import salon from './images/salon.png';
import cocina from './images/cocina.png';
import dormitorio_principal from './images/dormitorio_principal.png';
import dormitorio_invitados from './images/dormitorio_invitados.png';
import aire_acondicionado from './images/aire_acondicionado.png';
import horno from './images/horno.png';
import microondas from './images/microondas.png';
import lavadora from './images/lavadora.png';
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
    case 'garaje':
      imagen = garaje;
      break;
    case 'salon':
      imagen = salon;
      break;
    case 'cocina':
      imagen = cocina;
      break;
    case 'dormitorio_principal':
      imagen = dormitorio_principal;
      break;
    case 'dormitorio_invitados':
      imagen = dormitorio_invitados;
      break;
    case 'aire_acondicionado':
      imagen = aire_acondicionado;
      break;
    case 'horno':
      imagen = horno;
      break;
    case 'microondas':
      imagen = microondas;
      break;
    case 'lavadora':
      imagen = lavadora;
      break;
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
        <div className='image-container'>
          <img
            src={imagen}
            className="card-img-top"
            alt="Bombilla"
            crossOrigin="anonymous"
          />
        </div>
        <div className="card-body">
          <h4 className="card-title">{nombre}</h4>
          <h5 className="card-subtitle">Estado actual: {estado}</h5>
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
