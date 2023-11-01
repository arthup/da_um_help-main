import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { signOut, updateProfile } from "firebase/auth";
import {View, ScrollView, TouchableOpacity, Image, Text, StyleSheet, TextInput} from "react-native";
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import MaskInput, { Masks } from 'react-native-mask-input';

const EditProfile =  () => {

  const RG_MASK = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d || ''/,]
  const [name2, setName2]=useState('');
  const listUserInfo =[];
  const [cpf, setCpf] = useState('');
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
  const navigation = useNavigation();
  const user = auth.currentUser;

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
        const {userBackgroundImg, userImg, name, bairro, cep, cidade, complemento, cpf, dataNasc, email, estado, numero, password, rg, rua, telefone}  = doc.data();
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
      
      });
    } catch(e){
      console.log(e)}
  }

  useEffect(() => {
    getUserInfo()
  }, []);

  
  const teste = () =>{
  const washingtonRef = doc(db, "users", user.uid);

 updateDoc(washingtonRef, {
  name: name,
  nameSearch: name.toUpperCase(),
  telefone: telefone,
  senha: senha,
  cep: cep,
  estado: estado,
  cidade: cidade,
  bairro: bairro,
  rua: rua,
  numero: numero,
  complemento: complemento
});
try {
  updateProfile(auth.currentUser, {
    displayName: name
  })
} catch (e) {
  console.error("Error adding document: ", e);
}


  }

    return (
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.containerHeader}>
            <TouchableOpacity onPress={()=>(navigation.navigate('Perfil'))}>
              <Feather name="arrow-left" size={24} color="white" style={styles.iconVoltar}/>
            </TouchableOpacity>

            <Text style={styles.message}>Editar Perfil</Text>

            <TouchableOpacity  onPress={teste}>
              <Feather name="check" size={24} color="white" style={styles.iconConfirmar}/>
            </TouchableOpacity>
          </View>
          
          <View style={styles.containerInfo}>
            <View>
              <TouchableOpacity>
                <Image source={{uri: userBackgroundImg ? userBackgroundImg : null}} style={styles.backgroundImage}></Image>
              </TouchableOpacity>
            </View>

            <View style={styles.perfil}>
              <TouchableOpacity>
                <Image source={{uri: userImg ? userImg : null}} style={styles.imagePerfil}></Image>
              </TouchableOpacity>
            </View>

            <View style={styles.containerText}>
              <Text style={styles.text}>Informações Pessoais</Text>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Nome</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  style={styles.inputName}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Email</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={email}
                  style={styles.inputUsuario}
                  editable={false}
                />
              </View>
            </View>
            
            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Telefone</Text>
              </View>

              <View style={styles.textInputPassword}>
                <MaskInput
                  value={telefone}
                  style={styles.inputBio}
                  onChangeText={(text) => setTelefone(text)}
                  mask={Masks.BRL_PHONE}
                  keyboardType='numeric'
                />
              </View>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>CPF</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={cpf}
                  style={styles.inputBio}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>RG</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={rg}
                  style={styles.inputPassword}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Data de Nascimento</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={dataNasc}
                  style={styles.inputPassword}
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Senha</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={senha}
                  style={styles.inputPassword}
                  secureTextEntry={passHide}
                  onChangeText={(text) => setSenha(text)}
                />
                 <TouchableOpacity  onPress={() => setpassHide(!passHide)}>
                                <FontAwesome5 name={passHide ? 'eye' : 'eye-slash'} size={20} color="#A2ACC3"/>
                            </TouchableOpacity> 
              </View>
            </View>

            <View style={styles.containerText}>
              <Text style={styles.text}>Endereço</Text>
            </View>
            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>CEP</Text>
              </View>

              <View style={styles.textInputPassword}>
                <MaskInput
                  value={cep}
                  style={styles.inputPassword}
                  onChangeText={(text) => setCep(text)}
                  mask={Masks.ZIP_CODE}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Estado</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={estado}
                  style={styles.inputPassword}
                  onChangeText={(text) => setEstado(text)}
                />
              </View>
            </View>
            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Cidade</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={cidade}
                  style={styles.inputPassword}
                  onChangeText={(text) => setCiadade(text)}
                />
              </View>
            </View>
            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Bairro</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={bairro}
                  style={styles.inputPassword}
                  onChangeText={(text) => setBairro(text)}
                />
              </View>
            </View>
            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Rua</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={rua}
                  onChangeText={(text) => setRua(text)}
                  style={styles.inputPassword}
                />
              </View>
            </View>
            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Numero</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={numero}
                  style={styles.inputPassword}
                  onChangeText={(text) => setNumero(text)}
                />
              </View>
            </View>
            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Complemento</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  value={complemento}
                  style={styles.inputPassword}
                  onChangeText={(text) => setCompleto(text)}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.profissao} onPress={LogOut}>
              <FontAwesome5 name="user-cog" size={20} color="white" style={styles.iconProfissao}/>
              <Text style={styles.txtProfissao}>Mudar para conta profissional</Text>
            </TouchableOpacity>
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
    backgroundColor: "#4FB9FF",
  },

  containerHeader:{
    paddingStart: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
    width: '100%',
    height: 80,
  },

  containerInfo:{
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  message:{
    marginTop: 25,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8%',
  },

  iconVoltar:{
    marginTop: 10,
    marginRight: 15,
    height: 30,
    width: 30,
  },

  iconConfirmar:{
    marginTop: 10,
    marginRight: 20,
    marginLeft: 120,
    height: 30,
    width: 20,
  },

  containerText:{
    alignItems: 'center',
    marginTop:20
  },

  text:{
    fontSize:18,
    fontWeight:'bold',
    color: 'gray'
  },

  backgroundImage:{
    width: '100%', 
    height: 130,
    alignSelf: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  perfil:{
    alignItems: 'center',
  },

  imagePerfil:{
    width: 100, 
    height: 100, 
    borderRadius: 100, 
    borderWidth: 3,
    borderColor: 'gray',
    marginTop: -50,
    alignSelf: 'center',
    marginBottom: 10,
  },

  informations:{
    paddingBottom: 30,
    marginLeft: 10,
    marginRight: 10,
  },

  informacaoUsuario:{
    fontSize: 15, 
    fontWeight: 'bold',
    color: 'gray',
    paddingTop: 10,
    paddingBottom: 10,
  },

  textInputPassword: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  inputName:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 0,
    position: 'absolute',
    width: '100%',
  },

  inputUsuario:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 0,
    position: 'absolute',
    width: '100%',
  },

  inputBio:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 0,
    position: 'absolute',
    width: '100%',
  },

  inputPassword:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 0,
    position: 'absolute',
    width: '100%',
  },

  profissao:{
    alignSelf: 'center', 
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center', 
    width: '90%', 
    paddingBottom: 10, 
    paddingTop: 10,
    borderRadius: 10, 
    shadowOpacity: 200,
    elevation: 5, 
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor:"#d6e9ff",
    marginBottom: 30,
  },

  logout:{
    alignSelf: 'center', 
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center', 
    width: '90%', 
    paddingBottom: 10, 
    paddingTop: 10,
    borderRadius: 10, 
    shadowOpacity: 200, 
    elevation: 5, 
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor:"#d6e9ff",
    marginBottom: 40,
  },

  txtProfissao:{
    paddingTop: 4,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },

  txtLogout:{
    paddingTop: 4,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },

  iconProfissao:{
    width: 25,
    height: 25,
    marginRight: 10,
  },

  iconLogout:{
    width: 25,
    height: 25,
    marginRight: 10,
  },
});