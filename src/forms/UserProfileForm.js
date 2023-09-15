import React, {useEffect, useState} from 'react';
import { Text, View, Image, Button } from 'react-native';
import styles from '../Styles'; 
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import {Auth, Storage} from 'aws-amplify'; 
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import * as ImagePicker from 'expo-image-picker';
import HomeStack from '../components/BottomTab';



export default function UserProfileScreenEditable() {
  const navigation = useNavigation();  
  const bucketName = "iredoprofilepicture33352-staging";

  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try{
        const data = await Auth.currentAuthenticatedUser();
        setUser(data);
        const {attributes} = data; 
        setFirstName(attributes["name"]);
        setLastName(attributes["family_name"]);
        setDate(attributes["birthdate"] || "");

        fetchImage(attributes);
      } catch (e) {
        console.error('Failed to fetch user', e);
      }
    }
    fetchUser();
  }, []);
  

  const {control, handleSubmit, reset, formState: {errors}, watch, trigger} = useForm({
    mode: 'onChange',
    defaultValues: {
      first_name: firstName || "",
      last_name: lastName || "", 
      birthday: date || "",
    },
  }); 

  useEffect(() => {
    if (firstName && lastName) {
      reset({
        first_name: firstName,
        last_name: lastName,
        birthday: date,
      });
    }
  }, [firstName, lastName, date]);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      if (selectedAsset) {
        setImage(selectedAsset.uri);
      }
    }
  };

  const uploadImage = async (userId) => {
    const key = `public/coolsquad-storage-8dce078355210-staging/${userId}.jpeg`;
    // Convert image URI to blob
    const response = await fetch(image);
    const blob = await response.blob();
    await Storage.put(key, blob, {
      contentType: 'image/png',
    }); 
    return key;
  };

  const saveProfile = async (data) => {
    const {first_name, last_name} = data;
    try {
      const userId = user.attributes["sub"]; // unique identifier for the user
  
      // Upload Image and get the key
      const imageKey = await uploadImage(userId);
  
      // Save other profile information
      // Here, you would use Amplify's API or DataStore to save the other fields along with the `imageKey`
      // to DynamoDB or your choice of database.
      const result = await Auth.updateUserAttributes(user, {
        "name": first_name,
        "family_name": last_name,
        //"birthdate": birthdate,
      });

      navigation.navigate("MapView");
    } catch (error) {
      console.log('Error saving profile: ', error);
    }
  };

  const fetchImage = async (attributes) => {
    try {
      const userId = attributes["sub"]; // unique identifier for the user
      const imageKey = `public/coolsquad-storage-8dce078355210-staging/${userId}.jpeg`; 
      const signedUrlExpireSeconds = 60 * 10; // Assuming the image key is based on the user ID, you should change this based on how you save the images
      const signedUrl = await Storage.get(imageKey);
      
      setImage(signedUrl);
    } catch (error) {
      console.log('Error fetching image:', error);
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <FormProvider {...{control, handleSubmit, reset, formState: {errors}, watch, trigger}}>
      <View style={styles.profileContainer}>

        <Text>Profile Picture:</Text>
        <Button title="Pick an image" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Text>First Name:</Text>
        <View style = {styles.inputView} >
          <CustomTextInput
            name = {"first_name"}
            style={styles.TextInput}
            Controller={control}
            placeholder= {firstName}
          />
        </View>

        <Text>Last Name:</Text>
        <View style = {styles.inputView} >
          <CustomTextInput
            name = {"last_name"}
            style={styles.TextInput}
            Controller={control}
            placeholder={lastName}
          />
        </View>

        <Text>Birthday:</Text>
        <View style = {styles.inputView} >
          <CustomTextInput
            name = {"birthday"}
            style={styles.TextInput}
            Controller={control}
            //placeholder= "year-mm-dd"
          />
        </View>

        <Button title="Save Profile" onPress={handleSubmit(saveProfile)} />

        <HomeStack></HomeStack>
      </View>
    </FormProvider>
  );
}