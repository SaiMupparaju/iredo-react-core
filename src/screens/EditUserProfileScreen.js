import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import {useState} from 'react'; 
import styles from '../Styles'; 
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import {Auth} from 'aws-amplify'; 
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import {
    UserProfileForm 
   } from './ui-components';


export default function EditProfileScreen() {
    return (
        <view>
            <UserProfileForm />
        </view>
    )
}