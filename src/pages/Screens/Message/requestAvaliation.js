import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Container } from './RequestStyle';
import { useBackHandler } from '@react-native-community/hooks';
import { RequestCard } from './RequestCard';
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth} from '../../../Services/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const RequestAvaliation = () =>{
  const [requests, setRequests]=useState('');
  const list = [];
  const user = auth.currentUser;
  const navigation = useNavigation();
  
  useBackHandler(() =>{
    if(1 == 1){
      return true
    }});

  const getRequests = async () =>{
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
  }

  useEffect(() => {
    getRequests()
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () =>{
    setRefreshing(true);
    setTimeout(()=>{
      getRequests(...requests)   
      }, 2000)
  setRefreshing(false);
  };

  function renderItem({ item }) {
    return <RequestCard item={item}/>
  }

  return(
    <SafeAreaView  style={styles.containerHead}>
      <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>
      <View>
        <Text style={styles.textHeader}>Notificações</Text>
        <TouchableOpacity onPress={() => (navigation.navigate('Mensagem'))}>
          <Text>Voltar</Text>
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

export default RequestAvaliation;

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