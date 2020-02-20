import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import SearchForm from './searchForm';
import DevItem from './devItem';

import api from '../../services/api';
import {connect, disconnect} from '../../services/socket';

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted)
      {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }

    loadInitialPosition();
  }, []);

  function setupWebsocket() {
    const { latitude, longitude } = currentRegion;
    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data);
    setupWebsocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion} 
        style={styles.map}
      >
        {devs.map(dev => (
          <DevItem 
            key={dev._id}
            dev={dev} 
            onPress={()=>{
              // Navegação
              navigation.navigate('Profile', { 
                github_username: dev.github_username
              });
            }} 
          />
        ))}
      </MapView>

      <SearchForm 
        value={techs}
        onChangeText={setTechs}
        onPress={loadDevs}
      />
    </>
  ) 
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default Main;