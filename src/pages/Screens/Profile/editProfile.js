import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {View, ScrollView, TouchableOpacity, Image, Text, StyleSheet, TextInput} from "react-native";

const EditProfile = () => {

    const navigation = useNavigation();

    return (

      <View style={styles.container}>

        <ScrollView>

          <View style={styles.containerHeader}>
            <TouchableOpacity onPress={()=>(navigation.navigate('Perfil'))}>
              <Image source={require("../../../assets/voltar.png")} style={styles.iconVoltar}></Image>
            </TouchableOpacity>

            <Text style={styles.message}>Editar Perfil</Text>

            <TouchableOpacity>
              <Image source={require("../../../assets/certo.png")} style={styles.iconConfirmar}></Image>
            </TouchableOpacity>
          </View>

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

          <View style={styles.espaco}>
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

          <View style={styles.espaco}>
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

          <View style={styles.espaco}>
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

          <View style={styles.espaco}>
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

          <View>
            <TouchableOpacity style={styles.profissao}>
              <Image source={require("../../../assets/profissional.png")} style={styles.iconProfissao}></Image>
              <Text style={styles.txtProfissao}>Mudar para conta profissional</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.espacinho}/>

        </ScrollView>

      </View>

    );
  }

export default EditProfile;

const styles=StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },

  containerHeader:{
    paddingStart: '5%',
    backgroundColor: '#d6e9ff',
    alignSelf: "center", 
    alignItems: "center",
    flexDirection: "row", 
  },

  message:{
    marginTop: '14%',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8%',
  },

  iconVoltar:{
    marginTop: 55,
    marginRight: 20,
    height: 30,
    width: 20,
    
  },

  iconConfirmar:{
    marginTop: 55,
    marginRight: 20,
    marginLeft: 160,
    height: 30,
    width: 20,
    
  },

  backgroundImage:{
    flex: 1,
    width: 400, 
    height: 130,
    alignSelf: 'center',
  },

  perfil:{
    alignItems: "center",
  },

  imagePerfil:{
    width: 100, 
    height: 100, 
    borderRadius: 100, 
    borderWidth: 4,
    borderColor: 'gray',
    marginTop: -50,
    alignSelf: 'center',
    marginBottom: 20,
  },

  espaco:{
    paddingBottom: 30,
    marginLeft: 10,
    marginRight: 10,
  },

  informacaoUsuario:{
    fontSize: 15, 
    fontWeight: "bold",
    color: "gray",
    paddingTop: 10,
    paddingBottom: 10,
    
  },

  textInputPassword: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:12
  },

  inputName:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 0,
    position: 'absolute',
    width: "100%",
  },

  inputUsuario:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 0,
    position: 'absolute',
    width: "100%",
  },

  inputBio:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 0,
    position: 'absolute',
    width: "100%",
  },

  inputPassword:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 0,
    position: 'absolute',
    width: "100%",
  },

  profissao:{
    alignSelf: "center", 
    alignItems: "center",
    flexDirection: "row", 
    justifyContent: "center", 
    width: "90%", 
    paddingBottom: 12, 
    paddingTop: 12,
    borderRadius: 10, 
    shadowOpacity: 80, 
    elevation: 15, 
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor:"#d6e9ff",
  },

  txtProfissao:{
    paddingTop: 4,
    alignSelf: 'center',
    color: "white",
    fontWeight: "bold"
  },

  iconProfissao:{
    width: 25,
    height: 25,
    marginRight: 10,
  },

  espacinho:{
    padding: 40,
  }
})