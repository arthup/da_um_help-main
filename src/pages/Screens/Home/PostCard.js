import React, { useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostImage, PostText, Interaction, InteractionText, InteractionWrapper, Divider } from './FeedStyle';


export const PostCard = ({item}) => {
  
  const [like, setLike] = useState(false);

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
    return (
        <Card>
          <UserInfo>
            <UserImg source={{uri: item.userImg}}/>
            <UserInfoText>
              <UserName>{item.name}</UserName>
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
  }}

  