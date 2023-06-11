import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './header/Header';
import Card from './cards/Card';
import Menu from './header/menu/Menu';
import Dispositivos from './cards/Dispositivos';

const App = () => {
  const [cards, setCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const obtenerNombres = () => {
    fetch('http://psp.grupito8.com/api/index.php?action=estados')
      .then(response => response.json())
      .then(data => {
        setCards(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    obtenerNombres();

    return () => {
      // Realizar alguna limpieza si es necesario
    };
  }, []);

  const obtenerEstado = useCallback((nombre) => {
    return fetch(`http://psp.grupito8.com/api/index.php?action=estado&name=${nombre}`)
      .then(response => response.json())
      .then(data => data.estado)
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const cambiarEstado = (nuevoEstado, nombre) => {
    fetch('http://psp.grupito8.com/api/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `action=cambiar&name=${nombre}&estado=${nuevoEstado}`,
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        obtenerNombres();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const modificar = (nuevoNombre, nombreAnterior) => {
    fetch('http://psp.grupito8.com/api/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `action=modificar&nuevoNombre=${nuevoNombre}&nombreAnterior=${nombreAnterior}`,
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        obtenerNombres();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


  const eliminar = (nombre) => {
    fetch('http://psp.grupito8.com/api/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `action=eliminar&nombre=${nombre}`,
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        obtenerNombres();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    Promise.all(cards.map(card => obtenerEstado(card.nombre)))
      .then(estadoActualizadoArray => {
        const updatedCards = cards.map((card, index) => ({
          ...card,
          estado: estadoActualizadoArray[index]
        }));
        setCards(updatedCards);
      });
  }, [cards, obtenerEstado]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div>
        <Header toggleMenu={toggleMenu} />
        <div className="btn-container">
          <Link to="/" className="btn btn-primary">
            Inicio
          </Link>
          <Link to="/dispositivos" className="btn btn-primary">
            Mis Dispositivos
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<div className="card-container">
            {cards.map(card => (
              <Card
                key={card.nombre}
                nombre={card.nombre}
                estado={card.estado}
                cambiarEstado={cambiarEstado}
              />
            ))}
          </div>} />
          <Route path="/dispositivos" element={<div className="card-container">
            {cards.map(card => (
              <Dispositivos
                key={card.nombre}
                nombre={card.nombre}
                estado={card.estado}
                modificar={modificar}
                eliminar={eliminar}
              />
            ))}
          </div>} />
        </Routes>
        {isMenuOpen && (
          <div ref={menuRef}>
            <Menu />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
