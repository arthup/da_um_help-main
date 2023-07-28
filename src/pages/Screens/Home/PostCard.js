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
    return (
        <Card>
          <UserInfo>
            <UserImg source={item.userImg}/>
            <UserInfoText>
              <UserName>{item.userName}</UserName>
              <PostTime>{item.postTime}</PostTime>
            </UserInfoText>
          </UserInfo>
  
          <PostText>{item.post}</PostText>
          {item.postImg !== 'none' ? <PostImage source={ item.postImg } /> : <Divider />}
          
  
          <InteractionWrapper>
  
            <Interaction onPress={pressLike}>
              <AntDesign  name={like===false ?'like2' : 'like1'} size={30} color='black'/>
              <InteractionText>Curtir</InteractionText>
            </Interaction>
  
            <Interaction >
              <FontAwesome  name='comment' size={30} color='black'/>
              <InteractionText>Comentarios</InteractionText>
            </Interaction>
  
          </InteractionWrapper>
        </Card>
    );
  }