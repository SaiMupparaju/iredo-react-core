import React from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import styles from '../Styles';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
    const buttonType = type.toLocaleLowerCase() + "Btn"; 
    const textType = buttonType + "Text"; 

    return (
    <TouchableOpacity style={styles[buttonType]} onPress={onPress}>
        <Text style={styles[textType]}>{text}</Text> 
    </TouchableOpacity>
    
    );
};


export default CustomButton;