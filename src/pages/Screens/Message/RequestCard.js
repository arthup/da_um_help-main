import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { Card, UserInfo, UserImg, UserInfoText, UserName, PostText } from './RequestStyle';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { doc, deleteDoc, where, getDocs, collection, query, orderBy, updateDoc } from "firebase/firestore";
import { auth, db } from '../../../Services/firebaseConfig';

export const RequestCard = ({item}) => {
  const navigation = useNavigation();
  const [accept, setAccept]=useState(false);
  const [requests, setRequests]=useState("");
  const [name, setName]=useState("");
  const [userImg, setUserImg]=useState("");
  const [userId, setUserId]=useState("");
  const user = auth.currentUser;
  const list = [];
  const listRequest = [];
  const [requestId, setRequestId]=useState("");
  const [requestUserId, setUserRequestId]=useState("");
  const [requestAcceptId, setRequestAcceptId]=useState("");
  const [telefone, setTelefone]=useState("");
 
  const getRequests = async () => {
    try{
      const q = query(collection(db, "request"), where("requestUserId", '==', user.uid), orderBy('requestTime', 'desc'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const { requestId, userId, requestUserId, telefoneContato, requestAccepted, name } = doc.data();
        list.push({ 
          requestUserId,
          requestId, 
          userId,
          telefoneContato,
          requestAccepted,
          id: doc.id,
        });
        listRequest.push({
          requestUserId,
          requestId,
          id: doc.id,
        });
        setTelefone(telefoneContato);
        setRequests(list);
        setRequestId(requestId);
        setUserId(userId);
        setRequestAcceptId(listRequest)
        setUserRequestId(requestUserId);
      });
    } catch(e){
        console.log(e)
    }
  }

  const teste = async () =>{
    try{
      const q = query(collection(db, "users"), where("userId", '==', item.requestUserId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const { name, userImg } = doc.data();
        list.push({ 
          userImg,
          id: doc.id,
          name
        });
        setName(name);
        setUserImg(userImg);
      });
    } catch(e){
        console.log(e)
    }
  }

  useEffect(() => {
    getRequests()
    teste()
  }, []);

  const submitRequest = async () => {
    const userUpdate = doc(db, "request", requestId);
    updateDoc(userUpdate, {
      requestAccepted: true
  });
  setAccept(true)
  }
  
  const deleteRequest = async () =>{
    await deleteDoc(doc(db, "request", requestId));
  }

  const a1 = item.requestUserId;
  const a2 = item.requestId;

  if(item.requestAccepted === false && item.requestUserId === user.uid){
    return (
        <Card>
          <UserInfo>
            <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item))}>
              <UserImg source={{uri: item.userImg}}/>
            </TouchableOpacity>

            <UserInfoText >
            <View style={{alignItems:"center",alignContent:"center",width:"100%",flexDirection: "row", position:"relative"}}>

              <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item))}>
                <UserName>{item.name}</UserName>
              </TouchableOpacity>

              <TouchableOpacity onPress={submitRequest} style={{marginLeft:"70%",position:"absolute"}} disabled={accept === true ? true : false}>
                <AntDesign name='checksquare' size={40} color='green'/>
              </TouchableOpacity>

              <TouchableOpacity onPress={deleteRequest} disabled={accept === true ? true : false} style={{marginLeft:"85.5%",position:"absolute"}}  >
                <AntDesign name="closesquare" size={40} color="red" />
              </TouchableOpacity>
              </View>
            </UserInfoText>
          </UserInfo>
          <PostText style={{ fontWeight: "400", fontSize: 15}}>{item.name} gostaria de entrar em contato!</PostText>
          
          {accept === true ?
          <PostText style={{marginLeft: 4,marginBottom: 1, marginTop: 10, alignSelf: "center", marginTop: "10%", fontWeight: "500"}}>Telefone para contato: </PostText>
          :
          <PostText></PostText>}
          {accept === true ?
          <PostText style={{fontSize: 20, marginBottom: 20, marginTop: 10, fontWeight: "bold", alignSelf: 'center',}}>{telefone} </PostText>
          :
          <PostText></PostText>}
        </Card>
    );
    } else if(item.requestAccepted === true && item.userId === user.uid){
    
      return (
        <Card>
          <UserInfo>
            <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item))}>
              <UserImg source={{uri: userImg ? userImg : null}}/>
            </TouchableOpacity>

            <UserInfoText>
              <View style={{alignItems:"center",alignContent:"center",width:"100%",flexDirection: "row", position:"relative"}}>

                <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item))} >
                  <UserName>{name}</UserName>
                </TouchableOpacity>
              </View>
            </UserInfoText>
          </UserInfo>
          <PostText style={{ fontWeight: "500", fontSize: 15, marginBottom: 20, marginTop: 15}}>{name} aceitou sua solicitação e logo entrará em contato!</PostText>

          <PostText style={{ fontSize: 14, marginBottom: 10}}>Clique em avaliar quando o trabalho for finalizado.</PostText>

          <TouchableOpacity onPress={()=>(navigation.navigate('Avaliation', {a1, a2}))}>
            <View style={styles.confirmContact}>
              <Text style={styles.txtConfirmContact}>Avaliar</Text>
            </View>
          </TouchableOpacity>
        </Card>
    );
  } 
}

  const styles=StyleSheet.create({
    confirmContact:{
      backgroundColor:"#8BD7F3",
      marginTop: 15,
      margin:20,
      width:200,
      height:40,
      alignItems: "center",
      justifyContent:"center",
      borderRadius: 10,
      alignSelf: "center"
    },

    txtConfirmContact:{
      color:"white",
      fontSize: 15,
      marginLeft: 6,
      fontWeight: "bold"
    },
  });