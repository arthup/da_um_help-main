import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../../Services/firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';


const SignIn = () => {
    const navigation = useNavigation('');
    const [name, setName] = useState('');
    const [password_confirm, setPassword_confirm] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [passHide, setpassHide] = useState(true);
    const [passHide2, setpassHide2] = useState(true);

    const handleSignIn = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                console.log('usuario criado')
                navigation.navigate('Screens')
            }).catch((error) => {
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
        })
    };


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Crie sua conta!</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                
                    {error == true && name==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                    <TextInput
                        placeholder='Nome Completo '
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text) && (error == false && name ==="")}
                    />
            
                    {error == true && email==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                    <TextInput
                        placeholder='Email'
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text) && (error == false && email ==="")}
                    />
             

                {error == true && password==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                <View style={styles.textInputPassword}>
                    <TextInput
                        placeholder='Senha'
                        style={styles.inputPassword}
                        secureTextEntry={passHide}
                        value={password}
                        onChangeText={(text) => setPassword(text) && (error == false && password ==="")}
                    />
                    
                    <TouchableOpacity  onPress={() => setpassHide(!passHide)}>
                        <FontAwesome5 name={passHide ? 'eye' : 'eye-slash'} size={20} color="black"/>
                    </TouchableOpacity> 
                </View>

                <View> 
                    <Text>{}</Text>   
                </View>

                {error == true && password_confirm==="" || password !== password_confirm ? <Text style={styles.warningMessage}> Senhas Diferentes </Text> : <Text style={styles.warningMessage}/>}
                <View style={styles.textInputPassword}>
                    <TextInput
                        placeholder='Confirmar Senha'
                        style={styles.inputPassword}
                        value={password_confirm}
                        secureTextEntry={passHide2}
                        onChangeText={(text) => setPassword_confirm(text) && (error == false && password_confirm ==="" )}

                    />

                    <TouchableOpacity  onPress={() => setpassHide2(!passHide2)}>
                        <FontAwesome5 name={passHide2 ? 'eye' : 'eye-slash'} size={20} color="black"/>
                    </TouchableOpacity> 
                </View>

                
                    { name === "" || email === "" || password === "" || password_confirm === "" || password !== password_confirm
                    ? 
                    <TouchableOpacity 
                        style={styles.buttonRegister}
                        onPress={() => (setError(true))}
                    >
                        <Text style={styles.buttonRegisterText}>Cadastrar</Text>
                    </TouchableOpacity>
                    : 
                    <TouchableOpacity 
                        style={styles.buttonRegister}
                        onPress={handleSignIn} 
                    >
                        <Text style={styles.buttonRegisterText}>Cadastrar</Text>
                    </TouchableOpacity>
                    }
                
                    <TouchableOpacity 
                        style={styles.buttonLogin}
                        onPress={() => navigation.navigate('LogIn')}
                    >
                        <Text style={styles.buttonLoginText}>Já tenho uma conta</Text>
                    </TouchableOpacity>
                
            </Animatable.View>
        </View>
        </TouchableWithoutFeedback>
    )
};

export default SignIn;
 
const styles = StyleSheet.create({
    container:{
        flex:2,
        backgroundColor:"#619dfd"
    },

    containerHeader:{
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },

    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#d6e9ff',
    },

    containerForm:{
        backgroundColor:"#d6e9ff",
        flex:2,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 8,
        fontSize: 16,
    },

    warningMessage:{
        color:"#f00a0a",
        fontSize:12,
        fontWeight:'bold',

    },

    buttonRegister:{
        backgroundColor:"#619dfd",
        width: '80%',
        alignSelf:'center',
        borderRadius: 50,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        bottom:'-33%',
    },

    buttonRegisterText:{
        color: "#d6e9ff",
        fontSize: 15,
        fontWeight: 'bold',  
    },

    buttonLogin:{
        marginTop: 14,
        alignSelf: 'center',
        bottom:'-33%'
    },

    buttonLoginText:{
    color: "#A2ACC3",
    fontSize: 15,
    fontWeight: 'bold',
    },

    textInputPassword: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:12
        
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
});