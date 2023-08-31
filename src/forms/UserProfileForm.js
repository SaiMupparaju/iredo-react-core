import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import {useState} from 'react'; 
import styles from '../Styles'; 
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import {Auth} from 'aws-amplify'; 
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import * as ImagePicker from 'expo-image-picker';

export default function UserProfileScreenEditable() {
    const ProfileSetupScreen = () => {
        const [bio, setBio] = useState('');
        const [age, setAge] = useState('');
        const [image, setImage] = useState(null);
      
        const pickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.cancelled) {
            setImage(result.uri);
          }
        };
      
        const uploadImage = async () => {
          const fileName = image.split('/').pop();
          const fileType = image.split('.').pop();
          const key = `images/${fileName}`;
      
          await Storage.put(key, image, {
            contentType: `image/${fileType}`,
          });
        };
      
        const saveProfile = async () => {
          await uploadImage();
          // Save other profile info (like bio and age) to a database
          // You can use AWS Amplify's API or DataStore for this
        };
      
        return (
          <View style={styles.container}>
            <Text style={styles.label}>Profile Setup</Text>
      
            <Button title="Pick an image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      
            <Text>Bio:</Text>
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={setBio}
              placeholder="Write something about yourself"
            />
      
            <Text>Age:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Your age"
              keyboardType="numeric"
            />
      
            <Button title="Save Profile" onPress={saveProfile} />
          </View>
        );
      };
    
}