import React from 'react' 
import {View, Text, TextInput, StyleSheet} from 'react-native'
import styles from "../Styles.js";
import { Controller, useFormContext } from 'react-hook-form';


export default function LargeCustomTextInput({control, name, rules = {},  placeholder, secureTextEntry, ...props}) {
    const {trigger} = useFormContext(); 
    return (
        <Controller
        control = {control}
        name = {name}
        rules = {rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                 <>
                 <View>
                    <TextInput 
                    value={value}
                    onChangeText={(text) => {
                        onChange(text);
                        trigger(name); 
                    }}
                    onEndEditing={onBlur}
                    placeholder={placeholder}
                    placeholderTextColor="#003f5c"
                    style = {[styles.TextInput, {borderColor: error ? 'red' : 'transparent', height:100}]} 
                    secureTextEntry = {secureTextEntry}
                    multiline = {true}
                    numberOfLines={5}
                    {...props}
                    />
                 </View>
                 {error && (
                    <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                 )}
                </>
             )}
            />
    )
}