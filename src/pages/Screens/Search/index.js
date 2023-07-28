import React, { Component } from "react";
import {View, ScrollView, Image, StyleSheet, TextInput} from "react-native";

const Search = () =>{
    return (

      <View style={styles.container}>

        <ScrollView>

          <View style={styles.containerHeader}>
              <Image source={require('../../../assets/pesquisa(1).png')} style={styles.iconPesquisa}></Image>
              <TextInput
                placeholder='Pesquisar'
                style={styles.barraPesquisa}
              />
          </View>

          <View style={styles.espacinho}/>

        </ScrollView>

      </View>

    );
  }


export default Search;

const styles=StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },

  containerHeader:{
    paddingStart: '5%',
    backgroundColor: '#d6e9ff',
    alignSelf: "center", 
    alignItems: "center",
    flexDirection: "row",
    width: 400,
    height: 200,
    borderRadius: 30,
  },

  barraPesquisa:{
    backgroundColor: "white",
    width: 300,
    height: 40,
    borderWidth: 1,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 70,
    paddingLeft: 20,
    shadowOpacity: 2, 
    elevation: 3, 
  },

  iconPesquisa:{
    width: 30,
    height: 30,
    marginTop: 75,
    marginRight: 10,
  },
  
  espacinho:{
    padding: 40,
  }
})