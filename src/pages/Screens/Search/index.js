import React, { Component } from "react";
import {View, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity, StatusBar} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const Search = () =>{
    return (

      <View style={styles.container}>
        <StatusBar backgroundColor="#4FB9FF" barStyle="ligth-content"/>
          <View style={styles.containerHeader}>
              
              

              <TouchableOpacity>
                <FontAwesome5 name="search" size={24} style={styles.iconPesquisa}/> 
              </TouchableOpacity> 

              <TextInput
                placeholder='Pesquisar'
                style={styles.barraPesquisa}
              />
          </View>

          <View style={styles.espacinho}/>

      </View>

    );
  }


export default Search;

const styles=StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },

  containerHeader:{
    paddingStart: '6%',
    backgroundColor: '#4FB9FF',
    alignSelf: "center", 
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 160,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  barraPesquisa:{
    backgroundColor: "white",
    width: 280,
    height: 40,
    borderWidth: 0.3,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 40,
    paddingLeft: 20,
    shadowOpacity: 2, 
    elevation: 3, 
  },

  iconPesquisa:{
    marginTop: 45,
    marginRight: 10,
    color: "white"
  },
  
  espacinho:{
    padding: 40,
  }
})