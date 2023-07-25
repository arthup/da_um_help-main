import { collection, addDoc, updateDoc, doc, docRef, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'; 
import React, { useState } from 'react';

export const [image, setImage] = useState(null);

export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64:true,
      aspect: [4,3],
      quality: 1
  });
const source = result.assets[0].uri;
setImage(source);
}; 

export const submitData = async () =>{
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
}