import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, RefreshControl, FlatList, ScrollView, Button, ListRenderItemInfo, SectionList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5, MaterialCommunityIcons, Foundation } from '@expo/vector-icons'; 
import { ProfilePostCard } from './profilePostCard';
import { Container2, Divider } from '../Home/FeedStyle.js';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Profile = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [userBackgroundImg, setUserBackgroundImg]=useState('');
  const [userImg, setUserImg]=useState('');
  const [name, setName]=useState('');
  const [posts, setPosts]=useState('');
  const [refreshing, setRefreshing] = useState(false);
  const listUserInfo = [];
  const list = [];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{
      getUserInfo()
     getPosts(...posts)}, 2000)
     setRefreshing(false)
  };


  const getUserInfo = async () => {
    
    try{
      const q = query(collection(db, "users"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {userBackgroundImg, userImg, name}  = doc.data();
        listUserInfo.push({ 
          userBackgroundImg,
          userImg,
          name,
          id: doc.id
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
      const q = query(collection(db, "posts"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {comments, likes, post, postImage, postTime, userId, name, userImg, timeStamp, telefone, postType}  = doc.data();
        list.push({ 
          name,
          comments, 
          likes, 
          post, 
          postImage, 
          postTime, 
          userId,
          userImg,
          timeStamp,
          telefone,
          postType,
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


  function renderItem({ item } ) {
    return <ProfilePostCard item={item}/>
  }

  return (
    
<View style={styles.container}>
      <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      refreshing={refreshing} >
        <View>
          <Image source={{uri: userBackgroundImg ? userBackgroundImg : null}} style={styles.imageBackground}></Image>
        </View>
        
        <View style={styles.containerProfile}>
          <Image source={{uri: userImg ? userImg : null}} style={styles.imageProfile}></Image>
        </View>
      
        <View style={styles.containerUserName}>
          <Text style={styles.userName}>{name}</Text>
          <TouchableOpacity onPress={()=>(navigation.navigate('EditProfile'))}>
            <FontAwesome5 name="edit" size={20} color="#242E4E" style={styles.icon}/>
          </TouchableOpacity>
        </View>
      
        <View style={styles.perfil}>
          <Text style={styles.bio}>@perfil_teste</Text>
        </View>
        
        <View style={styles.profissao}>
          <Foundation name="paint-bucket" size={20} color="#242E4E"/>
          <Text style={styles.txtProfissao}>Pintor profissional</Text>
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
      />
    </Container2>
    </ScrollView>
    </View>

  );
}

export default Profile;

const styles=StyleSheet.create({
  container:{
    flex: 2,
    backgroundColor: "",
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

  txtProfissao:{
    fontSize: 15,
    marginLeft: 12,

  },

  containerPost:{
    width: '100%',
    marginTop: 10,
    backgroundColor: '#2C8AD8',
    borderRadius: 10,
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
});