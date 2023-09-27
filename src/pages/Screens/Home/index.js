import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Container } from './FeedStyle.js';
import { PostCard } from './PostCard.js';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../../../Services/firebaseConfig';
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
      const q = query(collection(db, 'posts'), orderBy('orderTime', 'desc'))
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        const { comments, likes, post, postImage, postTime, userId, name, userImg, orderTime, postType } = doc.data();
        list.push({ 
          name,
          comments, 
          likes, 
          post, 
          postImage, 
          postTime, 
          userId,
          userImg,
          orderTime,
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
    getPosts()   
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
   renderItem({item});
   setRefreshing(false);
  }, []);


  function renderItem({ item } ) {
    return <PostCard item={item}/>
  }


  return (
    <Container>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item=> item.id}
        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        style={{width: "105%"}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        refreshing={refreshing} 
      />
    </Container>
  );
}

export default Home;
