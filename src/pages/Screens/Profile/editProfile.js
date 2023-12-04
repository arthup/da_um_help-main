import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { signOut, updateProfile } from "firebase/auth";
import { View, ScrollView, TouchableOpacity, Image, Text, StyleSheet, TextInput, Modal, SafeAreaView, Alert} from "react-native";
import { auth, db, storage } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { updatePassword } from "firebase/auth";
import MaskInput, { Masks } from 'react-native-mask-input';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import * as Progress from 'react-native-progress';

const EditProfile =  () => {

  const [imageProfile, setImageProfile] = useState(null);
  const [imageBackground, setImageBackground] = useState(null);
  const listUserInfo =[];
  const [cpf, setCpf] = useState('');
  const [bio, setBio] = useState('');
  const [rg, setRg] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCiadade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setCompleto] = useState('');
  const [userBackgroundImg, setUserBackgroundImg]=useState('');
  const [userImg, setUserImg]=useState('');
  const [name, setName]=useState('');
  const [passHide, setpassHide] = useState(true);
  const [erro, setErro] = useState(false);
  const navigation = useNavigation();
  const [progressBar, setProgressBar] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const user = auth.currentUser;
  const userUpdate = doc(db, "users", user.uid);
  
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
  
    if(imageProfile === null && imageBackground === null){
      undefined
    }else if(imageProfile !== null && imageBackground !== null){
      const getBlobFroUriProfile = async (uri) => {
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

    const getBlobFroUriBacgkground = async (uri) => {
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

    const storageRefProfile = ref(storage, 'image/' + Date.now());
    const imageBlobProfile = await getBlobFroUriProfile(imageProfile);
    const uploadTaskProfile = uploadBytesResumable(storageRefProfile, imageBlobProfile, metadata);

    const storageRefBackground = ref(storage, 'imageBack/' + Date.now());
    const imageBlobBackground = await getBlobFroUriBacgkground(imageBackground);
    const uploadTaskBackground = uploadBytesResumable(storageRefBackground, imageBlobBackground, metadata);

    uploadTaskProfile.on('state_changed',
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
          userBackgroundImg: downloadURL
        });
          console.log('funfou')
      } catch (e) {
        console.error("Error adding document: ", e);
      }})
    });}else if(imageBackground === null && imageProfile !== null){
      const getBlobFroUriProfile = async (uri) => {
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
      const storageRefProfile = ref(storage, 'image/' + Date.now());
      const imageBlobProfile = await getBlobFroUriProfile(imageProfile);
      const uploadTaskProfile = uploadBytesResumable(storageRefProfile, imageBlobProfile, metadata);

    uploadTaskProfile.on('state_changed',
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

    }else if(imageBackground !== null && imageProfile === null){

      const getBlobFroUriBacgkground = async (uri) => {
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

      const storageRefBackground = ref(storage, 'imageBack/' + Date.now());
      const imageBlobBackground = await getBlobFroUriBacgkground(imageBackground);
      const uploadTaskBackground = uploadBytesResumable(storageRefBackground, imageBlobBackground, metadata);

      uploadTaskBackground.on( 'state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgressBar(progress)
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
            userBackgroundImg: downloadURL
          });
            console.log('funfou')
        } catch (e) {
          console.error("Error adding document: ", e);
        }})
      });

    }
  }

  const LogOut = () => {
    signOut(auth).then(() => {
      console.log('deslogado')
      navigation.navigate('Welcome')
    }).catch((error) => {
    })
  }

  const getUserInfo = async () => {
    try{
      const q = query(collection(db, "users"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {userBackgroundImg, userImg, name, bairro, cep, cidade, complemento, cpf, dataNasc, email, estado, numero, password, rg, rua, telefone, bio}  = doc.data();
        listUserInfo.push({ 
          userBackgroundImg,
          userImg,
          name,
          bairro, 
          cep, 
          cidade, 
          complemento, 
          cpf, 
          dataNasc, 
          email, 
          estado, 
          numero, 
          password, 
          rg, 
          rua, 
          telefone,
          email,
          bio,
          id: doc.id
        });

        setUserBackgroundImg(userBackgroundImg);
        setUserImg(userImg);
        setName(name);
        setBairro(bairro);
        setCep(cep);
        setCiadade(cidade);
        setCompleto(complemento);
        setCpf(cpf);
        setDataNasc(dataNasc);
        setEmail(email);
        setEstado(estado);
        setNumero(numero);
        setRg(rg);
        setRua(rua);
        setSenha(password);
        setTelefone(telefone);
        setBio(bio)
      });
    } catch(e){
      console.log(e)}
  }

  useEffect(() => {
    getUserInfo()
  }, []);

  
  const Update = () =>{


    if(senha.length < 6){
      Alert.alert('Sua senha precisa ter no mínimo 6 caracteres')
    } else{
    updatePassword(user, senha).then(() => {
      console.log('foi')
    }).catch((error) => {
        });
      
        if(visibleModal=== false){
          navigation.navigate('Perfil')
        }else{
          setVisibleModal(true)
        }}
    try {
      updateProfile(auth.currentUser, {
        displayName: name
      })

    } catch (e) {
      console.error("Error adding document: ", e);
    }

    const Search = doc(db, "users", user.uid);
      updateDoc(Search, {
        name: name,
        nameSearch: name.toUpperCase(),
        telefone: telefone,
        password: senha,
        cep: cep,
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bio: bio
      });
      submitData();
    }

  return (
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.containerHeader}>
            <TouchableOpacity style={styles.iconVoltar} onPress={()=>(navigation.navigate('Perfil'))}>
              <Feather name="arrow-left" size={35} color="white" />
            </TouchableOpacity>

            <View style={styles.containerMessage}>
              <Text style={styles.message}>Editar Perfil</Text>
            </View>

            <TouchableOpacity style={styles.iconConfirmar} onPress={Update}>
              <Ionicons name="md-checkmark-sharp" size={35} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.containerInfoProfile}>
            <View>
              <TouchableOpacity onPress={pickBackgroundImg}>
                <Image source={{uri: imageBackground === null ? userBackgroundImg || null : imageBackground || null}} style={styles.backgroundImage}></Image>
              </TouchableOpacity>
            </View>

            <View style={styles.containerPerfil}>
              <TouchableOpacity onPress={pickProfileImg}>
                <Image source={{uri: imageProfile === null ? userImg || null : imageProfile || null}} style={styles.imagePerfil}></Image>
              </TouchableOpacity>
            </View>

            <View style={styles.containerBio}>
              <Text style={styles.infoText}>Bio:</Text>

                <View style={styles.cor}>
                  <TextInput   
                    multiline
                    numberOfLines= {20}
                    maxLength={280}
                    onChangeText={(text) => setBio(text)}
                    value={bio}
                    style={styles.textArea}
                    placeholder='Digite aqui'
                    placeholderTextColor={"#A2ACC3"}
                  />
                </View>
    
            </View>

            <View style={styles.containerText}>
              <Text style={styles.text}>Informações Pessoais</Text>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Nome</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Email</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={email}
                  style={styles.input}
                  editable={false}
                />
              </View>
            </View>
            
            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Telefone</Text>
              </View>

              <View style={styles.textInput}>
                <MaskInput
                  value={telefone}
                  style={styles.input}
                  onChangeText={(text) => setTelefone(text)}
                  mask={Masks.BRL_PHONE}
                  keyboardType='numeric'
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>CPF</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={cpf}
                  style={styles.input}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>RG</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={rg}
                  style={styles.input}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Data de Nascimento</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={dataNasc}
                  style={styles.input}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Senha</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={senha}
                  style={styles.input}
                  secureTextEntry={passHide}
                  onChangeText={(text) => setSenha(text)}
                />

                  <TouchableOpacity onPress={() => setpassHide(!passHide)}>
                    <FontAwesome5 name={passHide ? 'eye' : 'eye-slash'} size={20} color="#A2ACC3"/>
                  </TouchableOpacity> 
              </View>
            </View>

            <View style={styles.containerText}>
              <Text style={styles.text}>Endereço</Text>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>CEP</Text>
              </View>

              <View style={styles.textInput}>
                <MaskInput
                  value={cep}
                  style={styles.input}
                  onChangeText={(text) => setCep(text)}
                  mask={Masks.ZIP_CODE}
                  keyboardType='numeric'
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Estado</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={estado}
                  style={styles.input}
                  onChangeText={(text) => setEstado(text)}
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Cidade</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={cidade}
                  style={styles.input}
                  onChangeText={(text) => setCiadade(text)}
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Bairro</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={bairro}
                  style={styles.input}
                  onChangeText={(text) => setBairro(text)}
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Rua</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={rua}
                  onChangeText={(text) => setRua(text)}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Numero</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={numero}
                  style={styles.input}
                  onChangeText={(text) => setNumero(text)}
                />
              </View>
            </View>

            <View style={styles.containerInfo}>
              <View> 
                <Text style={styles.infoText}>Complemento</Text>
              </View>

              <View style={styles.textInput}>
                <TextInput
                  value={complemento}
                  style={styles.input}
                  onChangeText={(text) => setCompleto(text)}
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
                  <Progress.Circle progress={progressBar===0 ? 0 : progressBar } indeterminate={false} size={200} showsText={true} textStyle={{fontSize: 25, color: '#d6e9ff'}} color={'#d6e9ff'}/>
                </View>

                <TouchableOpacity style={styles.buttonModal} onPressIn={() => setVisibleModal(false) + navigation.navigate('Perfil')} disabled={progressBar === 100 ? false : true}>
                  <Text style={styles.buttonTextModal}>Concluir</Text>
                </TouchableOpacity>
              </SafeAreaView>
            </Modal>

            <View style={styles.containerBtnExit}>
            <TouchableOpacity style={styles.btnExit} onPress={LogOut}>
              <Ionicons name="exit-outline" size={28} color="white" style={styles.iconBtnExit}/>
              <Text style={styles.txtBtnExit}>Sair da conta</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
}

export default EditProfile;

const styles=StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#2C8AD8",
  },

  containerBio:{
    paddingBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%"
  },



  containerHeader:{
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    flexDirection: 'row', 
    width: '100%',
    height: "5%",
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

  
  textArea:{
    padding: 5,
    textAlign: 'justify',
    fontSize: 18,
    textAlignVertical: 'top',

  },

  cor:{
    marginTop: 10,
    height: 90,
    padding: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#A2ACC3",
    width: '90%',
    alignSelf: 'center',
    marginLeft: 10
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

  containerInfoProfile:{
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  containerMessage:{
    marginTop: 28,
    marginBottom: '8%',

  },

  message:{

    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',

  },

  iconVoltar:{
    marginTop: 10,
    marginRight: 10,
    height: "50%",
    width: "10%",

  },

  iconConfirmar:{
    marginTop: 10,
    marginLeft: 120,
    height: "50%",
    width: "10%",

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
  },
  imagePerfil:{
    width: 100, 
    height: 100, 
    borderRadius: 100, 
    borderWidth: 3,
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

  infoText:{
    fontSize: 15, 
    fontWeight: 'bold',
    color: '#A2ACC3',
    paddingTop: 10,
    paddingBottom: 10,
  },

  textInput: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 0,
    position: 'absolute',
    width: '100%',
  },

  containerBtnExit:{
    width: '100%', 
  
  },

  txtBtnExit:{
    paddingTop: 4,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },

  iconBtnExit:{
    width: 26,
    height: 26,
    marginRight: 10,
  },

  btnExit:{
    alignSelf: 'center', 
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent:'center', 
    width: '90%', 
    paddingBottom: 10, 
    paddingTop: 10,
    borderRadius: 10, 
    shadowOpacity: 200,
    elevation: 5, 
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor:"#FF0000",
    marginBottom: 30,
  }
});