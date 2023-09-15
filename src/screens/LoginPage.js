import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, useWindowDimensions, Alert, Button } from 'react-native';
import {useState} from 'react'; 
import styles from '../Styles'; 
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {createUserInfo} from '../graphql/mutations';  // Adjust the import to your folder structure
import { listUserInfos } from '../graphql/queries';



export default function LoginPage() {
    const {height} = useWindowDimensions(); 
    const navigation = useNavigation(); 
    const {control, handleSubmit, formState: {errors}, watch, trigger} = useForm({mode: 'onChange'}); 

    const [loading, setLoading] = useState(false); 
    const [buttonText, setButtonText] = useState("LOGIN"); 

    const onSignInPressed = async(data) => {
        const { username, password } = data;
        if (loading) {
          return;
        }
        setLoading(true);
        setButtonText("Loading...");
        try {
          const authResponse = await Auth.signIn(username, password);
          const userInfo = await Auth.currentAuthenticatedUser();
          const userSub = userInfo['attributes']['sub'];

      
          // Query the database to see if userInfo already exists
          const existingUser = await API.graphql(
            graphqlOperation(listUserInfos, {
              filter: {
                user_sub: {
                  eq: userSub,
                },
              },
            })
          );
          console.log("existing", existingUser);
          if (existingUser.data.listUserInfos.items.length === 0) {
            // If user info doesn't exist in the database, create a new user info record
            const newUserData = {
              user_sub: userSub,
              first_name: userInfo['attributes']['name'],
              family_name: userInfo['attributes']['family_name'],
              email: userInfo['attributes']['email'],
              birthdate: "2004/02/06"
            };
            await API.graphql(graphqlOperation(createUserInfo, { input: newUserData }));
          }
          
          navigation.navigate("MapView");
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
        setButtonText("LOGIN"); 
    }

    return(
        <FormProvider {...{control, handleSubmit, formState: {errors}, watch, trigger}}>
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <CustomTextInput 
                    name = {"username"}
                    placeholder="Email." 
                    control={control}
                    keyboardType='email-address'/>
                </View> 
                <View style={styles.inputView}>
                    <CustomTextInput 
                    name = {"password"}
                    placeholder="Password." 
                    control={control}
                    secureTextEntry={true}/>
                </View>

                <TouchableOpacity onPress={() => {navigation.navigate("ForgotPasswordScreen")}}>
                    <Text style={styles.tertiaryBtn}>Forgot Password?</Text> 
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onSignInPressed)}>
                    <Text style={styles.primaryBtnText}>{buttonText}</Text> 
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryBtn} onPress={() => {navigation.navigate("RegisterPage")}}>
                    <Text style={styles.secondaryBtnText}>Or Sign Up</Text> 
                </TouchableOpacity>
            </View>
      </FormProvider>
    );
}

