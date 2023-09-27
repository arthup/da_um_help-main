import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Screens/Home/index';
import Message from '../pages/Screens/Message';
import NewPost from '../pages/Screens/NewPost/index';
import Profile from '../pages/Screens/Profile/index';
import Search from '../pages/Screens/Search/index';
import React from 'react';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();


const icone = () =>{
    return  <Entypo name="home" size={20} color='red' />
}
export default function Routes(){

    return(
        <Tab.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor:'white',
                    borderTopColor:'transparent',
        
                },
                

                tabBarActiveTintColor:'#8BD7F3',
                tabBarInactiveTintColor:'#242E4E',

                tabBarStyle:{
                    paddingTop: 9,
                    paddingBottom: 2
                },

                tabBarHideOnKeyboard:true
            }}
        >
                
            <Tab.Screen
                name="Dá um Help!" 
                component={Home}
                
                options={{ 
                    headerShown: true,
                    headerRight:icone,
                    tabBarLabel:'',
                    headerStyle: {backgroundColor:'#2C8AD8'},
                    headerTintColor: 'white',
                    
                
                    tabBarIcon:({size, color}) =>(
                        <Entypo name="home" size={size} color={color} />
                    )
                }}
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
                name="Crie sua Postagem"
                component={NewPost}
                options={{ 
                    headerShown: false,
                    headerStyle:({
                        backgroundColor:"#2C8AD8", 
                    }),
                    headerTintColor:'#fff',
                    tabBarLabel:'',
                    tabBarIcon:({size, color}) =>(
                        <View style={styles.container}>
                            <Entypo name="plus" size={size} color={"white"}/>
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
                    )
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{ 
                    headerShown: false,
                    tabBarLabel:'',
                    tabBarIcon:({size, color}) =>(
                        <Ionicons name="md-person" size={size} color={color} />
                    )
                }}
            />  
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container:{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#2C8AD8",
        alignItems: 'center',
        justifyContent: 'center',
        color: "white",
        marginBottom: 5
    }
});