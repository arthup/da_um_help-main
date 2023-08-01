import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import { storage, auth, db } from '../../../Services/firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, addDoc, updateDoc, doc, docRef, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'; 

const Imag = () => {
    const navigation = useNavigation('');
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const user = auth.currentUser;
    const userUpdate = doc(db, "users", user.uid);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          base64:true,
          aspect: [4,3],
          quality: 1
      });
    const source = result.assets[0].uri;
    setImage(source);
    };
    
    const pickImage2 = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64:true,
        aspect: [4,3],
        quality: 1
    });
  const source = result.assets[0].uri;
  setImage2(source);
  }; 
    
    const submitData = async () =>{
    const metadata = {
      contentType: 'image/jpeg',
    };
  
    const getBlobFroUri = async (uri) => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      return blob;
    };

    const getBlobFroUri2 = async (uri) => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image2, true);
        xhr.send(null);
      });
      return blob;
    };

    const storageRef = ref(storage, 'image/' + Date.now());
    const storageRef2 = ref(storage, 'imageBack/' + Date.now());
    const imageBlob = await getBlobFroUri(image);
    const imageBlob2 = await getBlobFroUri2(image2);
    const uploadTask2 = uploadBytesResumable(storageRef2, imageBlob2, metadata);
    const uploadTask = uploadBytesResumable(storageRef, imageBlob, metadata);
  
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break; 
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          try {
            updateDoc(userUpdate, {
                userImg: downloadURL
              });
              // navigation.navigate('Screens')
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }
    );

    uploadTask2.on( 'state_changed', (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running2');
          break; 
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    
    () => { 
      getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      try {
        updateDoc(userUpdate, {
            userBackgroundImg: downloadURL
          });
          console.log('funfou')
          navigation.navigate('Screens')
      } catch (e) {
        console.error("Error adding document: ", e);
      }})});
  }
  


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.container}>

            <View style={styles.containerHeader}>
              <Text style={styles.textHeader}>Foto de Perfil</Text> 
            </View>
            
            <View style={styles.containercerto}>
              <View style={styles.containerImg}>
                <TouchableOpacity onPress={pickImage2} style={styles.buttonBackgroundImg}>
                  {image2===null ? <Image source={require('../../../assets/maizao.png')} style={styles.backgroundImg}/> : <Image source={{uri:image2}} style={styles.backgroundImg}/> }
                </TouchableOpacity>

                <TouchableOpacity onPress={pickImage} style={styles.buttonImgProfile}>
                  {image===null ? <Image source={require('../../../assets/perfilcerto.png')} style={styles.profileImg}/> : <Image source={{uri:image}} style={styles.profileImg}/> }
                </TouchableOpacity>           
              </View>

              <TouchableOpacity style={styles.button} onPress={submitData}>
                <Text style={styles.buttonText}>Concluir</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </TouchableWithoutFeedback>
    )
};

export default Imag;
 
const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems: "center",
      backgroundColor: "#619dfd",
    },

    containercerto:{
      width: "100%",
      height: "100%",
      alignItems: "center",
      backgroundColor: "#d6e9ff",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },

    containerImg:{
      marginTop: '10%',
      width:'90%',
      height:'30%',
      borderRadius:25,
      alignItems:'center',
      justifyContent:'flex-end',
    },

    buttonImgProfile:{
      borderRadius: 100,
      width: '45%',
      height: '70%',
      position:'absolute',
      bottom:-70,
      borderWidth: 0.5
    },

    profileImg:{
      alignSelf:'center',
      width:'100%',
      height:'100%',
      borderRadius: 100,
      backgroundColor: "#ABD3F6"
    },

    buttonBackgroundImg:{
      marginTop: '10%',
      width:'100%',
      height:'100%',
      borderWidth:1,
      borderRadius:25,
      position:'relative'
    },
    
    backgroundImg:{
      alignSelf:'center',
      width:'100%',
      height:'100%',
      borderRadius: 25

    },

    containerHeader:{
      marginTop: '14%',
      marginBottom: '8%',
      paddingStart: '5%',
      width: "100%"
    },

    textHeader:{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#d6e9ff',
    },

    button:{
      marginTop: '60%',
      backgroundColor:"#619dfd",
      width: '80%',
      alignSelf:'center',
      borderRadius: 50,
      paddingVertical: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonText:{
      color: "#d6e9ff",
      fontSize: 15,
      fontWeight: 'bold', 
    }
    
  }
);