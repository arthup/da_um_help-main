import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, StatusBar, TouchableWithoutFeedback, Image, Keyboard, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, auth, db } from '../../../Services/firebaseConfig';
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { Ionicons, Feather  } from '@expo/vector-icons';
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore"; 
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

const Avalition = (ID) => {
  const [image, setImage] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [rating, setRanting] = useState('');
  const [value, setValue] = useState('');
  const trabalhos = ["Diarista", "Eletricista", "Pedreiro", "Pintor", "Montador", "Outros"];
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const user = auth.currentUser;
  const date = moment().utcOffset('-03:00').format('DD/MM/YYYY HH:mm:ss');
  const userUpdate = doc(db, "users", user.uid);
  const navigation = useNavigation();
  
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
            setProgressBar(progress)
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                break;
    
                case 'running':
                    console.log('Upload is running');
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
                        orderTime: Date.now(),
                        requestUserId: ID.route.params.a1
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
                    orderTime: Date.now(),
                    requestUserId: ID.route.params.a1
                  });
                  console.log("Document written with ID: ", docRef.id);
                
                  navigation.navigate('Screens');
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              
            } 
            deletPost()
          }

console.log(ID.route.params.a1)
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
    await deleteDoc(doc(db, "request", ID.route.params.a2));
  }
 

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView  style={styles.container}>
          <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>

          <View style={styles.containerHeader}>
            <TouchableOpacity style={styles.iconVoltar} onPress={()=>(navigation.navigate('Mensagem'))}>
              <Feather name="arrow-left" size={35} color="white" />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Avalie o Trabalho!</Text>
          </View>

          <View style={styles.containerForm}>

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

            <Modal
              animationType='none'
              visible={visibleModal}
              transparent={true}
              onRequestClose={() => setVisibleModal(false)}  
            >
              <SafeAreaView style={styles.containerModal}>

                <View style={styles.containerProgressBar}>
                  <Progress.Circle progress={progressBar===0 ? 0 : progressBar } indeterminate={false} size={200} showsText={true} textStyle={{fontSize: 25, color: '#d6e9ff'}} color={'#d6e9ff'}/>
                </View>

                <TouchableOpacity style={styles.buttonModal} onPressIn={() => setVisibleModal(false) + navigation.navigate('Screens')} disabled={progressBar === 100 ? false : true}>
                  <Text style={styles.buttonTextModal}>Concluir</Text>
                </TouchableOpacity>
              </SafeAreaView>
            </Modal>     

            <View style={styles.containerButtonUpload}>
              <TouchableOpacity style={styles.buttonUpload} onPress={submitData} onPressIn={() => setVisibleModal(true)}>
                <Text style={styles.btnUploadText}>Postar</Text>
                </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
export default Avalition;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#2C8AD8",
  },

  containerHeader: {
    flexDirection: "row",
    width: "100%",
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },

  containerModal:{
    height: '100%',
    width:'100%',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#000202CF',
    alignContent:'center',
  },

  buttonModal:{
    backgroundColor:"#d6e9ff",
    width: '80%',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    bottom:'-18%'
  },

  buttonTextModal:{
    color: "#5A6687",
    fontSize: 15,
    fontWeight: 'bold', 
  },

  containerForm: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f8f8f8",
    flex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  buttonSelectionStyle:{
    marginTop: 2,
    borderRadius: 15,
    backgroundColor: "#8BD7F3",
    borderColor: '#8BD7F3',
  },

  selectedRowStyle:{
    backgroundColor: "#193ef7",
    borderColor: "#193ef7",
    borderWidth: 1
  },

  textArea:{
    padding: 5,
    textAlign: 'justify',
    fontSize: 18,
    textAlignVertical: 'top',
  },

  buttonPickImage: {
    alignItems: "center",
    justifyContent: "space-between",
    width: '95%',
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 23
  },

  textButtonImage:{
    color: '#A2ACC3',
    fontWeight: 'bold',
    fontSize: 15,

  },

  containerImage:{
    alignItems: 'center',
    width: '60%',
    height: "20%",
    alignSelf: 'center',
    marginTop: 20
  },

  imagePost:{
    width: '100%', 
    height: '100%', 
    borderRadius: 20
  },

  containerButtonUpload:{
    marginTop: "8%"
  },

  buttonUpload:{
    alignItems: 'center',
    height: "28%",
    backgroundColor: "#2C8AD8",
    width: '80%',
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'center',
  },

  btnUploadText:{
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 'bold',
  },   

  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
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
});