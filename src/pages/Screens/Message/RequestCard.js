import React, { useState, useEffect } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from '../Home/FeedStyle';
import { TouchableOpacity, Text } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../Profile/userProfile';
import { doc, deleteDoc, where, getDocs, collection, query } from "firebase/firestore";
import { auth, db } from '../../../Services/firebaseConfig';




export const RequestCard = ({item}) => {
  const navigation = useNavigation();
  const [accept, setAccept]=useState(false);
  const [requests, setRequests]=useState("")
  const user = auth.currentUser;
  const list = [];
  const [doubleID, setDoubleID]=useState("")
  
  const getRequests = async () => {
    try{
      const q = query(collection(db, "request"), where("requestId", '==', user.uid));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { requestId, userId, ID } = doc.data();
        list.push({ 
          ID,
          requestId, 
          userId,
        });
        
        setRequests(list);
        setDoubleID(ID)
      });

    } catch(e){
        console.log(e)
    }
  }


  useEffect(() => {
    getRequests()  
    console.log(doubleID) 
  }, []);

  if (item.name ===''){
    undefined
  } else {
    return (
        <Card>
          <UserInfo>
            <UserImg source={{uri: item.userImg}}/>
            <UserInfoText>
              <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item) )}><UserName>{item.name}</UserName></TouchableOpacity>
            </UserInfoText>
          </UserInfo>
          <PostText>{item.name} gostaria de entrar em contato!</PostText>
          <TouchableOpacity onPress={() => (setAccept(true))}>
            <Text>
              SIM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> (deleteDoc(doc(db, "request", doubleID)))
}>
            <Text>
              NAO
            </Text>
          </TouchableOpacity>
          {accept === true ? <PostText>numero de telefone</PostText>:
          <PostText></PostText>}

          

        </Card>
    );
  }}
  

  

