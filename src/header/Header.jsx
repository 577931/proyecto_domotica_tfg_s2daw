import React, { useState } from 'react';
import './styles/Header.css';
import Logo from './Logo';
import Menu from './menu/Menu';

const Header = ({ toggleMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleMenu();
  };

  return (
    <header className={`header ${isMenuOpen ? '' : 'collapsed'}`}>
      <button className={`menu-button ${isMenuOpen ? 'open' : ''}`} onClick={handleToggleMenu}>
        =
      </button>
      <div className='centrado'>
        <Logo />
        <h1>Domotiza2</h1>
      </div>
      <div className='beta'>
        <h1 className="beta-text">B E T A</h1>
      </div>
      <Menu isMenuOpen={isMenuOpen} toggleMenu={handleToggleMenu} />
    </header>
  );
};

export default Header;