import React, { useState } from 'react';
import { signOut, updateProfile } from "firebase/auth";
import  { auth, storage } from '../../../Services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';

const Profile = () => {
  const user = auth.currentUser;
  const [image, setImage] = useState(null);
  const foto = user.photoURL;  
  const navigation = useNavigation();
  const displayName = user.displayName;
  const email = user.email;

  const LogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('deslogado')
      navigation.navigate('Welcome')
    }).catch((error) => {
      // An error happened.
    })
  }

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
    updateProfile(auth.currentUser, {
      photoURL: image
  }).then(() => {
    // Profile updated!
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
  });
}

  return (
    <SafeAreaView>
      <View style={{backgroundColor:'green'}}>
          <Text>TELA DE PERFIL</Text>
          <Text>{displayName}</Text>
          <Text>{email}</Text>
          <Text>{user.photoURL}</Text>
          <Image source={{uri: foto}} style={{width: '10%', height: '10%', borderRadius: 20}}/>
          <Button onPress={LogOut} title='enviar'></Button>
      </View>

      <View>
        <Button onPress={pickImage} title='pegar'/>
        <Button onPress={submitData} title='salvar'/>
        <Image source={{uri:image}} style={{width: '100%', height: '100%', borderRadius: 20}}/>
      </View>

    </SafeAreaView>
  );
}

export default Profile;