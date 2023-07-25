import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, StatusBar, TouchableWithoutFeedback, Image, Keyboard, Alert  } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { storage, auth, db } from '../../../Services/firebaseConfig';
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc } from "firebase/firestore"; 
import moment from 'moment';

const NewPost = () => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [value, setValue] = useState('');
  const user = auth.currentUser;
  const date = moment().utcOffset('-03:00').format('DD/MM/YYYY HH:mm:ss');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        base64:true,
        aspect: [4,3],
        quality: 1,
        allowsMultipleSelection: true,
    });
    const source = result.assets[0].uri
    setImage(source)
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

  const imageBlob = await getBlobFroUri(image);
  const storageRef = ref(storage, 'image/' + Date.now());
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
          if (progress===100){
            Alert.alert('concluido');
          }
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
          const docRef = addDoc(collection(db, "posts"), {
            userId:user.uid,
            post: value,
            postImage: downloadURL,
            postTime: date,
            likes: null,
            comments: null
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      });
    }
  );
}



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <StatusBar backgroundColor="#4FB9FF" barStyle="ligth-content"/>
    
        <View style={styles.container}>

          <View style={styles.body}>

            <View style={styles.buttonPick}>
              <TouchableOpacity onPress={pickImage}>
                  <Ionicons name="md-images-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.textAreaContainer}>
              <TextInput   
                multiline
                numberOfLines= {20}
                maxLength={280}
                onChangeText={text => setValue(text)}
                value={value}
                style={styles.textArea}
                placeholder='Do que você está precisando?'
              />
            </View>

            <View style={styles.image}>
              {image && <Image source={{uri:image}} style={{width: '100%', height: '100%', borderRadius: 20}}/>} 
            </View>        
              
            <TouchableOpacity onPress={submitData}  style={styles.btnUpload}>
              <Text style={styles.btnText}>Upload Image</Text> 
            </TouchableOpacity>

  
          </View>
        </View>
    
    </SafeAreaView>
   </TouchableWithoutFeedback>
  );
}

export default NewPost;

const styles = StyleSheet.create({


  container:{
    backgroundColor: '#f0f8ff',
    width: '100%',
    height: '100%',
  },

  body:{
    alignItems: 'center',
  },
  
  textAreaContainer: {
    height: 200,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    width:'100%',
    margin: 9,

  },

  textArea:{
    padding: 5,
    textAlign:'justify',
    fontSize: 18,
    textAlignVertical:'top'
  },

  border: {
    alignItems: 'rigth',
    height: 60,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    width:'95%',
    alignSelf: 'center',
    marginTop: 9,
  },

  image:{
    width:200,
    height:200,
  },

  btnUpload:{
    backgroundColor: '#4FB9FF',
    margin: 2,
    alignItems: 'center',
    height: 20,
    width: 90,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
  
  },

  buttonPick: {
    alignItems: 'flex-end',
    justifyContent:'center',
    height: '15%',
    width: '95%',
  
  },

  btnText:{
    color:'#ffffff',
    fontSize: 12,
  },
  
  });