import React from 'react';
import '../styles/Header.css';
import bombiImage from '../images/bombi.png';

const Menu = ({ isMenuOpen, onShowDispositivos }) => {
  if (!isMenuOpen) {
    return null;
  }

  const handleShowDispositivos = () => {
    onShowDispositivos(); // Llama a la función para mostrar los dispositivos
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <img src={bombiImage} alt="Bombi" className="menu-image" />
        <h1 className="menu-title">Domotiza2</h1>
        <h3 className="menu-text">Instalación</h3>
        <p className="menu-number">0000000001</p>
      </div>
      <div className="menu-buttons">
        <button className="menu-button">Inicio</button>
        <button className="menu-button" onClick={handleShowDispositivos}>Mis dispositivos</button>
        <button className="menu-button">Configuración</button>
        <button className="menu-button">Acerca de</button>
      </div>
      <button className="menu-exit-button">Salir</button>
    </div>
  );
};

export default Menu;

