import React, {useEffect, useState} from 'react';
import { Text, View, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styles'; 
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import {Auth, API, graphqlOperation} from 'aws-amplify'; 
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import * as ImagePicker from 'expo-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomButton from '../components/CustomButton';

const createGame = /* GraphQL */ `
  mutation CreateGame($input: CreateGameInput!) {
    createGame(input: $input) {
      id
      owner_sub
      address
      max_players
      num_cur_players
      small_blind
      big_blind
    }
  }
`;

export default function CreateGameForm() {
    const navigator = useNavigation();
    const [ownerSub, setOwnerSub] = useState('');
    const [address, setAddress] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const {control, reset, handleSubmit, formState: {errors}, watch, trigger} = useForm({
        mode: 'onChange',
      }); 
    
    useEffect(() => {
        console.log(address);
    }, [address]);

    useEffect(() => {
        async function fetchUser() {
          try{
            const data = await Auth.currentAuthenticatedUser();
            setOwnerSub(data["attributes"]["sub"]);
            console.log(ownerSub);
          } catch (e) {
            console.error('Failed to fetch user', e);
          }
        }
        fetchUser();
      }, []);

    const handleCreate = async (data) => {
        const {max_players, small_blind, big_blind} = data;
        const gameDetails = {
        owner_sub: ownerSub,
        address: address,
        max_players: parseInt(max_players, 10),
        small_blind: parseFloat(small_blind),
        big_blind: parseFloat(big_blind),
        };
        console.log("Sending the following details:", gameDetails);
      try {
        const newGame = await API.graphql(graphqlOperation(createGame, { input: gameDetails }));
        console.log('Game created:', newGame);
        navigator.navigate('MapView');
      } catch (error) {
        console.error('Error creating game:', error);
      }
    };
  
    return (
        <FormProvider {...{control,handleSubmit, reset, formState: {errors}, watch, trigger}}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20, height: isFocused ? '30%' : '10%'}}>
                <Text>Address</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <GooglePlacesAutocomplete
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        if (details) {
                          setAddress(details.formatted_address);
                        }
                    }}
                    query={{
                        key: 'AIzaSyD01ixqJxISffMD2Se-_W38raDjtUmA6Lo',
                        language: 'en',
                    }}
                    styles={{
                        textInputContainer: {
                          backgroundColor: '#FFC0CB',
                          width: "80%",
                          justifyContent: 'center'
                        },
                        textInput: {
                          height: 38,
                          color: 'black',
                          fontSize: 16,
                          backgroundColor: '#FFC0CB',
                        },
                        predefinedPlacesDescription: {
                          color: 'black',
                        },
                      }}
                      textInputProps={{
                        onFocus: () => setIsFocused(true),
                        onBlur: () =>{
                            setIsFocused(false);
                        }
                        }}
                    />
                </View>
            </View>

            <View style={[styles.inputView, {alignSelf: 'center'}]}>
                <CustomTextInput
                name={"max_players"}
                placeholder='Max Players.'
                control={control}
                keyboardType="numeric"
                />
            </View>
            
            <View styles = {{alignItems: 'center', alignSelf: 'center', justifyContent:'center'}}>
            <View style={[styles.inputView, {alignSelf: 'center'}]}>
                <CustomTextInput
                name={"small_blind"}
                placeholder='Small Blind.'
                control={control}
                keyboardType="numeric"
                />
            </View>

            <View style={[styles.inputView, {alignSelf: 'center'}]}>
                <CustomTextInput
                name="big_blind"
                placeholder='Big Blind.'
                control={control}
                keyboardType="numeric"
                />
            </View>
                
            <TouchableOpacity style={[styles.loginBtn, {alignSelf: 'center'}]} onPress={handleSubmit(handleCreate)}>
                <Text style={styles.primaryBtnText}>Create</Text> 
            </TouchableOpacity>
            </View>
            
      </FormProvider>
    );
  }