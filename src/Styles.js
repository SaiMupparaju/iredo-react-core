import React from 'react';
import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: "#FFC0CB"
    },
    tab: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
    forgot_button: {
        height: 30,
        marginBottom: 30,
      },
    loginBtn:
      {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#FF1493",
      },
    loginText:
      {
        color:'#444444'
      },
    regstrBtn:
      {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#FF1493",
      },
      primaryBtn:
      {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#FF1493",
      },
      primaryBtnText:
      {
        fontWeight: 'bold',
        color:'white'
      },
      secondaryBtn:
      {
        width:"80%",
        borderRadius:25,
        borderColor: "#FF1493",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"white",
        borderWidth:2,
      },
      secondaryBtnText:
      {
        fontWeight: 'bold',
        color:'#FF1493'
      },
      tertiaryBtn: {
        marginTop: 30,
        height: 30,
        marginBottom: 30,
      },  
      root: {
        alignItems: 'center',
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
      },
      text: {
        color: 'gray',
        marginVertical: 10,
      },
      link: {
        color: '#FDB075',
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      infoText: {
        fontSize: 16,
        marginVertical: 5,
      },
  });

  export default styles; 