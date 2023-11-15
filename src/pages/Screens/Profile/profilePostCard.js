import React, { useState, useRef, useEffect } from 'react';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons'; 
import { Card, CardWork, CardAvaliation, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from './profileFeedStyle';
import { TouchableOpacity, View, Modal,Text } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../Services/firebaseConfig';
import { MenuPopUp } from './menuPopUp'
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";

export const ProfilePostCard = ({item}) => {
  const [like, setLike] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
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

    if(item.postType === 'Avaliação'){
      <CardAvaliation>
          <UserInfo>
            <UserImg source={{uri: userImg ? userImg : null}}/>
            <UserInfoText>
                <View style={{flexDirection:'row', alignContent:'center', width: '100%', position:'relative'}}>
                    <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item) )}>
                        <UserName>{item.name}</UserName>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginLeft:'90%', position: 'absolute'}} onPress={() => setVisibleModal(true)}>
                      <Entypo name="dots-three-vertical" size={18} color="black" />
                    </TouchableOpacity>

                    <Modal
                      animationType='fade'
                      visible={visibleModal}
                      transparent={true}
                      onRequestClose={() => setVisibleModal(false)}  
                    >
                      <MenuPopUp
                        handleClose={()=> setVisibleModal(false)}
                        handleOpen={item}
                      />
                    </Modal>

                </View>
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
        </CardAvaliation>
    }
    else if(item.postType !== 'Cliente'){
      return(
      <CardWork>
          <UserInfo>
            <UserImg source={{uri: userImg ? userImg : null}}/>
            <UserInfoText>
                <View style={{flexDirection:'row', alignContent:'center', width: '100%', position:'relative'}}>
                    <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item) )}>
                        <UserName>{name}</UserName>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginLeft:'90%', position: 'absolute'}} onPress={() => setVisibleModal(true)}>
                      <Entypo name="dots-three-vertical" size={18} color="black" />
                    </TouchableOpacity>

                    <Modal

                    animationType='fade'
              
                      visible={visibleModal}
                      transparent={true}
                      onRequestClose={() => setVisibleModal(false)}  
                    >
                      <MenuPopUp
                        handleClose={()=> setVisibleModal(false)}
                        handleOpen={ item}
                      />
                    </Modal>

                </View>
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
        </CardWork>
        
        )
    }else{
    return (
      <Card>
      <UserInfo>
        <UserImg source={{uri: userImg ? userImg : null}}/>
        <UserInfoText>
            <View style={{flexDirection:'row', alignContent:'center', width: '100%', position:'relative'}}>
                <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item) )}>
                    <UserName>{name}</UserName>
                </TouchableOpacity>

                <TouchableOpacity style={{marginLeft:'90%', position: 'absolute'}} onPress={() => setVisibleModal(true)}>
                  <Entypo name="dots-three-vertical" size={18} color="black" />
                </TouchableOpacity>

                <Modal

                animationType='fade'
          
                  visible={visibleModal}
                  transparent={true}
                  onRequestClose={() => setVisibleModal(false)}  
                >
                  <MenuPopUp
                    handleClose={()=> setVisibleModal(false)}
                    handleOpen={ item}
                  />
                </Modal>

            </View>
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
    </Card>
    );
  }}}