import React, { useState, useEffect } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from '../Home/FeedStyle';
import { TouchableOpacity, Text, View } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../Profile/userProfile';
import { doc, deleteDoc, where, getDocs, collection, query, orderBy } from "firebase/firestore";
import { auth, db } from '../../../Services/firebaseConfig';





export const RequestCard = ({item}) => {
  const navigation = useNavigation();
  const [accept, setAccept]=useState(false);
  const [requests, setRequests]=useState("")
  const user = auth.currentUser;
  const list = [];
  const [doubleID, setDoubleID]=useState("")
  const [requestId, setRequestId]=useState("")
  const [name, setName]=useState("")
  const [ID, setID]=useState("")



  const getRequests = async () => {
    try{
      const q = query(collection(db, "request"), where("requestId", '==', user.uid), orderBy("orderTime", 'desc'));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { userId } = doc.data();
        list.push({ 
          ID,
          requestId, 
          userId,
        });
        
        setRequests(list);
        setDoubleID(ID)
        setRequestId(requestId)
      });

    } catch(e){
        console.log(e)
    }
  }

  const requestConfirmation = () => {
    try{
    const docRef = (collection(db, "request"), {
      userId: requestId,
      name: user.displayName,
      userImg: user.photoURL,
      requestId: user.uid ,
      ID: ID,
      requestTime: Date.now(),
      confirmId: name + ID
    });
    setName(name)
    const confirmId = name + ID
    setDoc(doc(db, "request", confirmId), docRef);
    console.log("Document written with ID: ", docRef);
      
  } catch (e) {
    console.error("Error adding document: ", e);
  }}
  const confirmId = name + ID
 

  useEffect(() => {
    getRequests()  
    console.log(doubleID) 
  }, []);
  

  if (item.name ===''){
    undefined
  } else {
    return (
        <View>
          {confirmId != null?
            <Card> 
          <UserInfo>
            <UserImg source={{uri: item.userImg}}/>
            <UserInfoText>
              <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item) )}><UserName>{item.name}</UserName></TouchableOpacity>
            </UserInfoText>
          </UserInfo>
          <PostText>{item.name} Aceitou sua solicitacao</PostText>
          <TouchableOpacity onPress={() => {requestConfirmation; setAccept(true)}}>
            <Text>
              Confirmar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> (deleteDoc(doc(db, "request", confirmId)))}>
            <Text>
              Deletar
            </Text>
          </TouchableOpacity>
          {accept === true ? <PostText>numero de telefone</PostText>:<PostText></PostText>}
          </Card>
           : 
           <Card> 
           <UserInfo>
          <UserImg source={{uri: item.userImg}}/>
          <UserInfoText>
            <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item) )}><UserName>{item.name}</UserName></TouchableOpacity>
          </UserInfoText>
        </UserInfo>
        <PostText>{item.name} gostaria de entrar em contato!</PostText>
        <TouchableOpacity onPress={() => {requestConfirmation; setAccept(true)}}>
          <Text>
            Aceitar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> (deleteDoc(doc(db, "request", doubleID)))
}>
          <Text>
            Recusar
          </Text>
        </TouchableOpacity>
        {accept === true ? <PostText>numero de telefone</PostText>:<PostText></PostText>}
        </Card>}
        </View>
    );
  }}
  

  

