import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Image, StatusBar } from 'react-native';
import { signOut } from "firebase/auth";
import  {auth} from '../../../Services/firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import { Header, Icon } from '@rneui/base';
import { Entypo, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'; 


const Home = () => {

const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4FB9FF" barStyle="ligth-content"/>
      <View style={styles.header}> 
        <View>
          <Image
            source={require('../../../assets/IconeLogo.png')}
            resizeMode='contain'
            style={{ width: 170}}
          />
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="notifications" size={24} color="#d6e9ff"/>
        </View>
      </View>

      <View style={styles.body}>
        <Text>aaaaaaaaaaaaaa</Text>
      </View>
    </SafeAreaView>

  );
}

export default Home;

const styles = StyleSheet.create({
  header:{
    backgroundColor:'#4FB9FF',
    width: '100%',
    height: '30%',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'flex-start',
    flex:0.5
  },
  headerIcon:{
    paddingLeft:'40%',
  },
  container:{
    backgroundColor: '#f0f8ff',
    width: '100%',
    height: '100%',
  },
  body:{
    flex: 5
  }


})