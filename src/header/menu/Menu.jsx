import React from 'react';
import '../styles/Header.css';
import bombiImage from '../images/bombi.png';

const Menu = ({ isMenuOpen }) => {
  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <img src={bombiImage} alt="Bombi" className="menu-image" />
        <h1 className="menu-title">Nº de instalación</h1>
        <p className="menu-number">1234567890</p>
      </div>
      <div className="menu-buttons">
        <button className="menu-button">Mis dispositivos</button>
        <button className="menu-button">Configuración</button>
        <button className="menu-button">Acerca de</button>
      </div>
      <button className="menu-exit-button">Salir</button>
    </div>
  );
};

export default Menu;
