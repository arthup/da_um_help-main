import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../../Services/firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import { doc, setDoc } from "firebase/firestore";
import { useBackHandler } from '@react-native-community/hooks';

const SignIn = () => {
    const navigation = useNavigation('');
    const [name, setName] = useState('');
    const [password_confirm, setPassword_confirm] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uploading, setUploading] = useState(false);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [passHide, setpassHide] = useState(true);
    const [passHide2, setpassHide2] = useState(true);

    useBackHandler(() =>{
        if(1 == 1){
            return true
        }
    });
    
    const handleSignIn = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                console.log('usuario criado');
                try {
                    const docRef =  {
                        userId:user.uid,
                        name: name,
                        nameSearch: name.toUpperCase(),
                        email: email,
                        password: password,
                        cpf: null,
                        rg: null,
                        dataNasc: null,
                        telefone: null,
                        cep: null,
                        estado: null,
                        cidade: null,
                        bairro: null,
                        numero: null,
                        rua: null,
                        complemento: null,
                        userImg: null,
                
                    };
                    setDoc(doc(db, "users", user.uid), docRef);
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
                    navigation.navigate('userInfo')
            }).catch((error) => {

            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            if(errorCode=='auth/email-already-in-use'){
                Alert.alert('Email ja existente!')
            } else if( errorCode == 'auth/invalid-email'){
                Alert.alert('Email inválido!')
                }
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
                            placeholder='Nome Completo'
                            placeholderTextColor={"#A2ACC3"}
                            style={styles.inputName}
                            value={name}
                            onChangeText={(text) => setName(text) && (error == false && name ==="")}
                        />
                
                    {error == true && email==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor={"#A2ACC3"}
                            style={styles.inputEmail}
                            value={email}
                            onChangeText={(text) => setEmail(text) && (error == false && email ==="")}
                        />
                

                    {error == true && password==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                        <View style={styles.textInputPassword}>
                            <TextInput
                                placeholder='Senha'
                                style={styles.inputPassword}
                                placeholderTextColor={"#A2ACC3"}
                                secureTextEntry={passHide}
                                value={password}
                                onChangeText={(text) => setPassword(text) && (error == false && password ==="")}
                            />
                            
                            <TouchableOpacity  onPress={() => setpassHide(!passHide)}>
                                <FontAwesome5 name={passHide ? 'eye' : 'eye-slash'} size={20} color="#A2ACC3"/>
                            </TouchableOpacity> 
                        </View>

                        <View> 
                            <Text>{}</Text>   
                        </View>

                    {error == true && password_confirm==="" || password !== password_confirm ? <Text style={styles.warningMessage}> Senhas Diferentes </Text> : <Text style={styles.warningMessage}/>}
                        <View style={styles.textInputPassword}>
                            <TextInput
                                placeholder='Confirmar Senha'
                                placeholderTextColor={"#A2ACC3"}
                                style={styles.inputPassword}
                                value={password_confirm}
                                secureTextEntry={passHide2}
                                onChangeText={(text) => setPassword_confirm(text) && (error == false && password_confirm ==="" )}
                            />

                            <TouchableOpacity  onPress={() => setpassHide2(!passHide2)}>
                                <FontAwesome5 name={passHide2 ? 'eye' : 'eye-slash'} size={20} color="#A2ACC3"/>
                            </TouchableOpacity> 
                        </View>


                        <View style={styles.space}></View>
                        { name === "" || email === "" || password === "" || password_confirm === "" || password !== password_confirm
                            ? 
                                <TouchableOpacity 
                                    style={styles.buttonRegister}
                                    onPress={() => (setError(true))}
                                >
                                    <Text style={styles.buttonRegisterText}>Prosseguir</Text>
                                </TouchableOpacity>
                            : 
                                <TouchableOpacity 
                                    style={styles.buttonRegister}
                                    onPress={handleSignIn} 
                                >
                                    <Text style={styles.buttonRegisterText}>Prosseguir</Text>
                                </TouchableOpacity>
                        }
                    
                        <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('LogIn')}>
                            <Text style={styles.buttonLoginText}>Já possui uma conta?</Text>
                        </TouchableOpacity>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default SignIn;

const styles = StyleSheet.create({
    container:{
        flex: 2,
        backgroundColor: "#2C8AD8",
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
        backgroundColor: "#d6e9ff",
        flex: 2,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    space:{
        height: '37.5%'
    },

    inputName:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: "3%",
        fontSize: 16,
        marginTop: "3%"
    },

    inputEmail:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: "3%",
        fontSize: 16,
    },

    warningMessage:{
        color: "#f00a0a",
        fontSize: 12,
        fontWeight: 'bold',
    },

    buttonRegister:{
        backgroundColor: "#2C8AD8",
        width: '80%',
        alignSelf: 'center',
        borderRadius: 50,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonRegisterText:{
        color: "#d6e9ff",
        fontSize: 15,
        fontWeight: 'bold',  
    },

    buttonLogin:{
        marginTop: 14,
        alignSelf: 'center',
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
        marginTop: 12,
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
});