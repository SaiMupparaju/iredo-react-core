import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Storage } from 'aws-amplify';

export default function ProfileSetupScreen() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});
