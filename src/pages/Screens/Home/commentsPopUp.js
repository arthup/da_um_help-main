import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { Entypo, Feather, MaterialIcons, Ionicons  } from '@expo/vector-icons';

export const CommentsPopUp = ({handleClose, handleOpen}) => {
  const [like, setLike] = useState(false);
  const [like2, setLike2] = useState(false);
  const [like3, setLike3] = useState(false);
  const [like4, setLike4] = useState(false);
  const [like5, setLike5] = useState(false);
  const [like6, setLike6] = useState(false);
  const [like7, setLike7] = useState(false);
  const [like8, setLike8] = useState(false);
  const [like9, setLike9] = useState(false);

  const pressLike =() => {
    if (like === false){
      setLike(true)
    } else {
      setLike(false)
    }
  }
  
  const pressLike2 =() => {
    if (like2 === false){
      setLike2(true)
    } else {
      setLike2(false)
    }
  }

  const pressLike3 =() => {
    if (like3 === false){
      setLike3(true)
    } else {
      setLike3(false)
    }
  }

  const pressLike4 =() => {
    if (like4 === false){
      setLike4(true)
    } else {
      setLike4(false)
    }
  }

  const pressLike5 =() => {
    if (like5 === false){
      setLike5(true)
    } else {
      setLike5(false)
    }
  }

  const pressLike6 =() => {
    if (like6 === false){
      setLike6(true)
    } else {
      setLike6(false)
    }
  }

  const pressLike7 =() => {
    if (like7 === false){
      setLike7(true)
    } else {
      setLike7(false)
    }
  }

  const pressLike8 =() => {
    if (like8 === false){
      setLike8(true)
    } else {
      setLike8(false)
    }
  }

  const pressLike9 =() => {
    if (like9 === false){
      setLike9(true)
    } else {
      setLike9(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}> 
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.btnBack} onPress={handleClose}> 
            <Feather name="arrow-left" size={24} color="#f8f8f8"/>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
              <Image source={require('../../../assets/francyelly.jpeg')} style={styles.userImage}/>
            </View>

            <View style={styles.comment} >
              <View style={styles.iconLike}>
                <Text style={styles.userName}>Francyelly Monteiro</Text>
                <TouchableOpacity onPress={pressLike}>
                  <Entypo name={like===false ?'heart-outlined' : 'heart'}  size={18} color={like===false ?'black' : 'red'}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.txtComment}>Muito bonito cara!!! Parabéns pelo trabalho.</Text>
                <Text style={styles.textData}>há 1 dia</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
              <Image source={require('../../../assets/arthur.jpeg')} style={styles.userImage}/>
            </View>

            <View style={styles.comment} >
              <View style={styles.iconLike}>
                <Text style={styles.userName}>Arthur Silva</Text>
                <TouchableOpacity onPress={pressLike2}>
                  <Entypo name={like2===false ?'heart-outlined' : 'heart'}  size={18} color={like2===false ?'black' : 'red'}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.txtComment}>Trabalho bem feito, parabéns!!!</Text>
                <Text style={styles.textData}>há 1 dia</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
              <Image source={require('../../../assets/angelo.jpeg')} style={styles.userImage}/>
            </View>

            <View style={styles.comment} >
              <View style={styles.iconLike}>
                <Text style={styles.userName}>Angelo Scarpetta</Text>
                <TouchableOpacity onPress={pressLike3}>
                  <Entypo name={like3===false ?'heart-outlined' : 'heart'}  size={18} color={like3===false ?'black' : 'red'}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.txtComment}>Muito bom, que trabalho INCRÍVEL!!!</Text>
                <Text style={styles.textData}>há 1 dia</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
              <Image source={require('../../../assets/yuri.jpeg')} style={styles.userImage}/>
            </View>

            <View style={styles.comment} >
              <View style={styles.iconLike}>
                <Text style={styles.userName}>Professor Yuri</Text>
                <TouchableOpacity onPress={pressLike4}>
                  <Entypo name={like4===false ?'heart-outlined' : 'heart'}  size={18} color={like4===false ?'black' : 'red'}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.txtComment}>Cavalo!!!</Text>
                <Text style={styles.textData}>há 1 dia</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
              <Image source={require('../../../assets/heloisa.jpeg')} style={styles.userImage}/>
            </View>

            <View style={styles.comment} >
              <View style={styles.iconLike}>
                <Text style={styles.userName}>Heloisa Chagas</Text>
                <TouchableOpacity onPress={pressLike5}>
                  <Entypo name={like5===false ?'heart-outlined' : 'heart'}  size={18} color={like5===false ?'black' : 'red'}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.txtComment}>Otimo trabalho!!!</Text>
                <Text style={styles.textData}>há 1 dia</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
              <Image source={require('../../../assets/ana.jpeg')} style={styles.userImage}/>
            </View>

            <View style={styles.comment} >
              <View style={styles.iconLike}>
                <Text style={styles.userName}>Ana Troiano</Text>
                <TouchableOpacity onPress={pressLike6}>
                  <Entypo name={like6===false ?'heart-outlined' : 'heart'}  size={18} color={like6===false ?'black' : 'red'}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.txtComment}>Parabéns pelo esforço e dedicação!!!</Text>
                <Text style={styles.textData}>há 1 dia</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
              <Image source={require('../../../assets/messa.jpeg')} style={styles.userImage}/>
            </View>

            <View style={styles.comment} >
              <View style={styles.iconLike}>
                <Text style={styles.userName}>Felipe Messa</Text>
                <TouchableOpacity onPress={pressLike7}>
                  <Entypo name={like7===false ?'heart-outlined' : 'heart'}  size={18} color={like7===false ?'black' : 'red'}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.txtComment}>Top!!!</Text>
                <Text style={styles.textData}>há 1 dia</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
              <Image source={require('../../../assets/felipe.jpeg')} style={styles.userImage}/>
            </View>

            <View style={styles.comment} >
              <View style={styles.iconLike}>
                <Text style={styles.userName}>Felipe Chagas</Text>
                <TouchableOpacity onPress={pressLike8}>
                  <Entypo name={like8===false ?'heart-outlined' : 'heart'}  size={18} color={like8===false ?'black' : 'red'}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.txtComment}>O melhor trabalho que já vi em toda a minha vida!!!</Text>
                <Text style={styles.textData}>há 1 dia</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerComment}>
            <View style={styles.containerInfoUser}>
              <Image source={require('../../../assets/gino.jpeg')} style={styles.userImage}/>
            </View>

            <View style={styles.comment} >
              <View style={styles.iconLike}>
                <Text style={styles.userName}>Giovanni Ruiz</Text>
                <TouchableOpacity onPress={pressLike9}>
                  <Entypo name={like9===false ?'heart-outlined' : 'heart'}  size={18} color={like9===false ?'black' : 'red'}/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.txtComment}>Very good!!!</Text>
                <Text style={styles.textData}>há 1 dia</Text>
              </View>
            </View>
          </View>

        </ScrollView>

        <View style={styles.containerInfo}>
          <View style={styles.cor}>
            <TextInput   
              style={styles.textArea}
              placeholder='Digite aqui'
              placeholderTextColor={"#A2ACC3"}
            />
          </View>

          <View style={styles.containerEnter}>
            <TouchableOpacity style={styles.btnIcon}>
              <Ionicons name="enter-outline" size={40} color="white" style={styles.iconEnter}/>
            </TouchableOpacity>          
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default CommentsPopUp;

const styles = StyleSheet.create({
  
  container:{
    width: '100%',
    height: '100%',
    alignSelf:'center',
    alignItems:'center',
    backgroundColor: "#000002A3"
  },

  content: {
    width: "95%",
    height: "99%",
    zIndex: 99,
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    marginTop: 8,
    borderWidth: 0.5,
    alignSelf: "center",
    borderColor: "#A2ACC3"
  },

  containerButton: {
    width: "100%",
    height: "7%",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#2C8AD8",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },

  btnBack:{

    width: "6.5%",
    borderRadius: 100,
  },

  containerComment:{
    width: '95%',
    height: 'auto',
    padding: 10,
    borderRadius: 25,
    flexDirection:'row'
  },

  containerInfoUser:{
    flexDirection:'row',
  },

  userImage:{
    width:35, 
    height:35, 
    borderRadius: 50
  },

  comment:{
    backgroundColor: '#ECEEF4FE',
    width: '90%',
    marginLeft:'2%',
    borderRadius: 20,
    padding: 15,
  },

  iconLike: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  userName:{
    fontSize: 14,
    fontWeight:'bold',
    marginBottom: "2%"
  },

  txtComment:{
    fontSize: 14
  },

  textData: {
    fontSize: 12,
    left: "83%",
    color: "#A2ACC3",
  },

  containerInfo:{
    paddingBottom: 20,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#2C8AD8",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },

  textArea:{
    padding: 5,
    fontSize: 14,
  },

  cor:{
    marginTop: 8,
    height: "80%",
    padding: 5,
    borderRadius: 25,
    width: '82%',
    alignSelf: 'center',
    marginLeft: 10,
    backgroundColor: "#f8f8f8"
  },

  containerEnter: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 5,
  },

  btnIcon: {
    marginTop: 8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  iconEnter: {
    paddingRight: 5
  }
});