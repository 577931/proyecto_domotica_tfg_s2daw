import React, { useState, useEffect } from 'react';
import Card from './Card';
import Header from './header/Header';

const App = () => {
  const [estado, setEstado] = useState('');
  const [nombre, setNombre] = useState('');

  // Obtener el estado actual y el nombre al cargar la página
  useEffect(() => {
    obtenerEstado();
    obtenerNombre();
  }, []);

  // Función para obtener el estado actual de la API
  const obtenerEstado = () => {
    fetch('http://psp.grupito8.com/api/index.php?action=estado')
      .then(response => response.json())
      .then(data => {
        setEstado(data.estado);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // Función para obtener el nombre de la API
  const obtenerNombre = () => {
    fetch('http://psp.grupito8.com/api/index.php?name=nombre')
      .then(response => response.text())
      .then(data => {
        setNombre(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // Función para cambiar el estado en la API
  const cambiarEstado = nuevoEstado => {
    fetch('http://psp.grupito8.com/api/index.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action: 'cambiar',
        estado: nuevoEstado
      })
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        obtenerEstado(); // Actualiza el estado después de cambiarlo
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <Header />
      <Card nombre={nombre} estado={estado} cambiarEstado={cambiarEstado} />
    </div>
  );
};

export default App;