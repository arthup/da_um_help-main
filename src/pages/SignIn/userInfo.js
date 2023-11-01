import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import { auth, db } from '../../Services/firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import {  updateDoc, doc } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBackHandler } from '@react-native-community/hooks';
import MaskInput, { Masks } from 'react-native-mask-input';

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
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setCompleto] = useState('');
    const [error, setError] = useState(false);
    const RG_MASK = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d || ''/,]
    const user = auth.currentUser;
    const userUpdate = doc(db, "users", user.uid);

    useBackHandler(() =>{
        if(1 == 1){
            return true
        }
    });

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
            bairro: bairro,
            numero: numero,
            rua: rua,
            complemento: complemento
        });
        
        navigation.navigate('userImages')
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                            <Text style={styles.message}>Informações Pessoais</Text>
                        </Animatable.View>

                        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                            {error == true && cpf==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                                <MaskInput
                                    mask={Masks.BRL_CPF}
                                    placeholder='CPF'
                                    style={styles.input}
                                    value={cpf}
                                    onChangeText={(text) => setCpf(text) && (error == false && cpf ==="")}
                                    keyboardType='numeric'
                                />

                            {error == true && rg==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                                <MaskInput
                                    placeholder='RG'
                                    mask={RG_MASK}
                                    style={styles.input}
                                    onChangeText={(text) => setRg(text) && (error == false && rg ==="")}
                                    value={rg}
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
                                        <FontAwesome5 name="calendar-day" size={24} color="#2C8AD8"/>
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
                                <MaskInput
                                    mask={Masks.BRL_PHONE}
                                    placeholder='Telefone'
                                    style={styles.input}
                                    value={telefone}
                                    onChangeText={(text) => setTelefone(text) && (error == false && telefone ==="")}
                                    keyboardType='numeric'
                                />

                            {error == true && cep==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                                <MaskInput
                                    mask={Masks.ZIP_CODE}
                                    placeholder='CEP'
                                    style={styles.input}
                                    value={cep}
                                    onChangeText={(text) => setCep(text) && (error == false && cep ==="")}
                                    keyboardType='numeric'
                                />

                            {error == true && estado==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                                <MaskInput
                                    placeholder='Estado Ex: SP'
                                    style={styles.input}
                                    value={estado}
                                    maxLength={2}
                                    textTransform='uppercase'
                                    onChangeText={(text) => setEstado(text) && (error == false && estado ==="")}
                                />

                            {error == true && cidade==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                                <MaskInput
                                    placeholder='Cidade'
                                    style={styles.input}
                                    value={cidade}
                                    onChangeText={(text) => setCiadade(text) && (error == false && cidade ==="")}
                                />

                            {error == true && bairro==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                                <MaskInput
                                    placeholder='Bairro'
                                    style={styles.input}
                                    value={bairro}
                                    onChangeText={(text) => setBairro(text) && (error == false && bairro ==="")}
                                />

                            {error == true && rua==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                                <MaskInput
                                    placeholder='Rua'
                                    style={styles.input}
                                    value={rua}
                                    onChangeText={(text) => setRua(text) && (error == false && rua ==="")}
                                />
                            
                            {error == true && numero==="" ? <Text style={styles.warningMessage}> Campo Obrigatório* </Text> : <Text style={styles.warningMessage}/>}
                                <MaskInput
                                    placeholder='Número'
                                    maxLength={5}
                                    style={styles.input}
                                    value={numero}
                                    onChangeText={(text) => setNumero(text) && (error == false && numero ==="")}
                                    keyboardType='numeric'
                                />

                            <Text style={styles.warningMessage}/>
                                <MaskInput
                                    placeholder='Complemento'
                                    style={styles.input}
                                    value={complemento}
                                    onChangeText={(text) => setCompleto(text) && (error == false && complemento ==="")}
                                />
                            
                            <View>
                                {cpf ==='' || rg ==='' || dataNasc ==='Data de Nascimento' || telefone ==='' || cep ==='' || estado ==='' || cidade ==='' || bairro ==='' || numero ==='' || rua ===''
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
                                            onPress={submitIinfo}
                                        >
                                            <Text style={styles.buttonRegisterText}>Prosseguir</Text>
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
        flex: 3,
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
        marginTop: 19,
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    buttonRegisterText:{
        color: "#d6e9ff",
        fontSize: 15,
        fontWeight: 'bold',  
    },

    textInputPassword:{
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 7,
        marginBottom: 15,
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