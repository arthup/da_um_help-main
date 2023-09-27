import React, { Component, useState, useEffect } from "react";
import {View, StyleSheet, TextInput,  FlatList, Text, ScrollView, TouchableOpacity, Image, StatusBar,  Keyboard, TouchableWithoutFeedback} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { PostCard } from '../Home/PostCard';
import { ProfileCard } from './ProfileCard'
import { Container } from "./profileCardStyle";
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where, orderBy, and} from "firebase/firestore";
import { get, equalTo} from 'firebase/database'

const Search = () =>{

  const [search, setSearch] = useState(''); 
  const [filteredData, setFilteredData] = useState([]); 
  const [masterData, setMasterData] = useState([]);
  const list = [];
  const [posts, setPosts]=useState('');

  function renderItem({ item } ) {
    return <ProfileCard item={item}/>
  }



  const getUserInfo = async () => {
    if(search === ''){
      undefined
     console.log(list)
     console.log('nada')
     list.slice(0,undefined)
    } else {
      try{

        const q = query(collection(db, "users"), where('nameSearch', '==', search.toUpperCase().trim()));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
          const {comments, likes, post, postImage, postTime, userId, name, userImg, nameSearch, timeStamp}  = doc.data();
          list.push({ 
            name,
            comments, 
            likes, 
            post, 
            postImage, 
            postTime, 
            userId,
            userImg,
            nameSearch,
            id: doc.id
          });
          setPosts(list);
          console.log(list)
     
        });
      } catch(e){
        console.log(e)}
        console.log(search)
    
  }}

  // useEffect(() => {

  //   getUserInfo()
    

  // }, []);

  const footer = () => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.titleStyle}>This is the footer</Text>
      </View>
    );
  };
  

 


  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
    <View style={styles.container}>
      <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>

      <View style={styles.containerHeader}> 
        <View style={styles.search}>
          <TouchableOpacity onPress={ search.trim() &&getUserInfo}>
            <FontAwesome5 name="search" size={26} style={styles.iconPesquisa}/> 
          </TouchableOpacity>
            
          <TextInput
            placeholder='Pesquisar'
            style={styles.barSearch}
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
        </View>


      </View>
      <View style={styles.containerResults}> 

      {list == [] ? <View/> :
      <FlatList
           data={posts}
           scrollEnabled={false}
           keyExtractor={item => item.id}
           renderItem={renderItem}
          
           style={{width: "100%", height: '100%'}}
         />
      }
      </View>


    </View>
    </ScrollView>
  </TouchableWithoutFeedback>
  );
}

export default Search;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#f8f8f8",
  },

  containerHeader:{
    backgroundColor: "#2C8AD8",
    alignSelf: 'center', 
    alignItems: 'center',
    width: '100%',
    height: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  search:{
    flexDirection: 'row',
    alignItems: "center",
    marginTop: "20%",
  },

  iconPesquisa:{
    marginRight: 10,
    color: 'white',
  },

  barSearch:{
    backgroundColor: 'white',
    width: 280,
    height: 40,
    borderRadius: 100,
    paddingLeft: 20,
  },

  searchResult: {
    width: "100%",
    height: "20%",
    marginTop: "7%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",

  },

  searchResultUser: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "50%",
  
  },

  searchResultPost: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "50%",
    borderLeftWidth: 1,
    borderColor: "white",
  },

  textSearchResultUser: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  textSearchResultPost: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  containerResults:{
    backgroundColor: "white",
    width: '100%',
    height: '100%',
  },
  
  profileUser:{
    marginTop: 20,
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#2C8AD8", 
  },

  imageProfile:{
    width: 40,
    height: 40,
    backgroundColor: "black",
    borderRadius: 100,
    marginRight: 10,
  },

  containerText:{
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  nameUser:{
    fontWeight: "bold",
    fontSize: 16,
  },
  headerStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: 'white',
  },
});