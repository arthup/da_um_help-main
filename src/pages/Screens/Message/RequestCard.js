import React, { useState, useEffect } from 'react';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Close, Check, Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from '../Home/FeedStyle';
import { TouchableOpacity, Text } from 'react-native'; 
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
  const telefone = item.telefoneContato
  
  const getRequests = async () => {
    try{
      const q = query(collection(db, "request"), where("requestId", '==', user.uid), orderBy(`requestTime`, `desc`));
      
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
    console.log(item.telefoneContato) 
  }, []);

  if (item.name ===''){
    undefined
  } else {
    return (
        <Card>
          <UserInfo>
            <UserImg source={{uri: item.userImg}}/>
            <UserInfoText>
              <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item) )}>
                <UserName>{item.name}</UserName>
              </TouchableOpacity>
              
                
              
            </UserInfoText>
            <TouchableOpacity onPress={() => (setAccept(true))}>
                <AntDesign style={{bottom: -3, marginLeft:120}} name='checksquare' size={45} color='green'/>
                </TouchableOpacity>
              
              
                <TouchableOpacity onPress={()=> (deleteDoc(doc(db, "request", doubleID)))}>
                  <AntDesign style={{bottom: -3, marginLeft: 4}} name="closesquare" size={45} color="red" />
                </TouchableOpacity>
          </UserInfo>
          <PostText style={{ fontWeight: "bold", fontSize: 15}}> {item.name} gostaria de entrar em contato!</PostText>

          
          {accept === true ? <PostText style={{marginBottom: 20, marginTop: 10}}><Text>Número de Telefone para entrar em contato: {item.telefoneContato} </Text></PostText>:
          <PostText></PostText>}

          

        </Card>
    );
  }}
  

  