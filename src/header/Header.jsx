import React from 'react';
import './styles/Header.css';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="header">
      <div className='menu'>
        <h1 className="menu-text">=</h1>
      </div>
      <div className='centrado'>
        <Logo />
        <h1>Domotiza2</h1>
      </div>
      <div className='beta'>
        <h1 className="beta-text">B E T A</h1>
      </div>
    </header>
  );
};

export default Header;
