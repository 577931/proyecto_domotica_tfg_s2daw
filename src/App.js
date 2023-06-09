import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './header/Header';
import Card from './cards/Card';
import Menu from './header/menu/Menu';

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
    obtenerNombres(); // Llamada inicial a obtenerNombres

    // Limpieza del efecto
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
        // Actualizar el estado en la interfaz después de recibir la respuesta
        obtenerEstado(nombre); // Obtener el estado actualizado desde la API
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
      setIsMenuOpen(false); // Cambiado a `false` en lugar de `true`
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Header toggleMenu={toggleMenu} />
      <div className="card-container">
        {cards.map(card => (
          <Card
            key={card.nombre}
            nombre={card.nombre}
            estado={card.estado}
            cambiarEstado={cambiarEstado}
          />
        ))}
      </div>
      {isMenuOpen && (
        <div ref={menuRef}>
          <Menu />
        </div>
      )}
    </div>
  );
};

export default App;
