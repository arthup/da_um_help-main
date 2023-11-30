import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, Modal, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { storage, auth, db } from '../../Services/firebaseConfig';
import { updateDoc, doc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import {ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { updateProfile } from "firebase/auth"; 
import * as Progress from 'react-native-progress';

const Imag = () => {
  const navigation = useNavigation('');
  const [imageProfile, setImageProfile] = useState(null);
  const [imageBackground, setImageBackground] = useState(null);
  const user = auth.currentUser;
  const userUpdate = doc(db, "users", user.uid);
  const [value, setValue] = useState('');
  const [progressBarBackground, setProgressBarBackground] = useState(0);
  const [progressBarProfile, setProgressBarProfile] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);

  const pickProfileImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64:true,
      aspect: [4,3],
      quality: 1
    });

    const source = result.assets[0].uri;
    setImageProfile(source);
  };

  const pickBackgroundImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64:true,
      aspect: [4,3],
      quality: 1
  });

    const source = result.assets[0].uri;
    setImageBackground(source);
  }; 

  const submitData = async () =>{
    const metadata = {
      contentType: 'image/jpeg',
    };

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
        xhr.open("GET", imageProfile, true);
        xhr.send(null);
      });

      return blob;
    };

    const getBlobFroUri2 = async (uri) => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", imageBackground, true);
        xhr.send(null);
      });
      return blob;
    };

    const storageRefProfile = ref(storage, 'imageProfile/' + Date.now());
    const storageRefBackground = ref(storage, 'imageBack/' + Date.now());
    const imageBlobProfile = await getBlobFroUri(imageProfile);
    const imageBlobBackground = await getBlobFroUri2(imageBackground);
    const uploadTaskBackground = uploadBytesResumable(storageRefBackground, imageBlobBackground, metadata);
    const uploadTaskProfile = uploadBytesResumable(storageRefProfile, imageBlobProfile, metadata);
  
    uploadTaskProfile.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgressBarBackground(progress)
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
        getDownloadURL(uploadTaskProfile.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          try {
            updateProfile(auth.currentUser, {
              photoURL: downloadURL
            })
            updateDoc(userUpdate, {
              userImg: downloadURL
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }
    );

    uploadTaskBackground.on( 'state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setProgressBarProfile(progress)
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running2');
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
      getDownloadURL(uploadTaskBackground.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
  
      try {
        updateDoc(userUpdate, {
          userBackgroundImg: downloadURL,
          bio: value
        });
          console.log('funfou')
          
      } catch (e) {
        console.error("Error adding document: ", e);
      }})
    });
  }
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>

      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>Adicione sua Foto e Bio</Text> 
      </View>
      
      <View style={styles.containerInfoProfile}>

        <View style={{borderBottomWidth: 1, borderColor: "#A2ACC3"}}>
          <TouchableOpacity onPress={pickBackgroundImg}>
            {imageBackground===null ? <Image source={require('../../assets/png.jpg')} style={styles.backgroundImage}/> : <Image source={{uri:imageBackground}} style={styles.backgroundImage}/>}
          </TouchableOpacity>
        </View>

        <View style={styles.containerPerfil}>
          <TouchableOpacity onPress={pickProfileImg}>
            {imageProfile===null ? <Image source={require('../../assets/perfilnovo.jpg')} style={styles.imagePerfil}/> : <Image source={{uri:imageProfile}} style={styles.imagePerfil}/> }
          </TouchableOpacity>
        </View>

        <View style={styles.containerText}>
          <Text style={styles.text}>Adicione sua Bio</Text>
        </View>

        <View style={styles.containerInfo}>
          <View style={styles.cor}>
            <TextInput   
              multiline
              numberOfLines= {20}
              maxLength={280}
              onChangeText={text => setValue(text)}
              value={value}
              style={styles.textArea}
              placeholder='Digite aqui'
              placeholderTextColor={"#A2ACC3"}
            />
          </View>
        </View>

        <Modal
          animationType='none'
          visible={visibleModal}
          transparent={true}
          onRequestClose={() => setVisibleModal(false)}  
        >
          <SafeAreaView style={styles.containerModal}>

            <View style={styles.containerProgressBar}>
              <Progress.Circle progress={progressBarBackground===0 ? 0 : progressBarBackground } indeterminate={false} size={200} showsText={true} textStyle={{fontSize: 25, color: '#d6e9ff'}} color={'#d6e9ff'}/>
            </View>

            <TouchableOpacity style={styles.buttonModal} onPressIn={() => setVisibleModal(false) + navigation.navigate('Screens')} disabled={progressBarBackground === 100 ? false : true}>
              <Text style={styles.buttonTextModal}>Concluir</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      

        <View style={styles.space}></View>
        { imageProfile === null && imageBackground === null? 
        <TouchableOpacity style={styles.button} onPressIn={() =>(Alert.alert("Adicione Imagem de fundo e Perfil"))}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity> 
        :
        <TouchableOpacity style={styles.button} onPress={submitData} onPressIn={() => setVisibleModal(true)}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>}

      </View>

      
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
};

export default Imag;

const styles = StyleSheet.create({

  cor:{
    marginTop: 40,
    height: 120,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#A2ACC3",
    width: '90%',
    alignSelf: 'center',
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
  
  space:{
    height: '13%'
  },

  textArea:{
    padding: 5,
    textAlign: 'justify',
    fontSize: 18,
    textAlignVertical: 'top',

  },

  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#2C8AD8",
  },

  containerHeader:{
    marginTop: '9%',
    marginBottom: '8%',
    paddingStart: '5%',
    width: '100%',
  },

  textHeader:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d6e9ff',
  },

  button:{
    backgroundColor: "#2C8AD8",
    width: '80%',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',

  },

  buttonText:{
    color: "#d6e9ff",
    fontSize: 15,
    fontWeight: 'bold', 
  },

  containerInfoProfile:{
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#d6e9ff",
  },

  message:{
    marginTop: 25,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8%',
  },

  containerText:{
    alignItems: 'center',
    marginTop:20
  },

  text:{
    fontSize:18,
    fontWeight:'bold',
    color: "#5A6687"
  },

  backgroundImage:{
    width: '100%', 
    height: 130,
    alignSelf: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: "#5A6687"
  },
  imagePerfil:{
    width: 100, 
    height: 100, 
    borderRadius: 100, 
    borderWidth: 1,
    borderColor: '#A2ACC3',
    marginTop: -50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  containerPerfil:{
    alignItems: 'center',
  },

  containerInfo:{
    paddingBottom: 30,
    marginLeft: 10,
    marginRight: 10,
  },

});