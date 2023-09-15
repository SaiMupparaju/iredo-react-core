import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {Auth} from 'aws-amplify';
import { useNavigation} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import { listGameRequests, listGames } from '../graphql/queries';

// Define the GetGameByOwner query
const GetGameByOwner = /* GraphQL */ `
  query GetGameByOwner($owner_sub: String!) {
    listGames(filter: { owner_sub: { eq: $owner_sub } }) {
      items {
        id
        owner_sub
        max_players
        num_cur_players
        small_blind
        big_blind
      }
    }
  }
`;

// Define the GetGameRequests query without the 'or' operator
const GetGameRequests = /* GraphQL */ `
  query GetGameRequests($gameID: ID!) {
    listGameRequests(filter: { gameID: { eq: $gameID } }) {
      items {
        id
        gameID
        requester_sub
        status
      }
    }
  }
`;

export default function HomeStack() {
    const navigation = useNavigation(); 
    

    const fetchMyGame = async (userSub) => {
      try {
          const gameData = await API.graphql(graphqlOperation(GetGameByOwner, { owner_sub: userSub }));
          if (gameData.data.listGames.items.length > 0) {
            const game = gameData.data.listGames.items[0];
            const gameId = game.id;
            console.log(gameId);
            const requestGameData = await API.graphql(graphqlOperation(GetGameRequests, { gameID: gameId }));
            const pendingRequests = requestGameData.data.listGameRequests.items.filter(request => request.status === 'PENDING');
            const acceptedRequests = requestGameData.data.listGameRequests.items.filter(request => request.status === 'ACCEPTED');
            // Navigate to the game view screen with pendingRequests as a prop
            navigation.navigate("MyGame", { game, pendingRequests, acceptedRequests });
          } else {
            navigation.navigate("CreateGame");
          }
      } catch (error) {
          console.error("Error fetching my game:", error);
      }
  };

    const onCreateGamePress = async() => {
        try {
          const currentUser = await Auth.currentAuthenticatedUser();
          const userSub = currentUser['attributes']['sub']; 
          fetchMyGame(userSub); 
        }catch(error){
          console.log(error);
        }
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
    
      const onHomePressed = async () => {
        navigation.navigate('MapView');
      };

    return (
        <View style={styles.bottomTab}>
            <TouchableOpacity style={styles.tabButton} onPress={onHomePressed}>
                <Text style={styles.tabButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={onCreateGamePress}>
                <Text style={styles.tabButtonText}>My Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={onEditProfilePress}>
                <Text style={styles.tabButtonText}>My Profile</Text>
            </TouchableOpacity>
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
      height: '12%',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(225,225,225, 0.9)',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    tabButton: {
      padding: 10,
      backgroundColor: 'pink',
      borderRadius: 10,
      alignContent: 'center',
      justifyContent: 'center',
      width: 70
    },
    tabButtonText: {
      color: 'white',
    },
  });