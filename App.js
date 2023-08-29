import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import Map from "./src/screens/Map.js";
import LoginPage from './src/screens/LoginPage.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from './src/screens/RegisterPage.js';
import {Amplify, Auth} from 'aws-amplify'; 
import awsExports from './src/aws-exports.js'; 
import {withAuthenticator} from 'aws-amplify-react-native'; 
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen.js';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen.js';
import NewPasswordScreen from './src/screens/NewPasswordScreen.js';
import NewGameScreen from './src/screens/NewGame.js';
import ProfileSetupScreen from './src/screens/UserProfile.js';


Amplify.configure(awsExports); 
const Stack = createNativeStackNavigator();

const App = () => {
  

  const [user, setUser] = useState(null);
  const [profileSetup, setProfileSetup] = useState(false);


  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);

      console.log('User is signed in:', user);
    } catch (error) {
      console.log('User is not signed in:', error);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserProfile">
        <Stack.Screen name = "MapView" component={Map} options={{title:"MapView", headerLeft: () => null}}/>
        <Stack.Screen name = "Login" component={LoginPage} options={{title:"Login"}}/>
        <Stack.Screen name = "RegisterPage" component={RegisterPage} options={{title:"Register"}} />
        <Stack.Screen name = "EmailVerification" component={ConfirmEmailScreen} options = {{title:"Verify Email"}} />
        <Stack.Screen name = "ForgotPasswordScreen" component={ForgotPasswordScreen} options={{title:"Send Reset Code"}}/>
        <Stack.Screen name = "NewPassword" component={NewPasswordScreen} options = {{title:"Verify and Change Password"}}/>
        <Stack.Screen name = "NewGame" component = {NewGameScreen} options = {{title:"Create Game"}}/>
        <Stack.Screen name = "UserProfile" component = {ProfileSetupScreen} options = {{title:"Profile"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 