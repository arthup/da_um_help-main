import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, StatusBar, Button, Image, Alert  } from 'react-native';
//import Textarea from 'react-native-textarea';
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../../../Services/firebaseConfig';
import {ref, uploadBytes, uploadBytesResumable, getDownloadURL, } from 'firebase/storage';
import firebase from 'firebase/app';
import 'firebase/storage';

const NewPost = () => {

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false) 
  
  const submitData =() =>{

  // Create the file metadata
/** @type {any} */
  const metadata = {
    contentType: 'image/jpeg',
    includeBase64: true,
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'image/' + Date.now());
  const uploadTask = uploadBytesResumable(storageRef, image, metadata);
  

  // Listen for state changes, errors, and completion of the upload
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
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //   console.log('File available at', downloadURL);
      // });
      getDownloadURL(ref(storage, image))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = image;
    img.setAttribute('source', url);
  })
  .catch((error) => {
    // Handle any errors
  });
    }
  );
   }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1
    });
    const source = result.assets[0].uri
    console.log(source)
    setImage(source)
}; 


  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4FB9FF" barStyle="ligth-content"/>

      <View style={styles.header}>
          <Text style={styles.headerText}>Criar Publicação</Text>
      </View>

      <View style={styles.body}>
          {/* <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            placeholder={'O que você está precisando...'}
            placeholderTextColor={'#A2ACC3'}
  underlineColorAndroid={'transparent'}*/}
  <TouchableOpacity onPress={pickImage}>
    <Text style={styles.btnText}>Pick an Image</Text> 
  </TouchableOpacity>
  <View style={styles.imageContainer}>
   {image && <Image source={{uri:image.uri}} style={{width: 300, height: 300}}/>} 
  <TouchableOpacity onPress={submitData}>
      <Text style={styles.btnText}>Upload Image</Text> 
  </TouchableOpacity> 
  </View>
      </View>
      
   </SafeAreaView>
  );
}

export default NewPost;

const styles = StyleSheet.create({
  header:{
    backgroundColor:'#4FB9FF',
    width: '100%',
    height: '30%',
    alignItems:'center',
    flexDirection:'row',
    flex:0.5
  
  },
  
  headerText:{
    color:'#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: "5%"
  },

  container:{
    backgroundColor: '#f0f8ff',
    width: '100%',
    height: '100%',
  },

  body:{
    flex: 5
  },
  
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    width:'95%',
    alignSelf: 'center',
    marginTop: 9
  },

  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: 'black',
  },
  
  });