import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

function DevItem({ dev, onPress }) {
  return (
    <Marker 
      coordinate={{ 
        latitude: dev.location.coordinates[1], 
        longitude: dev.location.coordinates[0]
      }}
    >
      <Image 
        style={styles.avatar}
        source={{ 
          uri: dev.avatar_url
        }}
      />
      <Callout 
        onPress={onPress}
      >
        <View style={styles.callout}>
          <Text style={styles.devName}>{dev.name}</Text>
          <Text style={styles.devBio}>{dev.bio}</Text>
          <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
        </View>
      </Callout>
    </Marker>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },
  callout: {
    width: 260,
    marginTop: 5,
    marginLeft: 5
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 6
  },
  devTechs: {
    marginTop: 5
  }
});

export default DevItem;