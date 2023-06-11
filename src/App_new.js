import React, { useState, useEffect, useCallback } from 'react';
import Header from './header/Header';
import Card from './cards/Card';
import './App.css';

const App_new = () => {
  const [cards, setCards] = useState([]);

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

  const modificar = (nuevoNombre, nombre) => {
    fetch('http://psp.grupito8.com/api/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `action=modificar&nuevoNombre=${nuevoNombre}&nombre=${nombre}`,
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

  return (
    <div>
      <Header />
      <div className="card-container">
        {cards.map(card => (
          <Card
            key={card.nombre}
            nombre={card.nombre}
            estado={card.estado}
            cambiarEstado={cambiarEstado}
            modificar={modificar}
            eliminar={eliminar}
          />
        ))}
      </div>
    </div>
  );
};

export default App_new;
