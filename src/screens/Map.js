import React, {useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location'; 
import { StyleSheet,  View, Dimensions, Animated, Text, SafeAreaView, ScrollView, Easing, TouchableOpacity  } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import { getGamesNearMe } from '../graphql/queries';
import HomeStack from '../components/BottomTab';
import {GameView} from '../components/GameView'

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width/height; 
const LATITUDE_DELTA = 0.02; 
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; 
const fadeAnim = new Animated.Value(0);  

export default function Map() {
  const navigation = useNavigation(); 

  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationInstance, setLocationInstance] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useFocusEffect(
    React.useCallback(() => {
      // Your effect here.
      // This will run when the screen is focused
      // It will also run when you navigate back to the screen
      
      // Example: Refreshing the location when the screen focuses
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
  
        let locationSubscription = await Location.watchPositionAsync({
          accuracy: Location.Accuracy.High,
          distanceInterval: 100, // receive updates when moving 1 meter
        }, (location) => {
          setCurrentLocation(location);
        });
  
        return () => {
          // This will remove the location subscription when the screen is unfocused
          locationSubscription.remove();
        };
      })();
  
    }, [])
  );

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


  const [games, setGames] = useState(null);

  const fetchNearbyGames = async (latitude, longitude) => {
    try {
      const variables = { latitude, longitude };
      const gameData = await API.graphql(graphqlOperation(getGamesNearMe, variables));
      const gameList = gameData["data"]["getGamesNearMe"]; // the query name
      setGames(gameList);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  
  // Now you can call fetchNearbyGames in your useEffect
  useEffect(() => {
    if (currentLocation && currentLocation.coords) {
      const { latitude, longitude } = currentLocation.coords;
      fetchNearbyGames(latitude, longitude);
    }
  }, [currentLocation]);

  useEffect(() => {
    console.log("games", games);
  }, [games]);

  const [selectedGame, setSelectedGame] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }
    ).start();
  };

  const hidePopup = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 400,
        easing: Easing.ease,
        useNativeDriver: true,
      }
    ).start(() => {
      setPopupVisible(false);
    });
  };

  const togglePopup = () => {
    setPopupVisible(true);
  };

  const onMarkerPress = (game) => {
    setSelectedGame(game);
    setPopupVisible(true);
    showPopup();
  };

  

    return (
      <View style={styles.container}>
        <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        region={locationInstance}
        showsUserLocation = {true}>
          {
          games && games.map((game, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: game.latitude,
              longitude: game.longitude,
            }}
            title={"Poker Gamer"} // Replace with actual game name or title
            description={"pp"} // Replace with actual description or other info
            onPress={() => {
              // Handle marker click here
              onMarkerPress(game);
            }}
          />
          ))
          }
        </MapView>
        {(popupVisible) && (
          <Animated.View style = {styles.popup}>
              <TouchableOpacity style={styles.closeButton} onPress={hidePopup}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            <SafeAreaView>
              <ScrollView>
                <Text>
                  <GameView game={selectedGame} />
                </Text>
              </ScrollView>
            </SafeAreaView>
          </Animated.View>
        )}

        <HomeStack />
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
    bottomTab: {
      position: 'absolute',
      height: '15%',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    tabButton: {
      padding: 10,
      backgroundColor: '#007AFF',
      borderRadius: 10,
      alignContent: 'center',
      justifyContent: 'center', 
    },
    tabButtonText: {
      color: 'white',
    },
    popup: {
      position: 'absolute',
      top: '25%',  // Adjust according to your preference
      left: '5%',  // Adjust according to your preference
      width: '90%',  // Adjust according to your preference
      height: '50%',  // Adjust according to your preference
      backgroundColor: 'white',
      borderRadius: 10,  // Rounded corners
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      right: 10,
      top: 10,
      zIndex: 1,
      backgroundColor: 'gray',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontSize: 18,
    },
  });
