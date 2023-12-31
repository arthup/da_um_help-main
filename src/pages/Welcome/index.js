import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

export default function Welcome(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../../assets/LogoTeste5.png')}
                    style={{ width:'100%'}}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Bem-Vindo!</Text>
                <Text style={styles.text}>Um help para quem precisa!</Text>

                
                <TouchableOpacity style={styles.buttonSignIn} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.buttonTextSignIn}>Cadastre-se</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('LogIn')}>
                    <Text style={styles.buttonTextLogin}>Já possui uma conta?</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    )
};

const styles = StyleSheet. create({
    container:{
        flex: 1,
        backgroundColor: "#2C8AD8",
    },

    containerLogo:{
        flex: 10,
        backgroundColor: "#2C8AD8",
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerForm:{
        flex: 7,
        backgroundColor: "#d6e9ff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    title:{
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '10%',
    },

    text:{
        color: "#A2ACC3",
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '5%',
    },

    buttonSignIn:{
        position: 'absolute',
        backgroundColor: "#2C8AD8",
        borderRadius: 50,
        paddingVertical: 14,
        width: '80%',
        alignSelf:'center',
        bottom: '25%',
        alignItems:'center',
        justifyContent:'center',
    },

    buttonTextSignIn:{
        fontSize: 15,
        color:"#d6e9ff",
        fontWeight:'bold',
    },

    buttonLogin:{
        position: 'absolute',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '10%',
        alignItems: 'center',    
        justifyContent: 'center'
    },

    buttonTextLogin:{
        fontSize: 15,
        color: "#A2ACC3",
        fontWeight: 'bold',
    },
});
