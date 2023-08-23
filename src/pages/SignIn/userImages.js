import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { storage, auth, db } from '../../Services/firebaseConfig';
import {  updateDoc, doc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { updateProfile } from "firebase/auth"; 

const Imag = () => {
  const navigation = useNavigation('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const user = auth.currentUser;
  const userUpdate = doc(db, "users", user.uid);

  const pickProfileImg = async () => {
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
    
  const pickBackgroundImg = async () => {
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
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          try {
            updateProfile(auth.currentUser, {
              photoURL: downloadURL
            })
            updateDoc(userUpdate, {
              userImg: downloadURL
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }
    );

    uploadTask2.on( 'state_changed', (snapshot) => {
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
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
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
      }})
    });
  }
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <SafeAreaView style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Foto de Perfil</Text> 
          </View>

          <View style={styles.containerForm}>    
            <View style={styles.containerImg}>
              <TouchableOpacity onPress={pickBackgroundImg} style={styles.buttonBackgroundImg}>
                {image2===null ? <Image source={require('../../assets/perfilBack.jpg')} style={styles.backgroundImg}/> : <Image source={{uri:image2}} style={styles.backgroundImg}/> }
              </TouchableOpacity>

              <TouchableOpacity onPress={pickProfileImg} style={styles.buttonImgProfile}>
                {image===null ? <Image source={require('../../assets/perfilUser.jpg')} style={styles.profileImg}/> : <Image source={{uri:image}} style={styles.profileImg}/> }
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