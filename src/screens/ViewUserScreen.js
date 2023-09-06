import React, {useEffect, useState} from 'react';
import { Text, View, Image, Button } from 'react-native';
import styles from '../Styles'; 
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import {Auth, API} from 'aws-amplify'; 
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import { Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';


export default function UserProfileView({owner_email}) {
    const navigation = useNavigation(); 
    const [isOwner, setIsOwner] = useState(False); 
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [ownerData, setOwnerData] = useState(null);

    useEffect(() => {
        // Fetch the owner data
        const fetchOwnerData = async (email) => {
          try {
            const apiName = 'yourApiName'; // replace with your API name
            const path = '/yourPath'; // replace with your API path
            const queryParams = { email: email }; // query params
            const response = await API.get(apiName, path, { queryStringParameters: queryParams });
            const { statusCode, body } = response;
            if (statusCode === 200) {
              const userData = JSON.parse(body);
              setOwnerData(userData);
            }
          } catch (error) {
            console.error('Error fetching owner data:', error);
          }
        };
    
        fetchOwnerData(owner_email);
    
      }, []);


    useEffect(() => {
        try {
            const data = Auth.currentAuthenticatedUser();
            setUser(data);
            setIsOwner(data["attributes"]["email"] == owner_sub);


            setImage(fetchImage(owner_sub));
        }catch (e) {
            console.log('Failed to fetch data', e);
        }
    }, []);

    const fetchImage = async (sub) => {
        try {
            const userId = sub; // unique identifier for the user
            const imageKey = `coolsquad-storage-8dce078355210-staging/${userId}.png`; // Assuming the image key is based on the user ID, you should change this based on how you save the images
            const signedUrl = await Storage.get(imageKey);
            return signedUrl;
        } catch (error) {
            console.log('Error fetching image:', error);
        }
        };

    

    return (
    <View style={styles.container}>
        {image ? (
        <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
        <Text>No Profile Image</Text>
        )}
        <Text>First Name: {user.firstName}</Text> {/* Adapt this based on your data model */}
        <Text>Family Name: {user.familyName}</Text>
        <Text>Birthday: {user.birthday}</Text>
        {isOwner && (
        <Button
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')} // Navigate to the EditProfile screen
        />
        )}
    </View>
    );
}