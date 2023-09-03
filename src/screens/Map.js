import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location'; 
import { StyleSheet, Text, View, TextInput, TouchableOpacity, useWindowDimensions, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width/height; 
const LATITUDE_DELTA = 0.02; 
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; 


export default function Map() {
  const navigation = useNavigation(); 

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

  const onCreateGamePress = () => {
    // Navigate to the Create Game screen or perform other actions
  };

  const onEditProfilePress = async () => {
    // Navigate to the Edit Profile screen or perform other actions
    try {
      const response = await Auth.currentAuthenticatedUser();
      console.log('User is signed in:', response); // Logging response instead of user
      navigation.navigate('EditableProfile');
    } catch (err) {
      console.log('User is not signed in:', err);
    }
  };


    return (
      <View style={styles.container}>
        <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        region={locationInstance}
        showsUserLocation = {true}/>

        <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onCreateGamePress}>
                  <Text style={styles.buttonText}>Create Game</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onEditProfilePress}>
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
        </View>
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
    },

    buttonContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      flexDirection: 'column',
    },
    button: {
      backgroundColor: '#007AFF',
      borderRadius: 12,
      padding: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      color:'white'
    },
  });