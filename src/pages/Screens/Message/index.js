import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { FlatList, RefreshControl, View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Container } from './RequestStyle';
import { useBackHandler } from '@react-native-community/hooks';
import { RequestCard } from './RequestCard';
import { collection, getDocs, orderBy, where, query } from "firebase/firestore";
import { db, auth} from '../../../Services/firebaseConfig';

const Message = () =>{
  const [requests, setRequests]=useState('')
  const [users, setUsers]=useState('')
  const list = [];
  const user = auth.currentUser

  useBackHandler(() =>{
    if(1 == 1){
      return true
    }
  });
 
  const getRequests = async () => {
    try{
      const q = query(collection(db, "request"), where ("requestId", '==', user.uid));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { requestId, userId, name, userImg } = doc.data();
        list.push({ 
          name,
          requestId, 
          userId,
          userImg,
          id: doc.id
        });
        
        
        setRequests(list);
      });

    } catch(e){
        console.log(e)
    }
  }

  useEffect(() => {
    getRequests()
    console.log(requests)
  }, []);

  function renderItem({ item } ) {
    return <RequestCard item={item}/>
  }
  return(
  <SafeAreaView  style={styles.containerHead}>
  <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>
    <View>
        <Text style={styles.textHeader}>Notificações</Text>
    </View>


      <Container style={styles.container}>
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={item=> item.id}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          style={{width: "105%"}}
        />
      </Container>

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
backgroundColor: "#d0dde2",
width: '100%',
height: '100%',
borderTopLeftRadius: 20,
borderTopRightRadius: 20,
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