import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { storage, auth, db } from '../../Services/firebaseConfig';
import {  updateDoc, doc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { updateProfile } from "firebase/auth";
import { CheckBoxBase } from '@react-native-community/checkbox'; 

const UserWorkSelection = () => {
  const navigation = useNavigation('');
  const [value, setValue] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const user = auth.currentUser;
  const userUpdate = doc(db, "users", user.uid);
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <SafeAreaView style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Foto de Perfil</Text> 
          </View>

          <View style={styles.containerForm}>    
            
          </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

export default UserWorkSelection;
 
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#2C8AD8",
  },

  containerForm:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: "#d6e9ff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  containerImg:{
    marginTop: '10%',
    width: '90%',
    height: '30%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  buttonImgProfile:{
    borderRadius: 100,
    width: '45%',
    height: '70%',
    position: 'absolute',
    bottom: -70,
    borderWidth: 0.5,
  },

  profileImg:{
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: "#ABD3F6",
  },

  buttonBackgroundImg:{
    marginTop: '10%',
    width:'100%',
    height:'100%',
    borderWidth:1,
    borderRadius:25,
    position:'relative',
  },
    
  backgroundImg:{
    alignSelf:'center',
    width:'100%',
    height:'100%',
    borderRadius: 25,
  },

  containerHeader:{
    marginTop: '9%',
    marginBottom: '8%',
    paddingStart: '5%',
    width: '100%',
  },

  textHeader:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d6e9ff',
  },

  containerTextArea:{
    marginTop: '30%',
    width: "90%"
  },

  textArea:{
    padding: 5,
    textAlign: 'justify',
    fontSize: 18,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    height: 40,
    bottom: 30,
    borderRadius: 10,
    borderWidth: 0.5
  },

  button:{
    backgroundColor: "#2C8AD8",
    width: '80%',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70%'
  },

  buttonText:{
    color: "#d6e9ff",
    fontSize: 15,
    fontWeight: 'bold', 
  },
});