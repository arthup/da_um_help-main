import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, StatusBar, TouchableWithoutFeedback, Image, Keyboard, Alert, ScrollView, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, auth, db } from '../../../Services/firebaseConfig';
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { collection, addDoc } from "firebase/firestore"; 
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import * as Progress from 'react-native-progress';

const NewPost = () => {
  const navigation = useNavigation('');
  const [image, setImage] = useState(null);
  const [cliente, setCliente] = useState(false);
  const [trabalhador, setTrabalhador] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [value, setValue] = useState('');
  const trabalhos = ["Diarista", "Eletricista", "Pedreiro", "Pintor", "Montador", "Outros"];
  const [progressBar, setProgressBar] = useState(0);
  const [cargo, setCargo] = useState('');
  const user = auth.currentUser;
  const date = moment().utcOffset('-03:00').format('DD/MM/YYYY HH:mm:ss');

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

    if(cliente === false && trabalhador === false){
      Alert.alert('Escolha uma Categoria')
    } else{
      if(cliente===true){
        if(value===''){
          Alert.alert('Caixa de Texto Vazia')
        } else{
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
                      postType: 'Cliente',
                      orderTime: Date.now()
                    });
                    console.log("Document written with ID: ", docRef.id);
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
                });
              }
            ); 
          } else{
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
                postType: 'Cliente',
                orderTime: Date.now()
              });
              console.log("Document written with ID: ", docRef.id);
              console.log(image);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
        }
      } else if(trabalhador===true){ 
        if(cargo === ''){
          Alert.alert('ESCOLHA UMA PROFISSÃO')
        } else{
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
                        postType: cargo,
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
                  postType: cargo,
                  orderTime: Date.now()
                });
                console.log("Document written with ID: ", docRef.id);
                console.log(image);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }}
      }
    }
    setValue('')
    setImage(null)

  };

    const icone = () =>{ return <AntDesign name="caretdown" size={15} color="#A2ACC3" /> }
    
    const cor = StyleSheet.create({
      cor:{
        marginTop: 40,
        height: 200,
        padding: 5,
        backgroundColor: 'white',
        borderColor:cliente===true ? '#242E4E' : trabalhador===true ? '#193ef7' : 'black',
        borderWidth: 1,
        borderRadius: 20,
        width: '90%',
      alignSelf: 'center',
    }
  }
);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>

          <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Crie sua Postagem</Text>
          </View>


          <View style={styles.containerForm}>

              <View style={styles.containerSelection}>
                <View>
                  <TouchableOpacity style={cliente === true ? styles.buttonSelectionClient : styles.buttonSelection} onPress={()=> (setCliente(true) + setTrabalhador(false) + setCargo(''))}>
                    <Text style={styles.textSelection}>Cliente</Text>
                  </TouchableOpacity>                   
                </View>

                <View>
                  <TouchableOpacity TouchableOpacity style={trabalhador === true ? styles.buttonSelectionWorker : styles.buttonSelection}  onPress={()=> (setTrabalhador(true) + setCliente(false))}>
                    {cargo === '' && trabalhador === true? Alert.alert('Escolha uma profissão'):undefined}
                      <Text style={styles.textSelection}>Trabalhador</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {trabalhador === true ?
                <View style={styles.containerSelectBar}>
                  <SelectDropdown
                    rowStyle={styles.buttonSelectionStyle}
                    
                    selectedRowStyle={styles.selectedRowStyle}
                    rowTextStyle={styles.textStyle}
                    selectedRowTextStyle={styles.textStyle}
                    buttonStyle={styles.selectBar}
                    buttonTextStyle={styles.textSelectBar}
                    
                    // buttonTextStyle={styles.textButtonImage}
                    defaultButtonText='Selecione uma Profissão' 
                    dropdownIconPosition='right'
                    renderDropdownIcon={icone}
                    dropdownStyle={{ backgroundColor:'transparent', height: "auto"}}
                    data={trabalhos}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                      setCargo(selectedItem)
                    }}

                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem
                      }
                    }

                    rowTextForSelection={(item, index) => {
                      return item
                      }
                    }
                  />
                </View>: undefined}

              <View style={cor.cor}>
                <TextInput   
                  multiline
                  numberOfLines= {20}
                  maxLength={280}
                  onChangeText={text => setValue(text)}
                  value={value}
                  style={styles.textArea}
                  placeholder='Do que você está precisando?'
                  placeholderTextColor={"#A2ACC3"}
                />
              </View>

              <View style={styles.buttonPickImage}>
                <Text style={styles.textButtonImage}>Adicione uma imagem:</Text>
                <TouchableOpacity onPress={pickImage}>
                  <Ionicons name="images" size={24} color="#8BD7F3" />
                </TouchableOpacity>
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

                <TouchableOpacity style={styles.buttonModal} onPressIn={() => setVisibleModal(false) + navigation.navigate('Dá um Help!')} disabled={progressBar === 100 ? false : true}>
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

export default NewPost;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: "#2C8AD8",
  },

  containerHeader: {
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

  containerProgressBar:{
    width:'90%',
    justifyContent:'center',
    alignItems: 'center'
  },

  progressBar:{
    marginTop: 10,
    height: 30,
    width: '100%'
  },

  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },

  containerForm: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f8f8f8",
    flex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  containerSelection: {
    flexDirection:'row',
    justifyContent: "space-around",
    marginBottom: 15,
  },

  buttonSelection:{
    borderRadius: 100,
    width: 130,
    alignItems:'center',
    height: 40,
    justifyContent:'center',
    marginTop:10,
    backgroundColor: "#8BD7F3",
    borderColor: "#d6e9ff",
    borderWidth: 1
  },

  buttonSelectionClient:{
    backgroundColor: '#242E4E',
    borderRadius: 100,
    width:130,
    alignItems:'center',
    height: 40,
    justifyContent:'center',
    marginTop:10,
    borderColor: "#d6e9ff",
    borderWidth: 1
  },

  buttonSelectionWorker:{
    backgroundColor: '#193ef7',
    borderRadius: 100,
    width:130,
    alignItems:'center',
    height: 40,
    justifyContent:'center',
    marginTop:10,
    borderColor: "#d6e9ff",
    borderWidth: 1
  },

  textSelection: {
    fontSize: 15,
    fontWeight:'bold',
    color:'white'
  },

  containerSelectBar: {
    justifyContent: 'center',
    alignItems:'center',
    width:'100%',
    marginTop: 10,

  },

  selectBar:{
    backgroundColor: '#f8f8f8',
    width: "65%"
  },

  textSelectBar: {
    fontSize: 18,
    fontWeight:'bold',
    color:'#A2ACC3',
    marginTop: 8
  },

  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#fff',
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
});