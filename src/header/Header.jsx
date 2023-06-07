import React from 'react';
import './styles/Header.css';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <img src='../../public/images/bombi.png' alt='logo' className='logo'></img>
      <h1>Domotiza2</h1>
    </header>
  );
};

export default Header;
