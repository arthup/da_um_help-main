import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Container } from './RequestStyle';
import { useBackHandler } from '@react-native-community/hooks';
import { RequestCard } from './RequestCard';
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from '../../../Services/firebaseConfig';

const Message = () => {
  const [requests, setRequests]=useState('');
  const [corTxt, setCorTxt] = useState('Avaliação');
  const list = [];
  const user = auth.currentUser;

  const cor=StyleSheet.create({
    btnText:{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#8BD7F3',
    },

    btnText2:{
      fontSize: 18,
      fontWeight: 'bold',
      color:  "white",
    },
  });
  
  useBackHandler(() =>{
    if(1 == 1){
      return true
    }});

  const getRequests = async () =>{
    setRequests('')
    try{
      const q = query(collection(db, "request"), where('requestUserId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { requestId, userId, name, userImg, telefoneContato, requestAccepted, requestUserId } = doc.data();
        list.push({ 
          name,
          requestId, 
          userId,
          userImg,
          telefoneContato,
          requestAccepted,
          requestUserId,
          id: doc.id
        });
        setRequests(list);
      });

    } catch(e){
        console.log(e)
    }
    setCorTxt('')
  }
  
  const getRequestsAvaliation = async () =>{
    try{
      const q = query(collection(db, "request"), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { requestId, userId, name, userImg, telefoneContato, requestAccepted, requestUserId } = doc.data();
        list.push({ 
          name,
          requestId, 
          userId,
          userImg,
          telefoneContato,
          requestAccepted,
          requestUserId,
          id: doc.id
        });
        setRequests(list);
      });

    } catch(e){
        console.log(e)
    }
    setCorTxt('Avaliação')
  }

  useEffect(() => {
    getRequests()
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{
      getRequests(...requests)   
      }, 2000)
  setRefreshing(false);
  };
  
  function renderItem({ item }) { return <RequestCard item={item}/> }

  return(
  <SafeAreaView  style={styles.containerHead}>
    <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>
    <View>
        <Text style={styles.textHeader}>Notificações</Text>
    </View>

    <View style={{borderBottomColor: 'white', borderBottomWidth: 2, width: '80%', alignSelf: 'center', marginTop: 15 }}/>

    <View style={styles.containerButtons}>
      <TouchableOpacity onPress={getRequests} style={styles.btnContatacao}>
        <Text style={corTxt==='Avaliação' ? cor.btnText : cor.btnText2}>Contatação</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getRequestsAvaliation} style={styles.btnAvaliantion}>
        <Text style={corTxt==='' ? cor.btnText : cor.btnText2}>Avaliações</Text>
      </TouchableOpacity>
    </View>

    <Container style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item=> item.id}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        style={{width: "105%"}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        refreshing={refreshing} 
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

containerButtons:{
  height:'7%',
  width: '100%',
  backgroundColor: '#2C8AD8',
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10
},

textHeader:{  
  fontSize: 28,
  fontWeight: 'bold',
  color: 'white',
  marginLeft: 20,
  marginBottom: 15,
  marginTop: '14%',
},

container:{
  marginTop: '2%',
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

btnContatacao:{
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf:'center',
},

btnAvaliantion:{
  justifyContent: 'center',
  alignSelf:'center',
  alignItems: 'center',
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