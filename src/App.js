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

  const estadoObjeto = { estado };

  return (
    <div>
      <div className="card">
        <img
          src={estadoObjeto.estado === 'encendido' ? './images/bombilla_amarilla.png' : './images/bombilla_sin_color.png'}
          className="card-img-top"
          alt="Bombilla"
        />
        <div className="card-body">
          <h5 className="card-title">Estado actual: {estadoObjeto.estado}</h5>
          <button onClick={() => cambiarEstado('encendido')} className="btn btn-primary">
            Encender
          </button>
          <button onClick={() => cambiarEstado('apagado')} className="btn btn-danger">
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;