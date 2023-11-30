import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, RefreshControl, FlatList, ScrollView, Modal, SafeAreaView } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons'; 
import { PostCard } from '../Home/PostCard.js';
import { Container2 } from '../Home/FeedStyle.js';
import { setDoc, doc } from "firebase/firestore";

export default function UserProfile(item){

  const navigation = useNavigation();
  const user = auth.currentUser;
  const [userBackgroundImg, setUserBackgroundImg]=useState('');
  const [userImg, setUserImg]=useState('');
  const [name, setName]=useState('');
  const [telefoneUser, setTelefoneUser]=useState('');
  const [posts, setPosts]=useState('');
  const [cidade, setCidade]=useState('');
  const [estado, setEstado]=useState('');
  const [bio, setBio]=useState('');
  const listUserInfo = [];
  const list = [];
  const requestId = user.uid + item.route.params.userId;
  const [modalActive, setModalActive]=useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{
      getUserInfo()
      getPosts(...posts)
    }, 2000)
    setRefreshing(false)
  };

  const getTelefone = async () => {
    try{
      const q = query(collection(db, "users"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        const {telefone}  = doc.data();
        ({ 
          telefone,
        });
          setTelefoneUser(telefone);
        }); 
      } catch (e) {
        console.error("Error adding document: ", e);
      }}

  const submitRequest = async () => {
    try{  
      const docRef = (collection(db, "request"), {
        userId:user.uid,
        name: user.displayName,
        userImg: user.photoURL,
        requestUserId: item.route.params.userId,
        requestId: requestId,
        telefoneContato: telefoneUser,
        requestTime: Date.now(),
        requestAccepted: false,
      });

    setDoc(doc(db, "request", requestId), docRef);
    console.log("Document written with ID: ", docRef);   
    }catch(e){
      console.error("Error adding document: ", e);
      }
    setModalActive(false)
  }

  const getUserInfo = async () => {

    if(item.route.params.userId !== user.uid){
    try{
      const q = query(collection(db, "users"), where("userId", "==", item.route.params.userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {userBackgroundImg, userImg, name, cidade, estado, bio}  = doc.data();
        listUserInfo.push({ 
          userBackgroundImg,
          userImg,
          name,
          cidade,
          estado,
          bio,
          id: doc.id,
        });
        setUserBackgroundImg(userBackgroundImg);
        setUserImg(userImg);
        setName(name);
        setBio(bio);
        setCidade(cidade);
        setEstado(estado);
      });
    } catch(e){
      console.log(e)}
  }else{
    try{
      const q = query(collection(db, "users"), where("userId", "==", item.route.params.requestUserId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {userBackgroundImg, userImg, name, cidade, estado, bio}  = doc.data();
        listUserInfo.push({ 
          userBackgroundImg,
          userImg,
          name,
          cidade,
          estado,
          bio,
          id: doc.id,
        });
        setUserBackgroundImg(userBackgroundImg);
        setUserImg(userImg);
        setName(name);
        setBio(bio);
        setCidade(cidade);
        setEstado(estado);
      });
    } catch(e){
      console.log(e)}
  }}

  const getPosts = async () => {
    try{
      const q = query(collection(db, "posts"), where("userId", "==", item.route.params.userId), orderBy('orderTime', 'desc'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {comments, likes, post, postImage, postTime, userId, name, userImg, postType}  = doc.data();
        list.push({ 
          name,
          comments, 
          likes, 
          post, 
          postImage, 
          postTime, 
          userId,
          userImg,
          postType,
          id: doc.id
        });
        setPosts(list);
      });
    } catch(e){
      console.log(e)
    }
  }

  const getAvaliation = async () => {
    try{
      const q = query(collection(db, "posts"), where("requestUserId", "==", item.route.params.userId), orderBy('orderTime', 'desc'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {comments, likes, post, postImage, postTime, requestUserId,rating,userId, name, userImg, postType}  = doc.data();
        list.push({ 
          name,
          comments, 
          likes, 
          post, 
          postImage, 
          postTime, 
          userId,
          userImg,
          rating,
          postType,
          requestUserId,
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
    getTelefone()
  }, []);

  function renderItem({ item } ) {
    return <PostCard item={item}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} refreshing={refreshing}>
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

        <View style={styles.information}>
          <Text style={styles.city}>{cidade + '/' + estado}</Text>
        </View> 

        <View style={{borderBottomColor: '#A2ACC3', borderBottomWidth: 1, width: '80%', alignSelf: 'center', marginTop: 15 }}/>

        <View style={styles.information}>
          <Text style={styles.bio}>{bio}</Text>
        </View>

        <Modal
          visible={modalActive}
          transparent={true}
          animationType='fade'
          onRequestClose={() => setModalActive(false)}
        >
          <View style={styles.outerView}>
            <View style={styles.modalView}>
              <Text style={{fontSize: 25, fontWeight:"bold", marginBottom:18}}>Contatar {name}?</Text>
              <Text style={{fontSize: 14, fontWeight: "500", textAlign: 'center', color: "#A2ACC3"}}>Ao clicar em confirmar você concorda em compartilhar seu telefone com {name}.</Text>
              
              <TouchableOpacity onPress={submitRequest}>
                <View style={styles.confirmContact}>
                  <Text style={styles.txtConfirmContact}>Confirmar</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalActive(false)}>
                <View style={styles.cancelContact}>
                  <Text style={styles.txtConfirmContact}>Recusar</Text>
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

            <View style={styles.containerButtons}>
          <TouchableOpacity onPress={getPosts} >
            <Text style={styles.postagens}>Postagens</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={getAvaliation}>
            <Text style={styles.postagens}>Avaliações</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.color}>
          <View style={styles.space}/>
        </View>

        <Container2>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={item=> item.id}
            scrollEnabled={false}
            style={{width: "100%", height: '100%'}}
          />
        </Container2>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  iconVoltar:{
    position: 'absolute',
    margin: 18,
    borderWidth:0,
    backgroundColor: '#A2ACC3',
    borderRadius: 100
  },

  containerBackground:{
    position: 'relative'
  },

  txtProfissao:{
    fontSize: 15,
    marginLeft: 6,
    
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
    backgroundColor:'#000202E3'
  },

  modalView:{
    backgroundColor:"white",
    borderRadius:25,
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
    marginBottom: 10
  },

  confirmContact:{
    backgroundColor:"green",
    marginTop: 35,
    margin:20,
    width:140,
    height:40,
    alignItems: "center",
    justifyContent:"center",
    borderRadius: 50
  },

  cancelContact:{
    backgroundColor:"red",
    marginTop: -10,
    width: 140,
    height:40,
    alignItems: "center",
    justifyContent:"center",
    borderRadius: 50
  },

  txtConfirmContact:{
    color:"white",
    fontSize: 15,
    marginLeft: 6,
    
  },

  container:{
    flex: 2,
    backgroundColor: ''
  },

  color:{
    backgroundColor: "#2C8AD8",
  },

  imageBackground:{
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },

  containerProfile:{
    alignItems: 'center',
    marginTop: -65,
  },

  imageProfile:{
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#A2ACC3',
  },

  imageBackground:{
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  containerUserName:{
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 40,
  },

  userName:{
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 20,
  },

  information:{
    alignItems: 'center',
    marginTop: 15,
  },

  city:{
    marginHorizontal: "5%",
    color: '#A2ACC3',
    fontSize: 15,
    fontWeight: 'bold',
  },

  bio:{
    marginHorizontal: "5%",
    color: '#5A6687',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  containerButtons:{
    width: '100%',
    backgroundColor: '#2C8AD8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },

  postagens:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  space:{
    height: 30,
    width: '100%',
    backgroundColor: '#d0dde2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "#d0dde2",
    borderWidth: 1
  },
});