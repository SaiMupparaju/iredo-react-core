import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react'; 
import styles from '../Styles.js'
import CustomTextInput from '../components/CustomTextInput.js';
import {Auth} from 'aws-amplify'; 
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import { useNavigation } from '@react-navigation/native';



export default function RegisterPage() {

    const {control, handleSubmit, formState: {errors}, watch, trigger} = useForm({mode: 'onChange'}); 
    
    const pwd = watch('password'); 
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const navigation = useNavigation();

    const onRegisterPressed = async(data) => {
        const {username, password, email, name, family_name, birthdate} = data;
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    name,
                    family_name,
                    birthdate,
                    phone_number: "+15712532500"         
                }
            }); 
            navigation.navigate('EmailVerification', {username: email});
        } catch (e) {
            Alert.alert('Oops', e.message); 
        }
    }

    return(
        <FormProvider {...{control, handleSubmit, formState: {errors}, watch, trigger}}> 
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <CustomTextInput 
                    name="name" 
                    placeholder="First Name." 
                    control={control}
                    rules={{
                        required:"Name is Required"
                        }}
                    />
                </View> 
                <View style={styles.inputView}>
                    <CustomTextInput 
                    name="family_name" 
                    placeholder="Last Name." 
                    control={control} 
                    rules={{
                        required:"Last Name is Required"
                    }}
                    />
                </View> 
                <View style={styles.inputView}>
                    <CustomTextInput 
                    name="username"
                    placeholder="Username." 
                    control={control} 
                    rules={{
                        required:"This field is Required",
                        minLength: {value: 3, message: "Username must be at least 3 characters"},
                        maxLength: {value: 24, message: "Username can't be more than 24 characters"},
                    }}
                    />
                </View>
                <View style={styles.inputView}>
                    <CustomTextInput 
                    name="email"
                    placeholder="Email." 
                    control={control} 
                    rules={{
                        required:"This field is Required",
                        pattern: {value: EMAIL_REGEX, message: "Email is invalid!"}
                    }}
                />
                </View> 
                <View style={styles.inputView}>
                    <CustomTextInput 
                    name={"password"} 
                    placeholder="Password." 
                    control={control} 
                    secureTextEntry={true} 
                    rules={{
                        required:"This field is Required",
                        minLength: {
                            value: 8,
                            message: 'Password should be minimum 8 characters long',
                        },
                        }}
                    />
                </View>
                <View style={styles.inputView}>
                    <CustomTextInput 
                    name={"confirm_password"} 
                    placeholder="Confirm Password." 
                    control={control} 
                    secureTextEntry={true} 
                    rules={{
                        required:"This field is Required",
                        validate: (value) => value == pwd || 'Passwords do not match',
                    }}
                    />
                </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSubmit(onRegisterPressed)}>
                <Text style={styles.primaryBtnText}>REGISTER</Text> 
            </TouchableOpacity>
        </View>
      </FormProvider>
    );
}
