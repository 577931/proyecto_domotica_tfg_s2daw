import React, { useState } from 'react';
import './styles/Header.css';
import Logo from './Logo';
import Menu from './menu/Menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="menu" onClick={toggleMenu}>
        <h1 className="menu-text">=</h1>
      </div>
      <div className='centrado'>
        <Logo />
        <h1>Domotiza2</h1>
      </div>
      <div className='beta'>
        <h1 className="beta-text">B E T A</h1>
      </div>
      <Menu isMenuOpen={isMenuOpen} /> {/* Pasar el estado isMenuOpen como prop */}
    </header>
  );
};

export default Header;
