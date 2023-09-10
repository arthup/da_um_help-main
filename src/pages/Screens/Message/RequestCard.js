import React, { useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from '../Home/FeedStyle';
import { TouchableOpacity, Text } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../Profile/userProfile';
import { doc, deleteDoc, where, getDocs, collection } from "firebase/firestore";
import { db } from '../../../Services/firebaseConfig';



export const RequestCard = ({item}) => {
  const navigation = useNavigation();
  const [accept, setAccept]=useState(false);


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
          <PostText>{item.name} 123123123gostaria de entrar em contato!</PostText>
          <TouchableOpacity onPress={() => (setAccept(true))}><Text>SIM</Text></TouchableOpacity><TouchableOpacity onPress={() => (deleteDoc(doc(db, "requests"), where()))}><Text>NAO</Text></TouchableOpacity>
          {accept === true ? <PostText>numero de telefone</PostText>:
          <PostText></PostText>}

          

        </Card>
    );
  }}
  

  

