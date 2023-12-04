import React, { useState, useEffect  } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { Card, CardWork, UserInfo, CardAvaliation, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from './FeedStyle';
import { TouchableOpacity, Image, View, Text, Modal } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";
import { CommentsPopUp } from './commentsPopUp';

export const PostCard = ({item}) => {
  const [like, setLike] = useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
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

  if (item.post ===''){
    undefined
  } else {
    if(item.postType !== 'Cliente' && item.postType !== 'Avaliação'){
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
              <AntDesign  style={{bottom: -1}} name={like===false ?'like2' : 'like1'} size={25} color='#242E4E'/>
              <InteractionText>Curtir</InteractionText>
            </Interaction>
  
            <Interaction onPress={()=> (setVisibleModal(true))}>
              <FontAwesome style={{bottom: -3}} name='comment' size={25} color='#242E4E'/>
              <InteractionText>Comentarios</InteractionText>
            </Interaction>

            <Modal
              animationType='slide'
              visible={visibleModal}
              transparent={true}
              onRequestClose={() => setVisibleModal(false)}  
            >
              <CommentsPopUp
                handleClose={()=> setVisibleModal(false)}
                handleOpen={'1'}
            />
            </Modal>
          </InteractionWrapper>
        </CardWork>)
    } else if(item.postType === 'Avaliação'){
      return (
          <CardAvaliation>
            <UserInfo>
            <TouchableOpacity onPress={()=>( item.name === user.displayName ? navigation.navigate('Perfil') : navigation.navigate('userProfile', item)  )}><UserImg source={{uri: userImg ? userImg : null}}/></TouchableOpacity>
              <UserInfoText>
                <TouchableOpacity onPress={()=>( item.name === user.displayName ? navigation.navigate('Perfil') : navigation.navigate('userProfile', item)   )}><UserName>{name}</UserName></TouchableOpacity>
                <PostTime>{item.postTime}</PostTime>
              </UserInfoText>
              <View style={{justifyContent: "center", height: "50%", flexDirection: "row", alignItems: "center", marginLeft: "27%"}}>
                <Image source={require('../../../assets/star_cheia.png')} style={{  width: "23%", height: "70%"}}/>
                <Text style={{fontSize: 15, fontWeight: "bold", color: "#A2ACC3", marginLeft: 5}}>{item.rating}</Text>
              </View>
            </UserInfo>
            
            <PostText>{item.post}</PostText>
            {item.postImage !== null ? <PostImage source={{ uri: item.postImage}} /> : <Divider />}
            
            <InteractionWrapper>
              <Interaction onPress={pressLike}>
                <AntDesign  style={{bottom: -1}} name={like===false ?'like2' : 'like1'} size={25} color='#242E4E'/>
                <InteractionText>Curtir</InteractionText>
              </Interaction>
    
              <Interaction onPress={()=> (setVisibleModal(true))}>
                <FontAwesome style={{bottom: -3}} name='comment' size={25} color='#242E4E'/>
                <InteractionText>Comentarios</InteractionText>
              </Interaction>

              <Modal
              animationType='slide'
              visible={visibleModal}
              transparent={true}
              onRequestClose={() => setVisibleModal(false)}  
            >
              <CommentsPopUp
                handleClose={()=> setVisibleModal(false)}
                handleOpen={'1'}
            />
            </Modal>
            </InteractionWrapper>
          </CardAvaliation>
      );
    } if(item.postType === 'Cliente'){
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
                <AntDesign  style={{bottom: -1}} name={like===false ?'like2' : 'like1'} size={25} color='#242E4E'/>
                <InteractionText>Curtir</InteractionText>
              </Interaction>
    
              <Interaction onPress={()=> (setVisibleModal(true))}>
                <FontAwesome style={{bottom: -3}} name='comment' size={25} color='#242E4E'/>
                <InteractionText>Comentarios</InteractionText>
              </Interaction>

            <Modal
              animationType='slide'
              visible={visibleModal}
              transparent={true}
              onRequestClose={() => setVisibleModal(false)}  
            >
              <CommentsPopUp
                handleClose={()=> setVisibleModal(false)}
                handleOpen={'1'}
            />
            </Modal>
            </InteractionWrapper>
          </Card>
      );
    }
  }
}