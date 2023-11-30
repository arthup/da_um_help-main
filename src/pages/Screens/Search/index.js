import React, { useState, useEffect } from "react";
import {View, StyleSheet, TextInput,  FlatList, ScrollView, TouchableOpacity, StatusBar,  Keyboard, TouchableWithoutFeedback} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { ProfileCard } from './ProfileCard'
import { db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, orderBy} from "firebase/firestore";

const Search = () =>{
  const [search, setSearch] = useState(''); 
  const list = [];
  const [masterData, setMasterData] = useState([]);
  const [filteredData, setFilteredData] = useState('');

  function renderItem({ item }) {return <ProfileCard item={item}/>}

  const getUserInfo = async () => {
    try{
      const q = query(collection(db, "users"), orderBy('name','asc'));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        const { userId, name, userImg, nameSearch, cidade, estado}  = doc.data();
          list.push({ 
            name,
            userId,
            userImg,
            nameSearch,
            cidade,
            estado,
            id: doc.id
          });
          setMasterData(list);
          setFilteredData(list);
        });
      }catch(e){
        console.log(e)
      }  
}
console.log(filteredData)
useEffect(() => {
  getUserInfo()   
}, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.sort(function(a, b) {
        if(a.name < b.name) {
          return -1;
        } else {
          return true;
        }
      }).filter(
        function (item) {
          if (item.nameSearch){
            const itemData = item.nameSearch;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }
      });
      setFilteredData(newData);
    } else {
      setFilteredData(masterData);
    }
    setSearch(text);
  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>

          <View style={styles.containerHeader}> 
            <View style={styles.search}>
              <TouchableOpacity>
                <FontAwesome5 name="search" size={26} style={styles.iconPesquisa}/> 
              </TouchableOpacity>
                
                <TextInput
                  placeholder='Pesquisar'
                  style={styles.barSearch}
                  onChangeText={(text) => searchFilter(text)}
                  value={search}
                />
            </View>
          </View>

          <View style={styles.containerResults}> 
            <FlatList
              data={filteredData}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              style={{width: "100%", height: '100%'}}
            />
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