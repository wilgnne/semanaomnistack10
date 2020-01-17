import React, { useEffect, useState } from 'react';

import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const {
      github_username,
      techs,
      latitude,
      longitude
    } = data;

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    });

    setDevs([...devs, response.data]);
  }

  async function handleRemoveDev(dev) {
    const response = await api.delete(`/devs/${dev.github_username}`);
    console.log(response);

    setDevs(devs.filter(d => d.github_username !== dev.github_username));
  }

  async function handleEditDev(dev) {
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>

          {devs.map(dev => (
            <DevItem 
              key={dev._id} 
              dev={dev} 
              onDestroy={handleRemoveDev}
              onEdit={handleEditDev}
            />
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App;
