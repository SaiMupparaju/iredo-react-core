import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width/height; 
const LATITUDE_DETLA = 0.02; 
const LONGITUDE_DELTA = LATITUDE_DETLA * ASPECT_RATIO; 
const INITIAL_POSITION = {
  latitude: 38.972920,
  longitude: -77.518540, 
  latitudeDelta: LATITUDE_DETLA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function Map() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion = {INITIAL_POSITION}/>
      </View>
    );
  }

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
  });