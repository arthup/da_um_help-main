import React, { useState } from 'react';
import { signOut, updateProfile } from "firebase/auth";
import  { auth, storage } from '../../../Services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';

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
    <View style={styles.container}>

      <TouchableOpacity>
        <Image source={require("../../../assets/azul.jpg")} style={styles.imageBackground}></Image>
      </TouchableOpacity>

      <View style={styles.containerProfile}>
        <Image source={require("../../../assets/perfil.jpg")} style={styles.imageProfile}></Image>
      </View>

      
      <View style={styles.containerUserName}>
        <Text style={styles.userName}>Perfil Teste</Text>
        <TouchableOpacity onPress={()=>(navigation.navigate('EditProfile'))}>
          <FontAwesome5 name="edit" size={20} color="black" style={styles.icon}/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.perfil}>
        <Text style={styles.bio}>@perfil_teste</Text>
      </View>
      

      <View style={styles.profissao}>
        <Foundation name="paint-bucket" size={20} color="black"/>
        <Text style={styles.txtProfissao}>Pintor profissional</Text>
      </View>

      <View style={styles.informations}>
        <MaterialCommunityIcons name="account-search-outline" size={20} color="black"/>
        <Text style={styles.txtProfissao}>Mais Informações</Text>
      </View>

      <Button onPress={LogOut} title='enviar'></Button>

    </View>


  );
}

export default Profile;

const styles=StyleSheet.create({

  container:{
    flex: 1,
  },

  imageBackground: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },

  containerProfile: {
    alignItems: "center",
    marginTop: -65
  },

  imageProfile: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "gray",
  },

  containerUserName: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 40
  },

  userName: {
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 20
  },

  perfil:{
    alignItems: "center",
    marginTop: 15
  },

  bio:{
    color: "gray",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 15,
  },

  profissao: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingStart: "5%",
    backgroundColor: "#fff",
    width: "90%",
    height: 40,
    borderRadius: 10,
    shadowOpacity: 80, 
    elevation: 15,
    marginTop: 10,
    justifyContent: "center"
  },

  txtProfissao: {
    fontSize: 15,
    marginLeft: 12,
  },

  informations: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingStart: "5%",
    backgroundColor: "#fff",
    width: "90%",
    height: 40,
    borderRadius: 10,
    shadowOpacity: 80, 
    elevation: 15,
    marginTop: 10,
    justifyContent: "center",
    marginBottom: 10
  },
})