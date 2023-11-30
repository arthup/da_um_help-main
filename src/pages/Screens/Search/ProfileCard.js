import React from 'react';
import { Card, UserInfo, UserImg, UserInfoText, UserName, Divider } from './profileCardStyle';
import { TouchableOpacity, Text } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../Services/firebaseConfig';

export const ProfileCard = ({item}) => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  
  if (item.name ===''){
    undefined
  } else {
    return (
        <TouchableOpacity onPress={()=>(  item.name === user.displayName ? navigation.navigate('Perfil') : navigation.navigate('userProfile', item))}>
          <Card>
            <UserInfo>
              <UserImg source={{uri: item.userImg}}/>
              <UserInfoText>
                <UserName>{item.name}</UserName>
                <Text>{item.cidade}/{item.estado}</Text>
              </UserInfoText>
            </UserInfo>
          </Card>
        </TouchableOpacity>
        
    );
  }}
  

  

