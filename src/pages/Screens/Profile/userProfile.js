import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';
import { Feather, FontAwesome5, MaterialCommunityIcons, Foundation,MaterialIcons } from '@expo/vector-icons'; 
import { PostCard } from '../Home/PostCard.js';
import { Container2 } from '../Home/FeedStyle.js';
import { addDoc, setDoc, doc } from "firebase/firestore"; 



 export default function UserProfile(item){

  const navigation = useNavigation();
  const user = auth.currentUser;
  const [userBackgroundImg, setUserBackgroundImg]=useState('');
  const [userImg, setUserImg]=useState('');
  const [name, setName]=useState('');
  const [telefoneUser, setTelefoneUser]=useState('');
  const [posts, setPosts]=useState('');
  const listUserInfo = [];
  const list = [];
  const ID = user.uid + item.route.params.userId
  const [modalActive, setModalActive]=useState('')


  const submitRequest = async () => {
    try{
        const q = query(collection(db, "users"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
          const {telefone, id}  = doc.data();
          listUserInfo.push({ 
            telefone,
            id: doc.id,
          });
          setTelefoneUser(telefone);
          console.log(telefone)
    
        });   
    const docRef = (collection(db, "request"), {
      userId:user.uid,
      name: user.displayName,
      userImg: user.photoURL,
      requestId: item.route.params.userId,
      ID: ID,
      telefoneContato: telefoneUser,
      requestTime: Date.now()
    });
    setDoc(doc(db, "request", ID), docRef);
    console.log("Document written with ID: ", docRef);
      
  } catch (e) {
    console.error("Error adding document: ", e);
  }}
  const getUserInfo = async () => {
    
    try{
      const q = query(collection(db, "users"), where("userId", "==", item.route.params.userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {userBackgroundImg, userImg, name}  = doc.data();
        listUserInfo.push({ 
          userBackgroundImg,
          userImg,
          name,
          id: doc.id,
        });

        setUserBackgroundImg(userBackgroundImg);
        setUserImg(userImg);
        setName(name)
      });
    } catch(e){
      console.log(e)}
  }

  const getPosts = async () => {
    
    try{
      const q = query(collection(db, "posts"), where("userId", "==", item.route.params.userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {comments, likes, post, postImage, postTime, userId, name, userImg, id, telefone}  = doc.data();
        list.push({ 
          name,
          comments, 
          likes, 
          post, 
          postImage, 
          postTime, 
          userId,
          userImg,
          telefone,
          id: doc.id
        });
        setPosts(list);
      });
    } catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    getUserInfo()
    getPosts()
    
  }, []);


 const teste = () =>{ 
  return(
  <View style={{ backgroundColor:'#d0dde2', bottom:-90}}>
    <Text>DA UM HELP!</Text>
  </View>)
 }

  function renderItem({ item } ) {
    return <PostCard item={item}/>
  }

  return (

<View style={styles.container}>
<StatusBar  backgroundColor="#2C8AD8" barStyle="ligth-content"/>
      <ScrollView>
        
        <View style={styles.containerBackground}>
          
          <Image source={{uri: userBackgroundImg ? userBackgroundImg : null}} style={styles.imageBackground}/>
          <Feather onPress={() =>(navigation.navigate('Screens'))} name="arrow-left" size={24} color="white" style={styles.iconVoltar}/>
         
        </View>
        
        <View style={styles.containerProfile}>
          <Image source={{uri: userImg ? userImg : null}} style={styles.imageProfile}></Image>
        </View>
      
        <View style={styles.containerUserName}>
          <Text style={styles.userName}>{name}</Text>
        </View>
      
        <View style={styles.perfil}>
          <Text style={styles.bio}>@perfil_teste</Text>
        </View>
        <Modal
        visible={modalActive}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModalActive(false)}
        >
          <View style={styles.outerView}>
            <View style={styles.modalView}>
            <Text style={{fontSize: 35, fontWeight:"bold", marginBottom:18}}>Contatar {name}</Text>
              <Text style={{fontSize: 15}}>Ao clicar em confirmar você concorda em compartilhar seu telefone com <Text style={{fontSize: 15, fontWeight:"bold"}}>{name}</Text>.</Text>
              <TouchableOpacity onPress={() => setModalActive(false)} onPressIn={submitRequest}>
                <View style={styles.confirmContact}>
                  <Text style={styles.txtConfirmContact}>
                    Confirmar
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalActive(false)}>
                <View style={styles.cancelContact}>
                  <Text style={styles.txtConfirmContact}>
                    Recusar
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity  onPress={() => setModalActive(true)}>
        <View style={styles.profissao}>
          <MaterialIcons name="connect-without-contact" size={30} color="#242E4E"/>
          <Text style={styles.txtProfissao}>Contatar</Text>
        </View>
        </TouchableOpacity>
      
        <View style={styles.informations}>
          <MaterialCommunityIcons name="account-search-outline" size={20} color="#242E4E"/>
          <Text style={styles.txtProfissao}>Mais Informações</Text>
        </View>
      
        {/* <Button onPress={LogOut} title='enviar'></Button> */}
        <View style={styles.containerPost}>
          <Text style={styles.postagens}>Postagens</Text>
        </View>
        <View style={styles.space}></View>
        


    <Container2>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item=> item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{width: "100%", height: '100%'}}
        ListFooterComponent={teste}
      />
    </Container2>
    </ScrollView>
    </View>

  );
}



const styles=StyleSheet.create({
  container:{
    flex: 2,
    backgroundColor: "#f8f8f8",
  },

  imageBackground:{
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  containerProfile:{
    alignItems: 'center',
    marginTop: -65,
  },

  containerBackground:{
    position: 'relative'
  },

  iconVoltar:{
    position: 'absolute',
    margin: 18,
    borderWidth:0,
    backgroundColor: '#A2ACC3',
    borderRadius: 100

  },

  imageProfile:{
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#A2ACC3',
  },

  containerUserName:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
  },

  userName:{
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 20,
  },

  perfil:{
    alignItems: 'center',
    marginTop: 15,
  },

  bio:{
    color: '#A2ACC3',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  txtProfissao:{
    fontSize: 15,
    marginLeft: 6,
    
  },

  containerPost:{
    width: '100%',
    marginTop: 10,
    backgroundColor: '#2C8AD8',
    borderRadius: 10,
    justifyContent: 'center',
  },

  postagens:{
    fontSize: 24,
    paddingStart: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '2%',
    marginTop: '2%',

  },

  space:{
    height: 20,
    width: '100%',
    backgroundColor: '#d0dde2',
  },

  informations:{
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: '5%',
    backgroundColor: "#fff",
    width: '90%',
    height: 40,
    borderRadius: 10,
    shadowOpacity: 80, 
    elevation: 15,
    marginTop: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },

  outerView:{
    flex:1,
    justifyContent: "center",
    alignItems:"center",
    backgroundColor:'rgba(0,0,0,0.2)'
  },

  modalView:{
    backgroundColor:"white",
    borderRadius:10,
    padding:35,
    width:350,
    alignItems: "center"
  },

  profissao:{
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: '5%',
    backgroundColor: "#fff",
    width: '90%',
    height: 40,
    borderRadius: 10,
    shadowOpacity: 80, 
    elevation: 15,
    marginTop: 10,
    justifyContent: 'center',
  },

  confirmContact:{
   backgroundColor:"green",
   marginTop: 35,
   margin:20,
   width:200,
   height:40,
   alignItems: "center",
   justifyContent:"center",
   borderRadius: 10
  },

  cancelContact:{
    backgroundColor:"red",
    margin:20,
    marginTop: -10,
    width:200,
    height:40,
    alignItems: "center",
    justifyContent:"center",
    borderRadius: 10
   },

  txtConfirmContact:{
    color:"white",
    fontSize: 15,
    marginLeft: 6,
    
  },
});