import React, { useState } from 'react';
import { signOut, updateProfile } from "firebase/auth";
import  { auth, storage } from '../../../Services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>

        <TouchableOpacity style={styles.containerImageBackground}>
          <Image source={require("../../../assets/azul.jpg")} style={styles.imageBackground}></Image>
        </TouchableOpacity>

      <View style={styles.containerProfile}>
        <Image source={require("../../../assets/perfil.jpg")} style={styles.imageProfile}></Image>
      </View>

      <View style={styles.containerUserName}>
        <Text style={styles.userName}>Perfil Teste</Text>
        <TouchableOpacity onPress={()=>(navigation.navigate('EditProfile'))}>
          <Image source={require("../../../assets/edita.png")} style={styles.icon}></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.perfil}>
        <Text style={styles.bio}>@perfil_teste</Text>
      </View>

      <View style={styles.profissao}>
        <Image source={require("../../../assets/pincel.png")} style={styles.iconProfissao}></Image>
        <Text style={styles.txtProfissao}>Pintor profissional</Text>
      </View>

      <View style={styles.profissao}>
        <Image source={require("../../../assets/localizacao.png")} style={styles.iconProfissao}></Image>
        <Text style={styles.txtProfissao}>Localizacao</Text>
      </View>

      <View style={styles.espacinho}/>

      <Button onPress={LogOut} title='enviar'></Button>

    </View>


  );
}

export default Profile;

const styles=StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },

  containerImageBackground:{
    alignItems: 'center',
    width: "100%",
    height: 200,
    flex: 1,
    borderRadius: 20,
  },

  imageBackground:{
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginTop: -12,
    alignSelf: 'center',
  },

  containerProfile:{
    alignItems: "center",
  },

  containerUserName:{
    alignSelf: "center", 
    alignItems: "center",
    flexDirection: "row", 
    justifyContent: "center",
    marginTop: 80,
    alignSelf: 'center',
  },

  icon:{
    width: 20,
    height: 20,
    marginTop: 10,
    marginLeft: 5,
  },

  imageProfile:{
    width: 130, 
    height: 130, 
    borderRadius: 100, 
    borderWidth: 4,
    borderColor: 'blue',
    marginTop: -80,
    alignSelf: 'center',
  },

  userName:{
    fontSize: 20, 
    fontWeight: "bold", 
    padding: 10,
    alignSelf: 'center',
    marginTop: -110,
  },

  bio:{
    fontSize: 15, 
    fontWeight: "bold", 
    color: "gray",
    alignSelf: 'center',
  },

  estilizaFollow:{
    marginTop: 15,
    paddingVertical: 8,
    flexDirection: "row",
    alignSelf: 'center',
  },

  follow:{
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 22,
  },

  seguindo:{
    fontSize: 15,
    fontWeight: 'bold',
  },

  seguindoDois:{
    fontSize: 15,
  },

  profissao:{
    alignSelf: "center", 
    alignItems: "center",
    flexDirection: "row", 
    justifyContent: "center", 
    backgroundColor: "#fff", 
    width: "90%", 
    paddingBottom: 12, 
    paddingTop: 12,
    borderRadius: 10, 
    shadowOpacity: 80, 
    elevation: 15, 
    marginTop: 20,
    alignSelf: 'center',
  },

  txtProfissao:{
    alignSelf: 'center',
  },

  iconProfissao:{
    width: 20,
    height: 20,
    marginRight: 10,
  },

  espacinho:{
    padding: 40,
  }
})