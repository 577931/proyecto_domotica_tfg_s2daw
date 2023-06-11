import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import bombiImage from '../images/bombi.png';

const Menu = ({ isMenuOpen, menuRef, toggleMenu = () => { } }) => {

  const handleShowDispositivos = () => {
    // Lógica para mostrar la página de dispositivos
  };

  const handleCollapseMenu = () => {
    toggleMenu();
  };

  return (
    <div ref={menuRef} className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
      <div className="menu-header">
        <button className="menu-button" onClick={toggleMenu}>
          &lt;
        </button>
        <img src={bombiImage} alt="Bombi" className="menu-image" />
        <h1 className="menu-title">Domotiza2</h1>
        <h3 className="menu-text">Instalación</h3>
        <p className="menu-number">0000000001</p>
      </div>
      <div className="menu-buttons">
        <Link to="/" className="menu-button menu-link" onClick={handleCollapseMenu}>
          Inicio
        </Link>
        <Link
          to="/dispositivos"
          className="menu-button menu-link"
          onClick={handleShowDispositivos}
        >
          Mis dispositivos
        </Link>

        <button className="menu-button">Configuración</button>
        <button className="menu-button">Acerca de</button>
      </div>
      <button className="menu-exit-button">Salir</button>
    </div>
  );
};

export default Menu;
