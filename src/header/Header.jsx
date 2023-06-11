import React, { useState } from 'react';
import './styles/Header.css';
import Logo from './Logo';
import Menu from './menu/Menu';

const Header = ({ onShowDispositivos }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShowDispositivos = () => {
    setIsMenuOpen(false);
    onShowDispositivos();
  };

  return (
    <header className="header">
      <div className="menu" onClick={handleToggleMenu}>
        <h1 className="menu-text">=</h1>
      </div>
      <div className='centrado'>
        <Logo />
        <h1>Domotiza2</h1>
      </div>
      <div className='beta'>
        <h1 className="beta-text">B E T A</h1>
      </div>
      <Menu isMenuOpen={isMenuOpen} onShowDispositivos={handleShowDispositivos} />
    </header>
  );
};

export default Header;