import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Image, StatusBar,FlatList, ActivityIndicator } from 'react-native';
import { signOut } from "firebase/auth";
import  { auth } from '../../../Services/firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import { Header, Icon } from '@rneui/base';
import { Entypo, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import { Container, Card, UserInfo, UserImg } from './FeedStyle'

const Home = () => {

  const user = auth.currentUser;
  const navigation = useNavigation();
  const foto = user.photoURL;

  return (
    <Container>
      <Card>
        <UserInfo>
          <UserImg source={{uri: foto}}/>
        </UserInfo>
      </Card>
    </Container>
  );
}

export default Home;

