import React, { useState, useEffect } from 'react';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Close, Check, Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from './RequestStyle';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../Profile/userProfile';
import { doc, deleteDoc, where, getDocs, collection, query, orderBy } from "firebase/firestore";
import { auth, db } from '../../../Services/firebaseConfig';
import { View } from 'react-native-animatable';




export const RequestCard = ({item}) => {
  const navigation = useNavigation();
  const [accept, setAccept]=useState(false);
  const [requests, setRequests]=useState("")
  const user = auth.currentUser;
  const list = [];
  const [doubleID, setDoubleID]=useState("")
  const [telefone, setTelefone]=useState("")
  
  const getRequests = async () => {
    try{
      const q = query(collection(db, "request"), where("requestId", '==', user.uid), orderBy(`requestTime`, `desc`));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { requestId, userId, ID, telefoneContato } = doc.data();
        list.push({ 
          ID,
          requestId, 
          userId,
          telefoneContato
        });
        setTelefone(telefoneContato)
        setRequests(list);
        setDoubleID(ID)
      });

    } catch(e){
        console.log(e)
    }
  }


  useEffect(() => {
    getRequests()  
    console.log(item.requestAccepted)
    console.log(item.telefoneContato)
    console.log(telefone)
  }, []);
 
  if (item.name ===''){
    undefined
  } else if(item.userId !== user.uid){
    
    return (
        <Card>
          <UserInfo>
            <UserImg source={{uri: item.userImg}}/>
            
            <UserInfoText >
            <View style={{alignItems:"center",alignContent:"center",width:"100%",flexDirection: "row", position:"relative"}}>

              <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item))} >
                <UserName>{item.name}</UserName>
              </TouchableOpacity>
            <TouchableOpacity onPress={() => (setAccept(true))} style={{marginLeft:"70%",position:"absolute"}} >
                <AntDesign name='checksquare' size={40} color='green'/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> (deleteDoc(doc(db, "request", doubleID)))}  style={{marginLeft:"85.5%",position:"absolute"}}  >
                <AntDesign name="closesquare" size={40} color="red" />
              </TouchableOpacity>
              </View>
            </UserInfoText>
           
          </UserInfo>
          <PostText style={{ fontWeight: "bold", fontSize: 15}}> {item.name} gostaria de entrar em contato!</PostText>

          
          {accept === true ?
          <PostText style={{marginLeft: 4,marginBottom: 1, marginTop: 10}}>Número de Telefone para entrar em contato: </PostText>
          :
          <PostText></PostText>}
          {accept === true ?
          <PostText style={{fontSize: 35, marginBottom: 20, marginTop: 10, fontWeight: "bold", alignSelf: 'center',}}>{item.telefoneContato} </PostText>
          :
          <PostText></PostText>}

        </Card>
    );
  }else if(item.requestAccepted === false){
    
      return (
        <Card>
          <UserInfo>
            <UserImg source={{uri: item.userImg}}/>
            
            <UserInfoText >
            <View style={{alignItems:"center",alignContent:"center",width:"100%",flexDirection: "row", position:"relative"}}>

              <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item))} >
                <UserName>{item.name}</UserName>
              </TouchableOpacity>
            <TouchableOpacity onPress={() => (setAccept(true))} style={{marginLeft:"70%",position:"absolute"}} >
                <AntDesign name='checksquare' size={40} color='green'/>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> (deleteDoc(doc(db, "request", doubleID)))}  style={{marginLeft:"85.5%",position:"absolute"}}  >
                <AntDesign name="closesquare" size={40} color="red" />
              </TouchableOpacity>
              </View>
            </UserInfoText>
           
          </UserInfo>
          <PostText style={{ fontWeight: "bold", fontSize: 15}}> TESTE TESTE TESTE 123456</PostText>


        </Card>
    );
    }

  }

  

  