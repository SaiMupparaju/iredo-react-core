import React, {useState, useEffect} from 'react';
import Map from "./src/screens/Map.js";
import LoginPage from './src/screens/LoginPage.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './src/screens/RegisterPage.js';
import {Amplify, Auth} from 'aws-amplify'; 
import awsExports from './src/aws-exports.js'; 
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen.js';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen.js';
import NewPasswordScreen from './src/screens/NewPasswordScreen.js';
import UserProfileScreenEditable from './src/forms/UserProfileForm.js';
import CreateGameForm from './src/forms/CreateGameForm.js';
import HomeStack from './src/components/BottomTab.js';
import MyGame from './src/MyGame.js';

Amplify.configure({
  ...awsExports,
  Storage: {
    AWSS3: {
      bucket: 'iredoprofilepicture33352-staging',
      region: 'us-east-1',  // Make sure this is set
    }
  }
}); 
const Stack = createNativeStackNavigator();

const App = () => {

  const [user, setUser] = useState(null);


  useEffect(() => { // Moved checkUser inside useEffect
    async function checkUser() {
      try {
        const response = await Auth.currentAuthenticatedUser();
        console.log('User is signed in:', response); // Logging response instead of user
        setUser(response);
      } catch (err) {
        console.log('User is not signed in:', err);
      }
    }

    checkUser();
  }, []); 

  const initialRouteName = user ? "MapView" : "Login" 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name = "MapView" component={Map} options={{
          headerShown: false
        }}/>
        <Stack.Screen name = "Login" component={LoginPage} options={{title:"Login"}}/>
        <Stack.Screen name = "RegisterPage" component={RegisterPage} options={{title:"Register"}} />
        <Stack.Screen name = "EmailVerification" component={ConfirmEmailScreen} options = {{title:"Verify Email"}} />
        <Stack.Screen name = "ForgotPasswordScreen" component={ForgotPasswordScreen} options={{title:"Send Reset Code"}}/>
        <Stack.Screen name = "NewPassword" component={NewPasswordScreen} options = {{title:"Verify and Change Password"}}/>
        <Stack.Screen name = "EditableProfile" component = {UserProfileScreenEditable} options = {{title: "Edit Profile"}} />
        <Stack.Screen name = "CreateGame" component = {CreateGameForm} options = {{title: "Create Your Game"}} />
        <Stack.Screen name = "MyGame" component = {MyGame} options = {{headerShown: false}} />
        <Stack.Screen name = "Navi" component = {HomeStack} options = {{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 