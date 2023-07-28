import React from 'react';
import { FlatList } from 'react-native';
import { Container } from './FeedStyle.js';
import { PostCard } from './PostCard.js';

const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../../assets/faxineiro.jpg'),
    postTime: '4 mins ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/faxineiro.jpg'),
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../../../assets/faxineiro.jpg'),
    postTime: '2 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../../../assets/faxineiro.jpg'),
    postTime: '1 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/faxineiro.jpg'),
    likes: '1',
    comments: '0',
  }
]

const Home = () => {
 
  return (
    <Container>
      <FlatList
        data={Posts}
        renderItem={({item}) => <PostCard item={item}/>}
        keyExtractor={item=> item.id}
        showsVerticalScrollIndicator={false}
        style={{width: "105%"}}
      />
    </Container>
  );
}

export default Home;

