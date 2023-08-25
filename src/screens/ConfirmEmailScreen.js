import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react'; 
import styles from '../Styles.js'
import CustomTextInput from '../components/CustomTextInput.js';
import Amplify from 'aws-amplify'; 
import {Auth} from 'aws-amplify'; 
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmEmailScreen() {
    const route = useRoute(); 
    const {control, handleSubmit, watch} = useForm(
        { 
        defaultValues: {username: route?.params?.username}
    }); 
    const navigation = useNavigation();
    const methods = useForm(); 
    const code = watch('code');
    const username = watch('username');  
    

    const onSignInPressed = () => {
        navigation.navigate('RegisterPage'); 
    };

    const onResendPressed = async() => {
        try {
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'Code was sent to your email')
        } catch (e) {
            Alert.alert('Oops', e.message); 
        }   };

    const onVerifyPressed = async(data) => {
        const {username, code} = data;
        try {
            const response = await Auth.confirmSignUp(username, code);
            console.log(response); 
            navigation.navigate('Login');
        } catch (e) {
            Alert.alert('Oops', e.message); 
        }
    }

    return(
        <FormProvider {...methods}> 
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <CustomTextInput 
                    name="code" 
                    placeholder="Enter Verification Code." 
                    control={control}
                    />
                </View> 

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSubmit(onVerifyPressed)}>
                <Text style={styles.regstrText}>Verify</Text> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} onPress={handleSubmit(onResendPressed)}>
                <Text style={styles.regstrText}>Resend Code</Text> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} onPress={handleSubmit(onSignInPressed)}>
                <Text style={styles.regstrText}>Back to Sign In</Text> 
            </TouchableOpacity>
            
        </View>
      </FormProvider>
    );
}