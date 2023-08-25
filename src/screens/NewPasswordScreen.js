import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {FormProvider, useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import styles from '../Styles';

const NewPasswordScreen = () => {
  const {control, handleSubmit, trigger} = useForm({mode: 'onChange'});

  const navigation = useNavigation();

  const onSubmitPressed = async data => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <FormProvider {...{control, handleSubmit, trigger}}>
        <View style={styles.container}>
            
            <View style={styles.inputView}>
                <CustomTextInput
                placeholder="Username"
                name="username"
                control={control}
                rules={{required: 'Username is required'}}
                />
            </View>

            <View style={styles.inputView}>
                <CustomTextInput
                placeholder="Code"
                name="code"
                control={control}
                rules={{required: 'Code is required'}}
                />
            </View>

            <View style={styles.inputView}>
            <CustomTextInput
                placeholder="Enter your new password"
                name="password"
                control={control}
                secureTextEntry
                rules={{
                    required: 'Password is required',
                    minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters long',
                    },
                }}
                />
            </View>

            <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

            <CustomButton
            text="Back to Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
            />
        </View>
      </FormProvider>
  );
};

export default NewPasswordScreen; 