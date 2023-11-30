import React from 'react';
import { db } from '../../../Services/firebaseConfig';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { doc, deleteDoc } from "firebase/firestore";

export const MenuPopUp = ({handleClose, handleOpen}) => {

  const deletPost = async () =>{
    await deleteDoc(doc(db, "posts", handleOpen.id));
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
    // height: "100%",
    // flex: 1,
    // marginTop: 500,
    // backgroundColor: "#00000254"

    width: '100%',
    height: '100%',
    backgroundColor: "#000002A3"
  },

  content:{
    zIndex: 99,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: "145%",
    padding: 8,
    borderWidth: 0.5,

    height: '100%'
  },
  containerTxt:{
    alignItems:'center',
    justifyContent:'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  },

  txt:{
    fontSize:18,
    fontWeight:'bold'
  },

  containerButton:{
    flexDirection: 'row',
    justifyContent: "space-around",
    marginLeft: 50,
    marginRight: 50,
  },

  txtBtnConfirm:{
    color: 'white',
    fontSize: 15,
    fontWeight:'bold'

  },
  btnConfirm:{
    backgroundColor:'red',
    width: '40%',
    height: '30%',
    padding: 8,
    borderRadius: 50,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'
  },

  btnCancel:{
    padding: 8,
    borderRadius: 10,
    alignItems:'center',
    alignContent:'center',
  },

  txtBtnCancel:{
    color:'#A2ACC3',
    fontSize: 15,
    fontWeight:'bold'
  }
});