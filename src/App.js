import React, { useState, useEffect } from 'react';

const App = () => {
  const [estado, setEstado] = useState('');

  // Obtener el estado actual al cargar la página
  useEffect(() => {
    obtenerEstado();
  }, []);

  // Función para obtener el estado actual de la API
  const obtenerEstado = () => {
    fetch('http://psp.grupito8.com/api/index.php?action=estado')
      .then(response => response.text())
      .then(data => {
        setEstado(data);
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
      <h1>Estado actual: {estado}</h1>
      <button onClick={() => cambiarEstado('encendido')}>Encender</button>
      <button onClick={() => cambiarEstado('apagado')}>Apagar</button>
    </div>
  );
};

export default App;
