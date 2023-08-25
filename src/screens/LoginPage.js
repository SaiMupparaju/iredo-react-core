import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import {useState} from 'react'; 
import styles from '../Styles'; 
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import {Auth} from 'aws-amplify'; 
import {useForm, Controller, FormProvider} from 'react-hook-form'; 




export default function LoginPage() {

    const {height} = useWindowDimensions(); 
    const navigation = useNavigation(); 
    const {control, handleSubmit, formState: {errors}, watch, trigger} = useForm({mode: 'onChange'}); 

    const [loading, setLoading] = useState(false); 
    const [buttonText, setButtonText] = useState("LOGIN"); 

    const onSignInPressed = async(data) => {
        const {username, password} = data; 
        if(loading){
            return; 
        }
        setLoading(true);
        setButtonText("Loading...");
        try {
            const response = await Auth.signIn(username, password); 
            console.log("response");
            navigation.navigate("MapView");
            
        } catch(e) {
            Alert.alert('Oops', e.message); 
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

