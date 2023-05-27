import React, { useState, useEffect } from 'react';

const API_URL = 'http://psp.grupito8.com/api/index.php?action=estado';

const Card = ({ id, estado, onToggle }) => {
  const bulbColor = estado === 'encendido' ? 'yellow' : 'transparent';

  const handleToggle = () => {
    onToggle(id, estado);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="bulb" style={{ backgroundColor: bulbColor }}></div>
        <h5 className="card-title">ID: {id}</h5>
        <button onClick={handleToggle} className="btn btn-primary">
          {estado === 'encendido' ? 'Apagar' : 'Encender'}
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      console.log(response);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleToggle = async (id, estado) => {
    const newEstado = estado === 'encendido' ? 'apagado' : 'encendido';

    try {
      const response = await fetch(`${API_URL}&id=${id}&estado=${newEstado}`, { method: 'POST' });
      if (response.ok) {
        // Actualizar el estado localmente
        setCards(prevCards =>
          prevCards.map(card => (card.id === id ? { ...card, estado: newEstado } : card))
        );
      } else {
        console.error('Error al cambiar el estado');
      }
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {cards.map(card => (
          <div key={card.id} className="col-md-4">
            <Card id={card.id} estado={card.estado} onToggle={handleToggle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
