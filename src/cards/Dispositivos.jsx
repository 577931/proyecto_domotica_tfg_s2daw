import React, { useState } from 'react';
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
import tesla from './images/tesla.png';
import vacio from './images/vacio.png';

const TituloDispositivos = ({ agregarDispositivo }) => {

  const [nuevoDispositivo, setNuevoDispositivo] = useState('');

  const handleAgregar = (event) => {
    event.preventDefault();
    if (nuevoDispositivo.trim() !== '') {
      agregarDispositivo(nuevoDispositivo);
      setNuevoDispositivo('');
    }
  };

  const handleChange = (event) => {
    setNuevoDispositivo(event.target.value);
  };

  return (
    <div className="dispositivos-header">
      <div className="add-device-container">
        <button className="btn btn-success" onClick={handleAgregar}>
          Agregar dispositivo
        </button>
        <input
          type="text"
          placeholder="Nuevo dispositivo"
          className="device-input"
          value={nuevoDispositivo}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const Dispositivos = ({ dispositivos, agregarDispositivo, modificar, eliminar }) => {
  const [editingDevice, setEditingDevice] = useState(null);
  const [nuevoDispositivo, setnuevoDispositivo] = useState('');

  const handleModificar = (nombreAnterior) => {
    if (nuevoDispositivo.trim() !== '') {
      modificar(nuevoDispositivo, nombreAnterior);
      setEditingDevice(null);
      setnuevoDispositivo('');
    }
  };

  const handleEliminar = (nombre) => {
    eliminar(nombre);
  };

  return (
    <div className="dispositivos-containeres">
      <TituloDispositivos agregarDispositivo={agregarDispositivo} />
      <div className="cards-containeres">
        {dispositivos.map(({ nombre, estado }) => {
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
            case 'tesla':
              imagen = tesla;
              break;
            default:
              imagen = vacio;
              break;
          }

          return (
            <div key={nombre} className="card">
              <div className="image-container">
                <img
                  src={imagen}
                  className="card-img-top"
                  alt="Bombilla"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="card-body">
                {editingDevice === nombre ? (
                  <div>
                    <input
                      type="text"
                      value={nuevoDispositivo}
                      onChange={(e) => setnuevoDispositivo(e.target.value)}
                      className="card-title-edit"
                    />
                    <button
                      onClick={() => handleModificar(nombre)}
                      className="btn btn-success"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4 className="card-title">{nombre}</h4>
                    <h5 className="card-subtitle">Estado: {estado}</h5>
                    <div className="btn-container">
                      <button
                        onClick={() => setEditingDevice(nombre)}
                        className="btn btn-warning"
                      >
                        Modificar
                      </button>
                      <button
                        onClick={() => handleEliminar(nombre)}
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dispositivos;

