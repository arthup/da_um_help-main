import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {View, ScrollView, TouchableOpacity, Image, Text, StyleSheet, TextInput} from "react-native";
import { Feather, FontAwesome5 } from '@expo/vector-icons';

const EditProfile = () => {

  const navigation = useNavigation();

    return (
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.containerHeader}>
            <TouchableOpacity onPress={()=>(navigation.navigate('Perfil'))}>
              <Feather name="arrow-left" size={24} color="white" style={styles.iconVoltar}/>
            </TouchableOpacity>

            <Text style={styles.message}>Editar Perfil</Text>

            <TouchableOpacity>
              <Feather name="check" size={24} color="white" style={styles.iconConfirmar}/>
            </TouchableOpacity>
          </View>
          
          <View style={styles.containerInfo}>
            <View>
              <TouchableOpacity>
                <Image source={require("../../../assets/azul.jpg")} style={styles.backgroundImage}></Image>
              </TouchableOpacity>
            </View>

            <View style={styles.perfil}>
              <TouchableOpacity>
                <Image source={require("../../../assets/perfil.jpg")} style={styles.imagePerfil}></Image>
              </TouchableOpacity>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Nome</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  placeholder='Arthur'
                  style={styles.inputName}
                />
              </View>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Nome do Usuario</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  placeholder='@arthur-silva'
                  style={styles.inputUsuario}
                />
              </View>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Bio</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  placeholder='Programador senior'
                  style={styles.inputBio}
                />
              </View>
            </View>

            <View style={styles.informations}>
              <View> 
                <Text style={styles.informacaoUsuario}>Senha</Text>
              </View>

              <View style={styles.textInputPassword}>
                <TextInput
                  placeholder='1234'
                  style={styles.inputPassword}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.profissao}>
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