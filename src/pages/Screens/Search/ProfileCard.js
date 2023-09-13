import React, { useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from './profileCardStyle';
import { TouchableOpacity } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';



export const ProfileCard = ({item}) => {
  const navigation = useNavigation();
  
  if (item.name ===''){
    undefined
  } else {
    return (
        <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item) )}>
        <Card>
          <UserInfo>
            <UserImg source={{uri: item.userImg}}/>
            <UserInfoText>
              <UserName>{item.name}</UserName>
            </UserInfoText>
          </UserInfo>
       
        </Card>
        </TouchableOpacity>
    );
  }}
  

  

