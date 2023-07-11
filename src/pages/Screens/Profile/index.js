import React from 'react';
import { signOut } from "firebase/auth";
import  {auth} from '../../../Services/firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import { View, Text, StyleSheet, Button } from 'react-native';
// import { Container } from './styles';

const Profile = () => {
const user = auth.currentUser;

const navigation = useNavigation();
const displayName = user.displayName; 
console.log(displayName)
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

  return (
    
    <View style={{backgroundColor:'green'}}>
        <Text>TELA DE PERFIL</Text>
        <Text>{displayName}</Text>
        <Text>{email}</Text>
        <Button onPress={LogOut} title='enviar'></Button>
    </View>
    
  );
}

export default Profile;