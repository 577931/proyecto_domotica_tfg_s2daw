import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Card from './cards/Card';

const App = () => {
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
    obtenerNombres(); // Llamada inicial a obtenerNombres

    // Limpieza del efecto
    return () => {
      // Realizar alguna limpieza si es necesario
    };
  }, []);

  const obtenerEstado = (nombre) => {
    fetch(`http://psp.grupito8.com/api/index.php?action=estado&name=${nombre}`)
      .then(response => response.json())
      .then(data => {
        const updatedCards = cards.map(card => {
          if (card.nombre === nombre) {
            return {
              ...card,
              estado: data.estado
            };
          }
          return card;
        });
        setCards(updatedCards);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

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
          />
        ))}
      </div>
    </div>
  );
};

export default App;
