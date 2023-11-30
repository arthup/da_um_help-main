import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, Image, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { Container } from './FeedStyle.js';
import { PostCard } from './PostCard.js';
import { collection, getDocs, orderBy, query, where} from "firebase/firestore";
import { db } from '../../../Services/firebaseConfig';
import { useBackHandler } from '@react-native-community/hooks';
import { Ionicons } from '@expo/vector-icons'; 

export const Home = () => {
  const [posts, setPosts]=useState('');
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
          const { comments, likes, post, postImage, postTime, userId, name, userImg, rating,orderTime, postType } = doc.data();
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
            rating,
            postType,
            id: doc.id
          });
          setPosts(list);
        });
      } catch(e){
          console.log(e)
      }
    } else{
      try{
        const q = query(collection(db, 'posts'), where('postType', '==', filter), orderBy('orderTime', 'desc'))
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const { comments, likes, post, postImage, postTime, userId, name, userImg, orderTime, rating,postType } = doc.data();
          list.push({ 
            name,
            comments, 
            likes, 
            post, 
            postImage, 
            postTime, 
            userId,
            rating,
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


  function renderItem({ item } ) { return <PostCard item={item}/> }

  const Diarista = ({handleClose, handleOpen}) => {

    const controller = (teste) =>{
      onRefresh()
      handleClose()
    }

  const cor = StyleSheet.create({
    btnWorksSelect:{
      margin: 5,
      width: '70%',
      height: '9%',
      padding: 8,
      borderRadius: 15,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      borderWidth: 0.8,
      borderColor: "#2C8AD8",
      backgroundColor: "#2C8AD8"
    },

    btnWorks:{
      margin: 5,
      width: '70%',
      height: '9%',
      padding: 8,
      borderRadius: 15,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      borderWidth: 0.8,
      borderColor: '#8BD7F3',
      backgroundColor: "#8BDDF351"
    },
  });

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}> 
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>Filtre as publicações pela profissão: </Text>
          </View>
  
          <View style={styles.containerButton}>
            <TouchableOpacity style={filter==='' ? cor.btnWorksSelect : cor.btnWorks} onPress={() => setFilter('')} > 
              <Text style={styles.txtBtnWorks}>Todos</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={filter==='Diarista'  ? cor.btnWorksSelect : cor.btnWorks} onPress={() =>(setFilter('Diarista'))}> 
              <Text style={styles.txtBtnWorks}>Diarista</Text>
            </TouchableOpacity>
            <TouchableOpacity style={filter==='Eletricista' ? cor.btnWorksSelect : cor.btnWorks} onPress={() => (setFilter('Eletricista'))}> 
              <Text style={styles.txtBtnWorks}>Eletricista</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={filter==='Pedreiro' ? cor.btnWorksSelect : cor.btnWorks} onPress={() => (setFilter('Pedreiro'))}> 
              <Text style={styles.txtBtnWorks}>Pedreiro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={filter==='Pintor' ? cor.btnWorksSelect : cor.btnWorks} onPress={()=> setFilter('Pintor')}> 
              <Text style={styles.txtBtnWorks}>Pintor</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={filter==='Montador' ? cor.btnWorksSelect : cor.btnWorks} onPress={() =>(setFilter('Montador'))}> 
              <Text style={styles.txtBtnWorks}>Montador</Text>
            </TouchableOpacity>

            <TouchableOpacity style={filter==='Outros' ? cor.btnWorksSelect : cor.btnWorks} onPressIn={() =>(setFilter('Outros'))}> 
              <Text style={styles.txtBtnWorks}>Outros</Text>
            </TouchableOpacity>

            <TouchableOpacity style={filter==='Avaliação' ? cor.btnWorksSelect : cor.btnWorks} onPressIn={() =>(setFilter('Avaliação'))}> 
              <Text style={styles.txtBtnWorks}>Avaliações</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{height:"12%", justifyContent: "center"}} onPress={controller}> 
              <Text style={{fontSize: 20, fontWeight:'bold', color: "#fff"}}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Container>
      <View style={styles.containerHeader}>

        <Image source={require('../../../assets/IconeTelaHome2.jpg')} style={{ width:'12%', height:'85%'}}/> 

          <Text style={styles.textHeader}>Dá um Help!</Text>

          <View>
            <TouchableOpacity onPress={() => setVisibleModal(true)}>
              <Ionicons name="md-reorder-three-outline" size={36} color="white"/>
            </TouchableOpacity>

            <Modal
              animationType='fade'
              visible={visibleModal}
              transparent={true}
              onRequestClose={() => setVisibleModal(false)}  
            >
              <Diarista
                handleClose={()=> setVisibleModal(false)}
              />
            </Modal>
          </View>
      </View>

      <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item=> item.id}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}
          style={{width: "105%", marginTop: '19%'}}
          refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> } refreshing={refreshing} 
        />
    </Container>
  );
}

export default Home;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#000202E3"
  },

  textHeader:{
    fontSize:18,
    color: 'white',
    fontWeight: 'bold', 
  },

  containerHeader:{
    position: 'absolute',
    zIndex: 99,
    width: '140%',
    height: '10%',
    padding: 10,
    backgroundColor: "#2C8AD8",
    alignItems: 'center',
    justifyContent:'space-around',
    flexDirection: 'row',
    overflow: 'hidden',
  },

  content:{
    zIndex: 99,
    borderRadius: 20,
    marginTop: 70,
    padding: 8,

    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    height:'85%',
    position:'absolute',
    top:1
  },

  containerTxt:{
    alignItems:'center',
    justifyContent:'center',
    marginBottom: "6%",
    width: "100%",
  },

  txt:{
    fontSize:20,
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
});