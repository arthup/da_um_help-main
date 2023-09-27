import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, StatusBar, TouchableWithoutFeedback, Image, Keyboard, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { storage, auth, db } from '../../../Services/firebaseConfig';
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
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

    if (image !== null){
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
              const docRef = addDoc(collection(db, "posts"), {
                name: user.displayName,
                userId:user.uid,
                userImg: user.photoURL,
                post: value,
                postImage: downloadURL,
                postTime: date,
                likes: null,
                comments: null,
                orderTime: Date.now()
                // timeStamp: Timestamp()
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          });
        }
      ); 
    } else {
      try {
        const docRef = addDoc(collection(db, "posts"), {
          userId:user.uid,
          name: user.displayName,
          userImg: user.photoURL,
          post: value,
          postImage: null,
          postTime: date,
          likes: null,
          comments: null,
          orderTime: Date.now()
        });
        console.log("Document written with ID: ", docRef.id);
        console.log(image);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView  style={styles.backColor}>
        <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>

        <View>
          <Text style={styles.textHeader}>Crie sua Postagem</Text>
        </View>

        <View style={styles.container}>
      
          <View>
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

            <View style={styles.buttonPickImage}>
              <Text style={styles.textButtonImage}>Adicione uma imagem:</Text>
              <TouchableOpacity onPress={pickImage}>
                <Ionicons name="md-images-outline" size={24} color="#A2ACC3" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.containerImage}>
            {image && <Image source={{uri:image}} style={styles.imagePost}/>} 
          </View>     

          <View style={styles.containerButtonUpload}>
            <TouchableOpacity onPress={submitData}  style={styles.buttonUpload}>
              <Text style={styles.btnUploadText}>Postar</Text> 
            </TouchableOpacity>
          </View>
           
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default NewPost;

const styles = StyleSheet.create({
  backColor:{
    backgroundColor: "#2C8AD8",
    height: '100%',
  },

  container:{
    marginTop: 30,
    backgroundColor: "#f8f8f8",
    width: '100%',
    height: '100%',
    borderRadius: 20,
  }, 

  containerImage:{
    alignItems: 'center',
    width: '60%',
    height: '20%',
    alignSelf: 'center',
    marginTop: -48
  },

  imagePost:{
    width: '140%', 
    height: '140%', 
    borderRadius: 20
  },
  
  textAreaContainer:{
    marginTop: 40,
    height: 200,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
  },

  textArea:{
    padding: 5,
    textAlign: 'justify',
    fontSize: 18,
    textAlignVertical: 'top',
  },

  containerButtonUpload:{
    marginTop: '20%',
 
  },

  buttonUpload:{
    alignItems: 'center',
    height: "26%",
    backgroundColor: "#2C8AD8",
    width: '80%',
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'center',
  },

  textButtonImage:{
    color: '#A2ACC3',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    marginRight: '40%',
    paddingStart: '5%',
  },

  buttonPickImage:{
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '15%',
    width: '95%',
    flexDirection: 'row',
    marginBottom: 25,
  },

  btnUploadText:{
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 'bold',
  },    
  
  textHeader:{  
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 0,
    marginLeft: 20,
  },
});