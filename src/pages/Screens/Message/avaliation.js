import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, StatusBar, TouchableWithoutFeedback, Image, Keyboard, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, auth, db } from '../../../Services/firebaseConfig';
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { Ionicons, AntDesign, Feather  } from '@expo/vector-icons';
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore"; 
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const Avalition = (ID) => {
  const [image, setImage] = useState(null);
  const [cliente, setCliente] = useState(false);
  const [trabalhador, setTrabalhador] = useState(false);
  const [avaliacao, setAvaliacao] = useState(false);
  const [rating, setRanting] = useState('');
  const [value, setValue] = useState('');
  const trabalhos = ["Diarista", "Eletricista", "Pedreiro", "Pintor", "Montador", "Outros"];
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [cargo, setCargo] = useState('');
  const user = auth.currentUser;
  const date = moment().utcOffset('-03:00').format('DD/MM/YYYY HH:mm:ss');
  const userUpdate = doc(db, "users", user.uid);
  const navigation = useNavigation();
  

  console.log(ID.route.params)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64:true,
      aspect: [4,3],
      quality: 1,
      allowsMultipleSelection: true,
    });
    const source = result.assets[0].uri
    setImage(source)
  }; 
  
  const submitData = async () =>{

    const metadata = {
      contentType: 'image/jpeg',
    };

    if (image !== null){
        const getBlobFroUri = async (uri) => {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", image, true);
                xhr.send(null);
            });         
            return blob;
        };
    
        const imageBlob = await getBlobFroUri(image);
        const storageRef = ref(storage, 'image/' + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, imageBlob, metadata);

        uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
    
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                break;
    
                case 'running':
                    console.log('Upload is running');
                    if (progress===100){
                        Alert.alert('concluido');
                        navigation.navigate('Home')
                    }
                break; 
            }
        }, 
        (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                break;
                case 'storage/canceled':
                break;
                case 'storage/unknown':
                break;
            }
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                try {
                    const docRef = addDoc(collection(db, "posts"), {
                        name: user.displayName,
                        userId:user.uid,
                        userImg: user.photoURL,
                        post: value,
                        postImage: downloadURL,
                        postTime: date,
                        likes: null,
                        comments: null,
                        postType: 'Avaliação',
                        rating: rating,
                        orderTime: Date.now()
                    });
                        console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                      }
                    });
                  }
                ); 
              } else {
                try {
                  const docRef = addDoc(collection(db, "posts"), {
                    userId:user.uid,
                    name: user.displayName,
                    userImg: user.photoURL,
                    post: value,
                    postImage: null,
                    postTime: date,
                    likes: null,
                    comments: null,
                    postType: 'Avaliação',
                    rating: rating,
                    orderTime: Date.now()
                    
                  });
                  console.log("Document written with ID: ", docRef.id);
                
                  navigation.navigate('Dá um Help!')
               
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              
            } 
            
          }


const RatingBar = () => {
  return (
    <View style={styles.ratingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item) + setRanting(item)}>
            <Image
              style={styles.starImageStyle}
              source={
                item <= defaultRating
                  ? require('../../../assets/star_cheia.png')
                  : require('../../../assets/star_vazia.png')
              }
            />
          </TouchableOpacity>
          
        );
      })}
      
    </View>
  );
};

const deletPost = async () =>{
    await deleteDoc(doc(db, "request", ID.route.params));
  }
 

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <SafeAreaView  style={styles.backColor}>
        
          <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>

          <View>
            <Text style={styles.textHeader}>Avalie o trabalho realizado!</Text>
          </View>

          <View style={styles.container}>

            <View>
                <RatingBar/>
              <View style={styles.containerTextArea}>
                <TextInput   
                  multiline
                  numberOfLines= {20}
                  maxLength={280}
                  onChangeText={text => setValue(text)}
                  value={value}
                  style={styles.textArea}
                  placeholder='Do que você está precisando?'
                />
              </View>
              
              <View style={styles.buttonPickImage}>
                
                <Text style={styles.textButtonImage}>Adicione uma imagem:</Text>
                <TouchableOpacity onPress={pickImage}>
                  <Ionicons name="md-images-outline" size={24} color="#A2ACC3" />
                </TouchableOpacity>
              </View>
            </View>
            
          
            <View style={styles.containerImage}>
              {image && <Image source={{uri:image}} style={styles.imagePost}/>} 
            </View>     

            <View style={styles.containerButtonUpload}>
              <TouchableOpacity style={styles.buttonUpload} onPress={submitData} onPressIn={deletPost}>
                <Text style={styles.btnUploadText}>Postar</Text>
                </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
    
  );
  }

export default Avalition;

const styles = StyleSheet.create({
  backColor:{
    backgroundColor: "#2C8AD8",
    height:900,
    width:'100%'
  
  },

  container:{
    marginTop: 30,
    backgroundColor: "#f8f8f8",
    height:'100%',
    width:'100%'

  }, 

  containerImage:{
    alignItems: 'center',
    width: '60%',
    height: '20%',
    alignSelf: 'center',
    marginTop: -48
  },

  imagePost:{
    width: '140%', 
    height: '140%', 
    borderRadius: 20
  },

  textArea:{
    padding: 5,
    textAlign: 'justify',
    fontSize: 18,
    textAlignVertical: 'top',
  },

  containerButtonUpload:{
    marginTop: '30%',
  },

  buttonUpload:{
    alignItems: 'center',
    height: "26%",
    backgroundColor: "#2C8AD8",
    width: '80%',
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'center',
  },

  textButtonImage:{
    color: '#A2ACC3',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    marginRight: '40%',
    paddingStart: '5%',
  },

  buttonPickImage:{
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '15%',
    width: '95%',
    flexDirection: 'row',
    marginBottom: 25,
  },

  btnUploadText:{
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 'bold',
  },    
  
  textHeader:{  
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 0,
    marginLeft: 20,
  },

  containerSelection:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15
    },

  buttonSelection:{
    backgroundColor: '#A2ACC3',
    borderRadius: 100,
    width:110,
    alignItems:'center',
    height: 30,
    justifyContent:'center',
    marginTop:10
   
  },

  buttonSelectionClient:{
    backgroundColor: '#242E4E',
    borderRadius: 100,
    width:110,
    alignItems:'center',
    height: 30,
    justifyContent:'center',
    marginTop:10
  },

  buttonSelectionWorker:{
    backgroundColor: '#193ef7',
    borderRadius: 100,
    width:110,
    alignItems:'center',
    height: 30,
    justifyContent:'center',
    marginTop:10
   
  },

  buttonSelectionAvaliantion:{
    backgroundColor: 'yellow',
    borderRadius: 100,
    width:110,
    alignItems:'center',
    height: 30,
    justifyContent:'center',
    marginTop:10
   
  },
  textSelection:{
    fontSize: 15,
    fontWeight:'bold',
    color:'white'
  },

  selectBar:{
    width: '60%',
    height:'100%',
    borderWidth:1,
    borderRadius: 10,
    backgroundColor: 'pink'
  },

  containerSelectBar:{
    justifyContent: 'center',
    alignItems:'center',
    width:'100%',
    height:'10%',
    marginTop:10
  },

  starImageStyle:{
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },

  ratingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },

  txtInputNameWorker:{
    borderBottomWidth: 1,
    height: '100%',
    width:  '80%',
    fontSize: 16,
    marginTop: 10
  },

  containerTxtInputNameWorker:{
    width: '100%',
    height: 60,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center'
  },

  containerTextArea:{   
    marginTop: 40,
    height: 200,
    padding: 5,
    backgroundColor: 'white',
    borderColor:'#ffd700',
    borderWidth: 1,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
  },

  txtNameWorker:{
    fontSize: 15,
    color: '#A2ACC3',
    fontWeight:'bold',
    marginTop: 30,
  }

});