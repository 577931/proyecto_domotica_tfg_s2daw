import React from 'react';
import './styles/Header.css';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <h1>Domotiza2</h1>
    </header>
  );
};

export default Header;
