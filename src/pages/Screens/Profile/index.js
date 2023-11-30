import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, RefreshControl, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { ProfilePostCard } from './profilePostCard';
import { Container2 } from './profileFeedStyle';

const Profile = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [userBackgroundImg, setUserBackgroundImg]=useState('');
  const [userImg, setUserImg]=useState('');
  const [bio, setBio]=useState('');
  const [name, setName]=useState('');
  const [cidade, setCidade]=useState('');
  const [estado, setEstado]=useState('');
  const [posts, setPosts]=useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [corTxt, setCorTxt] = useState('Postagem');
  const listUserInfo = [];
  const list = [];

  const cor=StyleSheet.create({
    postagens:{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#8BD7F3',
    },

    postagens2:{
      fontSize: 18,
      fontWeight: 'bold',
      color:  "white",
    },
  });

  const getUserInfo = async () => {
    try{
      const q = query(collection(db, "users"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {userBackgroundImg, userImg, name, bio, cidade, estado}  = doc.data();
        listUserInfo.push({ 
          userBackgroundImg,
          userImg,
          name,
          bio,
          cidade,
          estado,
          id: doc.id
        });
        setCidade(cidade);
        setEstado(estado);
        setUserBackgroundImg(userBackgroundImg);
        setUserImg(userImg);
        setName(name);
        setBio(bio)
      });
    } catch(e){
      console.log(e)}
  }

  const getPosts = async () => {
    
    try{
      const q = query(collection(db, "posts"), where("userId", "==", user.uid), orderBy('orderTime', 'desc'));
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
    setCorTxt('Postagem')
  }

  const getAvaliation = async () => {
    try{
      const q = query(collection(db, "posts"), where("requestUserId", "==", user.uid), orderBy('orderTime', 'desc'));
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
    setCorTxt('')
  }

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{
      getUserInfo()
      getPosts(...posts)
    }, 2000)
    setRefreshing(false)
  };

  useEffect(() => {
    getUserInfo()
    getPosts()
  }, []);


  function renderItem({ item }) { return <ProfilePostCard item={item}/> }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} refreshing={refreshing} >
        <View>
          <Image source={{uri: userBackgroundImg ? userBackgroundImg : null}} style={styles.imageBackground}/>
        </View>

        <View style={styles.containerProfile}>
          <Image source={{uri: userImg ? userImg : null}} style={styles.imageProfile}/>
        </View>

        <View style={styles.containerUserName}>
          <Text style={styles.userName}>{name}</Text>

          <TouchableOpacity onPress={()=>(navigation.navigate('EditProfile'))}>
            <FontAwesome5 name="edit" size={20} color="#242E4E" style={styles.icon}/>
          </TouchableOpacity>
        </View>

        <View style={styles.information}>
          <Text style={styles.city}>{cidade + '/' + estado}</Text>
        </View> 

        <View style={{borderBottomColor: '#A2ACC3', borderBottomWidth: 1, width: '80%', alignSelf: 'center', marginTop: 15 }}/>

        <View style={styles.information}>
          <Text style={styles.bio}>{bio}</Text>
        </View>

        <View style={styles.containerButtons}>
          <TouchableOpacity onPress={getPosts} >
            <Text style={corTxt=== 'Postagem' ? cor.postagens2 : cor.postagens}>Postagens</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={getAvaliation}>
            <Text style={corTxt=== '' ? cor.postagens2 : cor.postagens}>Avaliações</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.color}>
          <View style={styles.space}/>
        </View>

        <Container2>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={item=> item.id  }
            scrollEnabled={false}
            style={{width: "100%", height: '100%'}}
          />
        </Container2>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;
const styles=StyleSheet.create({
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