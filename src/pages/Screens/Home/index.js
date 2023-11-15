import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Text, Image, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { Container } from './FeedStyle.js';
import { PostCard } from './PostCard.js';
import { collection, getDocs, orderBy, query, where} from "firebase/firestore";
import { db } from '../../../Services/firebaseConfig';
import { useBackHandler } from '@react-native-community/hooks';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'; 


export const Home = () => {
  const [posts, setPosts]=useState('');
  const [users, setUsers]=useState('');
  const list = [];
  const [todos, setTodos] = useState(true);
  const [diarista, setDiarista] = useState(false);
  const [eletricista, setEletricista] = useState(false);
  const [pedreiro, setPedreiro] = useState(false);
  const [pintor, setPintor] = useState(false);
  const [montador, setMontador] = useState(false);
  const [outros, setOutros] = useState(false);
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

    const controller = () =>{
      handleClose()
      onRefresh()
    }



  const cor = StyleSheet.create({
    btnWorksSelect:{
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
      backgroundColor: '#2C8AD8' 
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
    },
   
  });

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}> 
          <View style={styles.containerTxt}>
            <Text style={styles.txt}>Filtrar Publicações por profissões: </Text>
          </View>
  
          <View style={styles.containerButton}>
            <TouchableOpacity style={todos ? cor.btnWorksSelect : cor.btnWorks} onPress={controller} onPressIn={() => (setFilter('') + setTodos(true) + setDiarista(false) + setEletricista(false) + setOutros(false) + setPedreiro(false) + setPintor(false) + setMontador(false))}> 
              <Text style={styles.txtBtnWorks}>Todos</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={diarista ? cor.btnWorksSelect : cor.btnWorks} onPress={controller} onPressIn={() => (setFilter('Diarista') + setTodos(false) + setDiarista(true) + setEletricista(false) + setOutros(false) + setPedreiro(false) + setPintor(false) + setMontador(false))}> 
              <Text style={styles.txtBtnWorks}>Diarista</Text>
            </TouchableOpacity>
            <TouchableOpacity style={eletricista ? cor.btnWorksSelect : cor.btnWorks} onPress={controller} onPressIn={() => (setFilter('Eletricita') + setTodos(false) + setDiarista(false) + setEletricista(true) + setOutros(false) + setPedreiro(false) + setPintor(false) + setMontador(false))}> 
              <Text style={styles.txtBtnWorks}>Eletricista</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={pedreiro ? cor.btnWorksSelect : cor.btnWorks} onPress={controller} onPressIn={() => (setFilter('Pedreiro') + setTodos(false) + setDiarista(false) + setEletricista(false) + setOutros(false) + setPedreiro(true) + setPintor(false) + setMontador(false))}> 
              <Text style={styles.txtBtnWorks}>Pedreiro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={pintor ? cor.btnWorksSelect : cor.btnWorks} onPress={controller} onPressIn={() => (setFilter('Pintor') + setTodos(false) + setDiarista(false) + setEletricista(false) + setOutros(false) + setPedreiro(false) + setPintor(true) + setMontador(false))}> 
              <Text style={styles.txtBtnWorks}>Pintor</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={montador ? cor.btnWorksSelect : cor.btnWorks} onPress={controller} onPressIn={() =>(setFilter('Montador') + setTodos(false) + setDiarista(false) + setEletricista(false) + setOutros(false) + setPedreiro(false) + setPintor(false) + setMontador(true))}> 
              <Text style={styles.txtBtnWorks}>Montador</Text>
            </TouchableOpacity>

            <TouchableOpacity style={outros ? cor.btnWorksSelect : cor.btnWorks} onPress={controller} onPressIn={() =>(setFilter('Outros') + setTodos(false) + setDiarista(false) + setEletricista(false) + setOutros(true) + setPedreiro(false) + setPintor(false) + setMontador(false))}> 
              <Text style={styles.txtBtnWorks}>Outros</Text>
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
                handleOpen={'1'}
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

});