import React, { useState, useEffect } from 'react';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons'; 
import { Card, CardWork, CardAvaliation, UserInfo, UserImg, UserInfoText, UserInfoText2, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from './profileFeedStyle';
import { TouchableOpacity, View, Modal, Text, Image } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../Services/firebaseConfig';
import { MenuPopUp } from './menuPopUp'
import { collection, getDocs, query, where } from "firebase/firestore";
import CommentsPopUp from '../Home/commentsPopUp';

export const ProfilePostCard = ({item}) => {
  const [like, setLike] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModal2, setVisibleModal2] = useState(false);
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

  console.log("aa",item)

  if (item.post ===''){
    undefined
  } else {
    if(item.postType === 'Avaliação'){
      return(
      <CardAvaliation>
        <UserInfo>

          <TouchableOpacity onPress={()=>( item.name === user.displayName ? navigation.navigate('Perfil') : navigation.navigate('userProfile', item)  )}>
            <UserImg source={{uri: userImg ? userImg : null}}/>
          </TouchableOpacity>

          <UserInfoText2>
            <TouchableOpacity onPress={()=>( item.name === user.displayName ? navigation.navigate('Perfil') : navigation.navigate('userProfile', item)   )}><UserName>{name}</UserName></TouchableOpacity>
            <PostTime>{item.postTime}</PostTime>
          </UserInfoText2>

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

          <Interaction onPress={() => setVisibleModal2(true)}>

            <FontAwesome style={{bottom: -3}} name='comment' size={25} color='#242E4E'/>
            <InteractionText>Comentarios</InteractionText>

            <Modal
              animationType='slide'
              visible={visibleModal2}
              transparent={true}
              onRequestClose={() => setVisibleModal2(false)}  
            >
              <CommentsPopUp
                handleClose={()=> setVisibleModal2(false)}
                handleOpen={'1'}
            />
            </Modal>
          </Interaction>
        </InteractionWrapper>
      </CardAvaliation>
      )
    }else{
    return (
      <View>
    { item.postType=='Cliente' ? 
    <Card>
      <UserInfo>
        <UserImg source={{uri: userImg ? userImg : null}}/>
        <UserInfoText>
          <View style={{flexDirection:'row', alignContent:'center', width: '100%', position:'relative'}}>

            <TouchableOpacity onPress={()=>(navigation.navigate('userProfile', item))}>
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

        <Interaction onPress={() => setVisibleModal2(true)}>
          <FontAwesome style={{bottom: -3}} name='comment' size={27} color='#242E4E'/>
          <InteractionText>Comentarios</InteractionText>
        </Interaction>

        <Modal
          animationType='slide'
          visible={visibleModal2}
          transparent={true}
          onRequestClose={() => setVisibleModal2(false)}  
        >
          <CommentsPopUp
            handleClose={()=> setVisibleModal2(false)}
            handleOpen={'1'}
          />
        </Modal>
      </InteractionWrapper>
    </Card>
    :
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

        <Interaction onPress={() => setVisibleModal2(true)}>
          <FontAwesome style={{bottom: -3}} name='comment' size={27} color='#242E4E'/>
          <InteractionText>Comentarios</InteractionText>

          <Modal
            animationType='slide'
            visible={visibleModal2}
            transparent={true}
            onRequestClose={() => setVisibleModal2(false)}  
          >
            <CommentsPopUp
              handleClose={()=> setVisibleModal2(false)}
              handleOpen={'1'}
            />
          </Modal>
        </Interaction>
      </InteractionWrapper>
    </CardWork>
    }
  </View>
    );
   }
   //else {
  //   <Card>
  //     <UserInfo>
  //       <UserImg source={{uri: userImg ? userImg : null}}/>
  //       <UserInfoText>
  //           <View style={{flexDirection:'row', alignContent:'center', width: '100%', position:'relative'}}>
  //               <TouchableOpacity onPress={()=>(  navigation.navigate('userProfile', item) )}>
  //                   <UserName>{name}</UserName>
  //               </TouchableOpacity>

  //           </View>
  //         <PostTime>{item.postTime}</PostTime>
  //       </UserInfoText>
  //     </UserInfo>

  //     <PostText>{item.post}</PostText>
  //     {item.postImage !== null ? <PostImage source={{ uri: item.postImage}} /> : <Divider />}
      
  //     <InteractionWrapper>
  //       <Interaction onPress={pressLike}>
  //         <AntDesign  style={{bottom: -1}} name={like===false ?'like2' : 'like1'} size={27} color='#242E4E'/>
  //         <InteractionText>Curtir</InteractionText>
  //       </Interaction>

  //       <Interaction >
  //         <FontAwesome style={{bottom: -3}} name='comment' size={27} color='#242E4E'/>
  //         <InteractionText>Comentarios</InteractionText>
  //       </Interaction>
  //     </InteractionWrapper>
  //   </Card>
  // }

  }}