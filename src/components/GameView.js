import React, {useEffect, useState} from 'react';
import { Text, View, Image, Button, StyleSheet} from 'react-native';
import styles from '../Styles'; 
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import {Auth, Storage} from 'aws-amplify'; 
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import * as ImagePicker from 'expo-image-picker';
import HomeStack from '../components/BottomTab';
import CustomButton from './CustomButton';
import {API, graphqlOperation} from 'aws-amplify';

//graphQL Mutation
const createGameRequestMutation = /* GraphQL */ `
  mutation CreateGameRequest($gameID: ID!, $requester_sub: String!, $status: String!) {
    createGameRequest(input: {gameID: $gameID, requester_sub: $requester_sub, status: $status}) {
      id
      gameID
      requester_sub
      status
    }
  }
`;

export function GameView({game}) {
    if (game == null) {
        return;
    }
      
    const navigation = useNavigation();  
    const bucketName = "iredoprofilepicture33352-staging";
  
    const game_owner = game?.["owner_sub"];
    const [image, setImage] = useState(null);
    
    useEffect(() => {
      async function fetchProfileImage() {
        try {
          const accessUrl = await Storage.get(
            `coolsquad-storage-8dce078355210-staging/${game_owner}.png`,
            {
              level: 'public', // or private, protected, etc.
              bucket: 'iredoprofilepicture33352-staging', // Optional if the bucket is set in Amplify configuration
            }
          );
          setImage(accessUrl);
        } catch (error) {
          console.error('Error fetching profile image:', error);
        }
      }
  
      fetchProfileImage();
    }, [game]);

    const onRequestPressed = async () => {
        try {
            const data = await Auth.currentAuthenticatedUser(); 
            const requester_sub = data['attributes']['sub'];
            const status = 'PENDING'; 
            const gameID = game['id'];
            const result = await API.graphql(
                graphqlOperation(createGameRequestMutation, {
                  gameID,
                  requester_sub,
                  status,
                })
              );
        
              console.log('Game Request created: ', result);
        } catch (error) {
            console.log(error);
        }
    };
  
    return (
        <View style={customStyles.container}>
            {image && <Image source={{ uri: image }} style={customStyles.profileImage} />}
            <Text style={customStyles.title}>Game Details</Text>
            <View style={customStyles.infoContainer}>
                <Text style={customStyles.label}>Address:</Text>
                <Text style={customStyles.value}>{game['address']}</Text>
            </View>
            <View style={customStyles.infoContainer}>
                <Text style={customStyles.label}>Small Blind:</Text>
                <Text style={customStyles.value}>{game['small_blind']}</Text>
            </View>
            <View style={customStyles.infoContainer}>
                <Text style={customStyles.label}>Big Blind:</Text>
                <Text style={customStyles.value}>{game['big_blind']}</Text>
            </View>

            <CustomButton text = {"Request to Join"} type={"SECONDARY"} onPress={onRequestPressed}></CustomButton>
        </View>
    );
  }

  const customStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',  // Changed to 100%
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 18,
        flexShrink: 1 
    },
});