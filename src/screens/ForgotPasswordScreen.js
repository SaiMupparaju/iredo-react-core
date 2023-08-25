import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native';

import CustomTextInput from '../components/CustomTextInput';
import {useNavigation} from '@react-navigation/core';
import {FormProvider, useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import styles from '../Styles';

const ForgotPasswordScreen = () => {
  const {control, handleSubmit, trigger} = useForm({mode: 'onChange'});
  const navigation = useNavigation();

  const onSendPressed = async data => {
    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate('NewPassword');
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
                        name="username"
                        control={control}
                        placeholder="Username"
                        rules={{
                            required: 'Username is required',
                        }}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onSendPressed)}>
                        <Text style={styles.primaryBtnText}>Send</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tertiaryBtn} onPress={onSignInPress}>
                        <Text>Back to Sign In</Text> 
                    </TouchableOpacity>
                
            </View>
        </FormProvider>
  );
};


export default ForgotPasswordScreen;