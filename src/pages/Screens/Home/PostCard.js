import React, { useState, useEffect  } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { Card, CardWork, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from './FeedStyle';
import { TouchableOpacity } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";

export const PostCard = ({item}) => {
  const [like, setLike] = useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [userImg, setUserImg] = useState('');
  const user = auth.currentUser;
  const listUserInfo =[];

  const getDoc = async () =>{
    try{
      const q = query(collection(db, "users"), where("userId", "==", item.userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const { name, userImg }  = doc.data();
        listUserInfo.push({ 
          name,
          userImg,
          id: doc.id
        });
        setName(name)
        setUserImg(userImg)
      });
    } catch(e){
      console.log(e)}
  }
 
  useEffect(() => {
    getDoc()
  }, []);

  const pressLike =() => {
    if (like === false){
      setLike(true)
    } else {
      setLike(false)
    }
  }

  if (item.name ===''){
    undefined
  } else {
    if(item.postType !== 'Cliente'){
      return(
      <CardWork>
          <UserInfo>
          <TouchableOpacity onPress={()=>( item.name === user.displayName ? navigation.navigate('Perfil') : navigation.navigate('userProfile', item)  )}><UserImg source={{uri: userImg ? userImg : null}}/></TouchableOpacity>
            <UserInfoText>
              <TouchableOpacity onPress={()=>(  item.name === user.displayName ? navigation.navigate('Perfil') : navigation.navigate('userProfile', item)   )}><UserName>{name}</UserName></TouchableOpacity>
              <PostTime>{item.postTime}</PostTime>
            </UserInfoText>
          </UserInfo>
  
          <PostText>{item.post}</PostText>
          {item.postImage !== null ? <PostImage source={{ uri: item.postImage}} /> : <Divider />}
          
          <InteractionWrapper>
            <Interaction onPress={pressLike}>
              <AntDesign  style={{bottom: -1}} name={like===false ?'like2' : 'like1'} size={27} color='#242E4E'/>
              <InteractionText>Curtir</InteractionText>
            </Interaction>
  
            <Interaction >
              <FontAwesome style={{bottom: -3}} name='comment' size={27} color='#242E4E'/>
              <InteractionText>Comentarios</InteractionText>
            </Interaction>
          </InteractionWrapper>
        </CardWork>)
    }else{
    return (
        <Card>
          <UserInfo>
          <TouchableOpacity onPress={()=>( item.name === user.displayName ? navigation.navigate('Perfil') : navigation.navigate('userProfile', item)  )}><UserImg source={{uri: userImg ? userImg : null}}/></TouchableOpacity>
            <UserInfoText>
              <TouchableOpacity onPress={()=>( item.name === user.displayName ? navigation.navigate('Perfil') : navigation.navigate('userProfile', item)   )}><UserName>{name}</UserName></TouchableOpacity>
              <PostTime>{item.postTime}</PostTime>
            </UserInfoText>
          </UserInfo>
  
          <PostText>{item.post}</PostText>
          {item.postImage !== null ? <PostImage source={{ uri: item.postImage}} /> : <Divider />}
          
          <InteractionWrapper>
            <Interaction onPress={pressLike}>
              <AntDesign  style={{bottom: -1}} name={like===false ?'like2' : 'like1'} size={27} color='#242E4E'/>
              <InteractionText>Curtir</InteractionText>
            </Interaction>
  
            <Interaction >
              <FontAwesome style={{bottom: -3}} name='comments' size={27} color='#242E4E'/>
              <InteractionText>Comentarios</InteractionText>
            </Interaction>
          </InteractionWrapper>
        </Card>
    );
  }}}
  

  

