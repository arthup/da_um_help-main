import { View, StyleSheet } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../pages/Screens/Home/index.js';
import Message from '../pages/Screens/Message/index';
import NewPost from '../pages/Screens/NewPost/index';
import Profile from '../pages/Screens/Profile/index';
import Search from '../pages/Screens/Search/index';
import React from 'react';
import { Entypo, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();
export default function Routes(){
    return(

        <Tab.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor:'white',
                    borderTopColor:'transparent'
                },
                tabBarActiveTintColor:'#2DD8DF',
                tabBarInactiveTintColor:'#05022E',
                tabBarStyle:{
                    paddingTop: 9,
                    paddingBottom: 2
                }
            }}
        >
                <Tab.Screen
                    name="Inicio"
                    component={Home}
                    options={{ 
                        headerShown: false,
                        tabBarLabel:'', 
                        tabBarIcon:({size, color}) =>(
                            <Entypo name="home" size={size} color={color} />
                        )}}
                />

                
                <Tab.Screen
                    name="Pesquisa"
                    component={Search}
                    options={{ 
                        headerShown: false,
                        tabBarLabel:'',
                        tabBarIcon:({size, color}) =>(
                            <FontAwesome name="search" size={size} color={color} />
                        )
                    }}
                />

                <Tab.Screen
                    name="Adicionar"
                    component={NewPost}
                    options={{ headerShown: false,
                        tabBarLabel:'',
                        tabBarIcon:({size, color}) =>(
                            <View style={styles.container}>
                            <Entypo name="plus" size={size} color={"white"} />
                            </View>
                        )
                       }}
                />

                <Tab.Screen
                    name="Mensagem"
                    component={Message}
                    options={{ 
                        headerShown: false,
                        tabBarLabel:'',
                        tabBarIcon:({size, color}) =>(
                            <Ionicons name="chatbox-ellipses" size={size} color={color} />
                        )}}
                />

                <Tab.Screen
                    name="Perfil"
                    component={Profile}
                    options={{ 
                        headerShown: false,
                        tabBarLabel:'',
                        tabBarIcon:({size, color}) =>(
                            <Ionicons name="md-person" size={size} color={color} />
                        )}}
                />  
            </Tab.Navigator>

    );}

    const styles = StyleSheet.create({
        container:{
          width:60,
          height:60,
          borderRadius: 30,
          backgroundColor:'#90BBFF',
          alignItems:'center',
          justifyContent:'center',
          color:'white',
          marginBottom: 5
        }
      });