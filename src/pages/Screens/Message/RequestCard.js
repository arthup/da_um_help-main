import React, { useState, useEffect } from 'react';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Close, Check, Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from './RequestStyle';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../Profile/userProfile';
import { setDoc, doc, deleteDoc, where, getDocs, collection, query, orderBy, updateDoc } from "firebase/firestore";
import { auth, db } from '../../../Services/firebaseConfig';

export const RequestCard = ({item}) => {
  const navigation = useNavigation();
  const [accept, setAccept]=useState(false);
  const [requests, setRequests]=useState("");
  const user = auth.currentUser;
  const list = [];
  const [doubleID, setDoubleID]=useState("");
  const [requestAcceptId, setRequestAcceptId]=useState("");
  const [telefone, setTelefone]=useState("");
  const [requestAccepted, setRequestAccepted]=useState(true);
  const [ID, setID]=useState(doubleID + user.uid);
  
  
 
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
        setRequestAcceptId(userId)
      });

    } catch(e){
        console.log(e)
    }
    
  }
  
  useEffect(() => {
    getRequests()  
  }, []);

  const submitRequest = async () => {

    try{  
      const docRef = (collection(db, "request"), {
        userId:user.uid,
        name: user.displayName,
        userImg: user.photoURL,
        requestId: requestAcceptId,
        ID: doubleID,
        requestTime: Date.now(),
        requestAccepted: requestAccepted
    });
    setDoc(doc(db, "request", ID), docRef);
    console.log("Document written with ID: ", docRef);
    
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setAccept(true)
  }
  
  const deleteRequest = async () =>{
    await deleteDoc(doc(db, "request", doubleID));
    await deleteDoc(doc(db, "request", item.requestId));
  }

 console.log(requests)
  if (item.name ===''){
    undefined
  } else if (item.requestAccepted === false) {
    
    return (
        <Card>
          <UserInfo>
            <UserImg source={{uri: item.userImg}}/>
            
            <UserInfoText >
            <View style={{alignItems:"center",alignContent:"center",width:"100%",flexDirection: "row", position:"relative"}}>

              <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item))}>
                <UserName>{item.name}</UserName>
              </TouchableOpacity>

              <TouchableOpacity onPress={submitRequest} style={{marginLeft:"70%",position:"absolute"}}>
                <AntDesign name='checksquare' size={40} color='green'/>
              </TouchableOpacity>

              <TouchableOpacity onPress={deleteRequest}  style={{marginLeft:"85.5%",position:"absolute"}}  >
                <AntDesign name="closesquare" size={40} color="red" />
              </TouchableOpacity>
              </View>
            </UserInfoText>
          </UserInfo>
          <PostText style={{ fontWeight: "bold", fontSize: 15}}>{item.name} gostaria de entrar em contato!</PostText>
          
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
    } else{
    
      return (
        <Card>
          <UserInfo>
            <UserImg source={{uri: item.userImg}}/>
            
            <UserInfoText>
              <View style={{alignItems:"center",alignContent:"center",width:"100%",flexDirection: "row", position:"relative"}}>

                <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item))} >
                  <UserName>{item.name}</UserName>
                </TouchableOpacity>
              </View>
            </UserInfoText>
          </UserInfo>
          <PostText style={{ fontWeight: "bold", fontSize: 15, marginBottom: 10}}>{item.name} Aceitou sua solicitação, logo entrará em contato para resolverem o trabalho!</PostText>

          <PostText style={{ fontSize: 14}}>Quando finalizado clique em avaliar para finalizar e avaliar o trabalho.</PostText>

          <TouchableOpacity onPress={()=>(  navigation.navigate('Avaliation', ID))}>
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
      backgroundColor:"#242E4E",
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
  