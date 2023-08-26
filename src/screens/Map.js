import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location'; 


const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width/height; 
const LATITUDE_DELTA = 0.02; 
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; 


export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationInstance, setLocationInstance] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let locationSubscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        distanceInterval: 1, // receive updates when moving 1 meter
      }, (location) => {
        setCurrentLocation(location);
      });

      return () => {
        // This will remove the location subscription when the component unmounts
        locationSubscription.remove();
      };
    })();
  }, []);

  useEffect(() => {
    if (currentLocation && currentLocation.coords) {
      const { latitude, longitude } = currentLocation.coords;
      setLocationInstance({
        ...locationInstance,
        latitude,
        longitude,
      });
    }
  }, [currentLocation]);

    return (
      <View style={styles.container}>
        <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        region={locationInstance}
        showsUserLocation = {true}/>
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