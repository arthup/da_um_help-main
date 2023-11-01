import React, { useState, useRef } from 'react';
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Modal, SafeAreaView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { doc, deleteDoc } from "firebase/firestore";


export const MenuPopUp = ({handleClose, handleOpen}) => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [visible, setVisible]=useState(false);
  const [userImg, setUserImg]=useState('');
  const [name, setName]=useState('');
  const [posts, setPosts]=useState('');
  const listUserInfo = [];
  const list = [];

console.log(handleOpen)
  const deletPost = async () =>{
    await deleteDoc(doc(db, "posts", handleOpen.id));
  }

  const LogOut = () => {
    signOut(auth).then(() => {
      console.log('deslogado')
      navigation.navigate('Welcome')
    }).catch((error) => {
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}> 
        <View style={styles.containerTxt}>
          <Text style={styles.txt}>Você deseja excluir sua publicação?</Text>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.btnConfirm} onPress={handleClose} onPressIn={deletPost}> 
            <Text style={styles.txtBtnConfirm}>Excluir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCancel} onPress={handleClose}> 
            <Text style={styles.txtBtnCancel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MenuPopUp;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 500,
  },

  content:{
    zIndex: 99,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 8,
    padding: 8,
    borderWidth: 0.5,
    justifyContent: 'center',
    height: '100%'
  },
  containerTxt:{
    alignItems:'center',
    justifyContent:'center',
    padding: 20
  },

  txt:{
    fontSize:18,
    fontWeight:'bold'
  },

  containerButton:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center'
  },

  txtBtnConfirm:{
    color: 'white',
    fontSize: 15,
    fontWeight:'bold'

  },
  btnConfirm:{
    backgroundColor:'red',
    width: '30%',
    height: '60%',
    padding: 8,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'
  },

  btnCancel:{
    padding: 8,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    
  },

  txtBtnCancel:{
    color:'#A2ACC3',
    fontSize: 15,
    fontWeight:'bold'
  }

 
});