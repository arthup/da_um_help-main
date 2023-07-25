import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView,Platform, Button, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { storage, auth, db } from '../../../Services/firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, addDoc, updateDoc, doc, docRef, setDoc } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';




const Docments = () => {
    const navigation = useNavigation('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [dataNasc, setDataNasc] = useState('Data de Nascimento');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCiadade] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setCompleto] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const user = auth.currentUser;
    const userUpdate = doc(db, "users", user.uid);


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const onChange = (event, selectedData) =>{
        const currentData = selectedData || date;
        setShow(Platform.OS === 'ios');
        setDate(currentData);

        let tempDate = new Date(currentData)
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setDataNasc(fDate)
    };

    const submitIinfo = () =>{
        
            updateDoc(userUpdate, {
                cpf: cpf,
                rg: rg,
                dataNasc: dataNasc,
                telefone: telefone,
                cep: cep,
                estado: estado,
                cidade: cidade,
                bairro: bairro
              });
              navigation.navigate('Images')
    };


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                            <Text style={styles.message}>Crie sua conta!</Text>
                        </Animatable.View>

                        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                            
                            {error == true && cpf==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                            <TextInput
                                placeholder='CPF'
                                maxLength={11}
                                style={styles.input}
                                value={cpf}
                                onChangeText={(text) => setCpf(text) && (error == false && cpf ==="")}
                            />

                            {error == true && rg==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                            <TextInput
                                placeholder='RG'
                                maxLength={9}
                                style={styles.input}
                                value={rg}
                                onChangeText={(text) => setRg(text) && (error == false && rg ==="")}
                            />

                            {error == true && dataNasc==="Data de Nascimento" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                            <View style={styles.textInputPassword}>
                                <TextInput
                                    editable={false}
                                    style={styles.inputPassword}
                                    value={dataNasc}
                                    onChangeText={(text) => setDataNasc(text) && (error == false && dataNasc ==="")}
                                />
                                
                                <TouchableOpacity onPress={() => showMode('date')}>
                                    <FontAwesome5 name="calendar-day" size={24} color="black" />
                                </TouchableOpacity> 
                                {show && (
                                    <DateTimePicker
                                    testID='dateTimePicker'
                                    value={date}
                                    mode={mode}
                                    display='spinner'
                                    onChange={onChange}
                                    maximumDate={new Date(2023, 11, 31)}
                                    minimumDate={new Date(1950, 0, 1)}
                                    />)}
                            </View>

                            {error == true && telefone==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                            <TextInput
                                placeholder='Telefone'
                                style={styles.input}
                                value={telefone}
                                onChangeText={(text) => setTelefone(text) && (error == false && telefone ==="")}
                                keyboardType='numeric'
                                maxLength={11}
                            />

                            {error == true && cep==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                            <TextInput
                                placeholder='CEP'
                                style={styles.input}
                                value={cep}
                                onChangeText={(text) => setCep(text) && (error == false && cep ==="")}
                                keyboardType='numeric'
                                maxLength={8}
                            />

                            {error == true && estado==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                            <TextInput
                                placeholder='Estado Ex: SP'
                                style={styles.input}
                                value={estado}
                                maxLength={2}
                                onChangeText={(text) => setEstado(text) && (error == false && estado ==="")}
                            />

                            {error == true && cidade==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                            <TextInput
                                placeholder='Cidade'
                                style={styles.input}
                                value={cidade}
                                onChangeText={(text) => setCiadade(text) && (error == false && cidade ==="")}
                            />

                            {error == true && bairro==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                            <TextInput
                                placeholder='Bairro'
                                style={styles.input}
                                value={bairro}
                                onChangeText={(text) => setBairro(text) && (error == false && bairro ==="")}
                            />

                            {error == true && complemento==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                            <TextInput
                                placeholder='Complemento'
                                style={styles.input}
                                value={complemento}
                                onChangeText={(text) => setCompleto(text) && (error == false && complemento ==="")}
                            />
                            
                            <View>
                                {cpf ==='' || rg ==='' || dataNasc ==='Data de Nascimento' || telefone ==='' || cep ==='' || estado ==='' || cidade ==='' || bairro ==='' || complemento ==='' 
                                
                                ?
                                <TouchableOpacity 
                                    style={styles.buttonRegister}
                                    onPress={() => (setError(true))}
                                >
                                    <Text style={styles.buttonRegisterText}>Concluir</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity 
                                    style={styles.buttonRegister}
                                    onPress={submitIinfo}
                                >
                                    <Text style={styles.buttonRegisterText}>Concluir</Text>
                                </TouchableOpacity>
                                }
                            </View>
                        </Animatable.View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
};

export default Docments;
 
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
        flex:3,
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
        marginTop: 19,
        marginBottom:10,
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
        bottom:'-33%',
        backgroundColor: 'red',
        width:'100%',
        height:'100%'
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
        marginTop:7,
        marginBottom: 15
        
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