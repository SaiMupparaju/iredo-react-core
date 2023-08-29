import { StatusBar } from 'expo-status-bar';
import React from 'react';
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


Amplify.configure(awsExports); 
const Stack = createNativeStackNavigator();

const App = ({signOut, user}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name = "MapView" component={Map} options={{title:"MapView"}}/>
        <Stack.Screen name = "Login" component={LoginPage} options={{title:"Login"}}/>
        <Stack.Screen name = "RegisterPage" component={RegisterPage} options={{title:"Register"}} />
        <Stack.Screen name = "EmailVerification" component={ConfirmEmailScreen} options = {{title:"Verify Email"}} />
        <Stack.Screen name = "ForgotPasswordScreen" component={ForgotPasswordScreen} options={{title:"Send Reset Code"}}/>
        <Stack.Screen name = "NewPassword" component={NewPasswordScreen} options = {{title:"Verify and Change Password"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const signUpConfig = {
  header: "Custom Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "First Name",
      key: "name",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Last Name",
      key: "family_name",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Username",
      key: "username",
      required: true,
      displayOrder: 4,
      type: "string",
    },
    {
      label: "Phone Number",
      key: "phone_number",
      required: true,
      displayOrder: 5,
      type: "string",
    },
    {
      label: "Birthday",
      key: "birthday",
      required: true,
      displayOrder: 6,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 7,
      type: "password",
    }
  ]
}

export default App; 