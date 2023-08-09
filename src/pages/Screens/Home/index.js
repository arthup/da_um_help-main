import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, RefreshControl } from 'react-native';
import { Container } from './FeedStyle.js';
import { PostCard } from './PostCard.js';
import { collection, doc, getDocs } from "firebase/firestore";
import { storage, auth, db } from '../../../Services/firebaseConfig';
import { useBackHandler } from '@react-native-community/hooks';

const Home = () => {
  const [posts, setPosts]=useState('')
  const [users, setUsers]=useState('')
  const list = [];

  useBackHandler(() =>{
    if(1 == 1){
  return true
    }
  });
 
  const getPosts = async () => {
    
    try{

  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    const { name } = doc.data();
    list.push({
 name
    });
    setPosts(list);
    console.log(posts)
  });

  } catch(e){
    console.log(e)}
  }


  useEffect(() => {
    getPosts()   
  }, []);



  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <Container>

      
      <FlatList
        data={posts}
        renderItem={({item}) => <PostCard item={item}/>}
        keyExtractor={item=> item.id}
        showsVerticalScrollIndicator={false}
        style={{width: "105%"}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      
    </Container>
  );
}

export default Home;

