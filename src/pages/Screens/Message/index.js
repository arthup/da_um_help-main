import React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native'

const Message = () =>{

  return(
  <SafeAreaView  style={styles.containerHead}>
  <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>
  <View>
      <Text style={styles.textHeader}>Mensagens</Text>
  </View>

  <View style={styles.container}>
    <TouchableOpacity style={styles.chat}>
      <Image source={require("../../../assets/azul.jpg")} style={styles.imageProfile}></Image>
      <View style={styles.containerText}>
        <Text style={styles.nameUser}>Nome do Usuario</Text>
        <Text style={styles.messages}>ultima mensagem enviada</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.chat}>
      <Image source={require("../../../assets/azul.jpg")} style={styles.imageProfile}></Image>
      <View style={styles.containerText}>
        <Text style={styles.nameUser}>Nome do Usuario</Text>
        <Text style={styles.messages}>ultima mensagem enviada</Text>
      </View>
    </TouchableOpacity>

  </View>
</SafeAreaView>
);
}

export default Message;

const styles = StyleSheet.create({
containerHead:{
backgroundColor: "#2C8AD8",
height: '100%',
},

textHeader:{  
fontSize: 28,
fontWeight: 'bold',
color: 'white',
marginTop: 12,
marginBottom: 0,
marginLeft: 20,
},

container:{
marginTop: 30,
backgroundColor: "#f8f8f8",
width: '100%',
height: '100%',
borderRadius: 20,
},

chat:{
marginTop: 20,
flexDirection: "row",
marginLeft: 15,
marginRight: 15,
paddingBottom: 10,
borderBottomWidth: 1,
borderColor: "#A2ACC3", 
},

imageProfile:{
width: 50,
height: 50,
backgroundColor: "black",
borderRadius: 100,
marginRight: 10,
},

containerText:{
marginTop: 3
},

nameUser:{
fontWeight: "bold",
fontSize: 16
},

messages:{
fontSize: 14,
color: "#A2ACC3"
}
});