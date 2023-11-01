import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, Image, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { Container } from './FeedStyle.js';
import { PostCard } from './PostCard.js';
import { collection, getDocs, orderBy, query, where} from "firebase/firestore";
import { db } from '../../../Services/firebaseConfig';
import { useBackHandler } from '@react-native-community/hooks';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'; 


export const Home = () => {
  const [posts, setPosts]=useState('')
  const [users, setUsers]=useState('')
  const list = [];
  const [visibleModal, setVisibleModal] = useState(false);
  const [filter, setFilter] = useState('');


  useBackHandler(() =>{
    if(1 == 1){
      return true
    }
  });
 
  const getPosts = async () => {



    if(filter===''){    
      try{

        const q = query(collection(db, 'posts'), orderBy('orderTime', 'desc'))
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const { comments, likes, post, postImage, postTime, userId, name, userImg, orderTime, postType } = doc.data();

          list.push({ 
            name,
            comments, 
            likes, 
            post, 
            postImage, 
            postTime, 
            userId,
            userImg,
            orderTime,
            postType,
            id: doc.id

          });
          
          setPosts(list);
          
        });

      } catch(e){
          console.log(e)
      }
    } else if(filter=== 'Diarista'){
      try{

        const q = query(collection(db, 'posts'), where('postType', '==', filter), orderBy('orderTime', 'desc'))
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const { comments, likes, post, postImage, postTime, userId, name, userImg, orderTime, postType } = doc.data();

          list.push({ 
            name,
            comments, 
            likes, 
            post, 
            postImage, 
            postTime, 
            userId,
            userImg,
            orderTime,
            postType,
            id: doc.id

          });
          
          setPosts(list);
          
        });

      } catch(e){
          console.log(e)
      }
    } else if(filter=== 'Eletricista'){
      try{

        const q = query(collection(db, 'posts'), where('postType', '==', filter), orderBy('orderTime', 'desc'))
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const { comments, likes, post, postImage, postTime, userId, name, userImg, orderTime, postType } = doc.data();

          list.push({ 
            name,
            comments, 
            likes, 
            post, 
            postImage, 
            postTime, 
            userId,
            userImg,
            orderTime,
            postType,
            id: doc.id

          });
          
          setPosts(list);
          
        });

      } catch(e){
          console.log(e)
      }
    } else if(filter=== 'Pedreiro'){
      try{

        const q = query(collection(db, 'posts'), where('postType', '==', filter), orderBy('orderTime', 'desc'))
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const { comments, likes, post, postImage, postTime, userId, name, userImg, orderTime, postType } = doc.data();

          list.push({ 
            name,
            comments, 
            likes, 
            post, 
            postImage, 
            postTime, 
            userId,
            userImg,
            orderTime,
            postType,
            id: doc.id

          });
          
          setPosts(list);
          
        });

      } catch(e){
          console.log(e)
      }
    } else if(filter=== 'Pintor'){
      try{

        const q = query(collection(db, 'posts'), where('postType', '==', filter), orderBy('orderTime', 'desc'))
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const { comments, likes, post, postImage, postTime, userId, name, userImg, orderTime, postType } = doc.data();

          list.push({ 
            name,
            comments, 
            likes, 
            post, 
            postImage, 
            postTime, 
            userId,
            userImg,
            orderTime,
            postType,
            id: doc.id

          });
          
          setPosts(list);
          
        });

      } catch(e){
          console.log(e)
      }
    } else if(filter=== 'Montador'){
      try{

        const q = query(collection(db, 'posts'), where('postType', '==', filter), orderBy('orderTime', 'desc'))
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const { comments, likes, post, postImage, postTime, userId, name, userImg, orderTime, postType } = doc.data();

          list.push({ 
            name,
            comments, 
            likes, 
            post, 
            postImage, 
            postTime, 
            userId,
            userImg,
            orderTime,
            postType,
            id: doc.id

          });
          
          setPosts(list);
          
        });

      } catch(e){
          console.log(e)
      }
    } else if(filter=== 'Outros'){
      try{

        const q = query(collection(db, 'posts'), where('postType', '==', filter), orderBy('orderTime', 'desc'))
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const { comments, likes, post, postImage, postTime, userId, name, userImg, orderTime, postType } = doc.data();

          list.push({ 
            name,
            comments, 
            likes, 
            post, 
            postImage, 
            postTime, 
            userId,
            userImg,
            orderTime,
            postType,
            id: doc.id

          });
          
          setPosts(list);
          
        });

      } catch(e){
          console.log(e)
      }
    }
  }

  useEffect(() => {
    getPosts()   
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(()=>{
 
      getPosts(...posts)   
      }, 2000)
   setRefreshing(false);
  };


  function renderItem({ item } ) {
    return <PostCard item={item}/>
  }

  const Diarista = ({handleClose, handleOpen}) => {

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}> 
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>Filtrar Publicações por profissões: </Text>
          </View>
  
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.btnWorks} onPress={handleClose} onPressIn={() => (setFilter(''))} onPressOut={onRefresh}> 
              <Text style={styles.txtBtnWorks}>Todos</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.btnWorks} onPress={handleClose} onPressIn={() => (setFilter('Diarista'))} onPressOut={onRefresh}> 
              <Text style={styles.txtBtnWorks}>Diarista</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWorks} onPress={handleClose} onPressIn={() => (setFilter('Eletricista'))} onPressOut={onRefresh}> 
              <Text style={styles.txtBtnWorks}>Eletricista</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.btnWorks} onPress={handleClose} onPressIn={() => (setFilter('Pedreiro'))} onPressOut={onRefresh}> 
              <Text style={styles.txtBtnWorks}>Pedreiro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWorks} onPress={handleClose} onPressIn={() => (setFilter('Pintor'))} onPressOut={onRefresh}> 
              <Text style={styles.txtBtnWorks}>Pintor</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.btnWorks} onPress={handleClose} onPressIn={() => (setFilter('Montador'))} onPressOut={onRefresh}> 
              <Text style={styles.txtBtnWorks}>Montador</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnWorks} onPress={handleClose} onPressIn={() => (setFilter('Outros'))} onPressOut={onRefresh}> 
              <Text style={styles.txtBtnWorks}>Outros</Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (

    <Container>

      <View
        style={{
          position: 'absolute',
          zIndex: 99,
          width: '120%',
          height: '10.5%',
          padding: 10,
          backgroundColor: "#2C8AD8",
          alignItems: 'center',
          justifyContent:'space-between',
          flexDirection: 'row',
          overflow: 'hidden'
        }}> 
          <Text>Da Um Help!</Text>
          <TouchableOpacity onPress={() => setVisibleModal(true)}>
            <Ionicons name="md-reorder-three-outline" size={36} color="white" style={{marginRight:10}}/>
          </TouchableOpacity>
          <Modal
                animationType='fade'
                visible={visibleModal}
                transparent={true}
                onRequestClose={() => setVisibleModal(false)}  
            >
                <Diarista
                    handleClose={()=> setVisibleModal(false)}
                    handleOpen={'1'}
                    />
            </Modal>
      </View>

      <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item=> item.id}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          style={{width: "105%", marginTop: 100}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          refreshing={refreshing} 
        />
    </Container>
   
  );
}

export default Home;




const styles = StyleSheet.create({
  container:{
    flex: 1,

  },

  content:{
    zIndex: 99,
    backgroundColor: "#8BD7F3",
    borderRadius: 20,
    marginTop: 120,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#2C8AD8',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    height:'70%',
    position:'absolute',
  
    top:1
  },
  containerTxt:{
    alignItems:'center',
    justifyContent:'center',
    padding: 15
  },

  txt:{
    fontSize:18,
    fontWeight:'bold',
    color: "#fff",
    
  },

  containerButton:{
    justifyContent:'center',
    alignItems: 'center'
  },

  txtBtnWorks:{
    fontSize: 15,
    fontWeight:'bold',
    color: "#fff",

  },
  btnWorks:{
    margin: 5,
    width: '70%',
    height: '10%',
    padding: 8,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    borderWidth: 0.8,
    borderColor: "#fff",
    // backgroundColor: '#2C8AD8'
  },
 
});