import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    useWindowDimensions, 
    Alert, 
    SafeAreaView,
    Button,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/CustomTextInput';
import {useForm, Controller, FormProvider} from 'react-hook-form'; 
import styles from '../Styles';
import LargeCustomTextInput from '../components/LargeCustomTextInput';

export default function NewGameScreen() { 

    const {height} = useWindowDimensions(); 
    const navigation = useNavigation(); 
    const {control, handleSubmit, formState: {errors}, watch, trigger} = useForm({mode: 'onBlur'}); 

    const [loading, setLoading] = useState(false); 
    const [buttonText, setButtonText] = useState("CREATE"); 
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date(1598051730000))
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState(""); 

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    };
    const onCreatePressed = async(data) => {

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <FormProvider {...{control, handleSubmit, formState: {errors}, watch, trigger}}>
                <View style={styles.container}>
                    <View style={styles.inputView}>
                        <CustomTextInput 
                        name = {"gamename"}
                        placeholder="Game Name." 
                        control={control}
                        numberOfLines = {2}
                        />
                    </View> 

                    <View style={styles.mediumInputView}>
                        <GooglePlacesAutocomplete 
                        placeholder = "Enter game location."
                        fetchDetails = {true}
                        onPress={(data, details) => {
                            setLocation(details.formatted_address);
                        }}
                        query={{
                            key:"AIzaSyD01ixqJxISffMD2Se-_W38raDjtUmA6Lo",
                            language: 'en',
                        }}
                        styles={{
                            textInputContainer: styles.mediumInputView,
                            listView: { maxHeight: 150 }, // or whatever max height you want
                          }}
                        />
                    </View>

                    <View style={styles.largeInputView}>
                        <LargeCustomTextInput 
                        name = {"description"}
                        placeholder="Description. Buy-in, numplayers, etcs..." 
                        control={control}
                        numberOfLines = {5}
                        />
                    </View> 


                    <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onCreatePressed)}>
                        <Text style={styles.primaryBtnText}>{buttonText}</Text> 
                    </TouchableOpacity>
                </View>
        </FormProvider>
      </TouchableWithoutFeedback>
    )
}