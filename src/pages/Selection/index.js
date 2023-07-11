import React, {useState, Component, useEffect} from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar, ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import Check from './checkIcon';

export default function Selection(){
    const navigation = useNavigation();
    return (
    
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#05022E" barStyle="ligth-content"/>

            <ScrollView showsVerticalScrollIndicator={true} overScrollMode={'auto'}>
                <View style={styles.text}>
                    <Text style={styles.text}>Que tipo de trabalho você procura?</Text>
                </View>

                <View style={styles.containerImage} >
    
                    <View style={styles.iconCheck}>
                        <Image
                        source={require('../../assets/eletricista.jpg')}
                        style={styles.image}
                        />
                        <Check/>     
                    </View>

                    <View style={styles.iconCheck}>
                        <Image
                        source={require('../../assets/montador.jpg')}
                        style={styles.image}
                        />
                        <Check/>
                    </View>
                    
                    <View style={styles.iconCheck}>
                        <Image
                        source={require('../../assets/faxineiro.jpg')}
                        style={styles.image}
                        />
                        <Check />
                    </View>

                    <View style={styles.iconCheck}>
                        <Image
                        source={require('../../assets/pintor.jpg')}
                        style={styles.image}
                        />
                        <Check/>
                    </View>

                    <View style={styles.iconCheck}>
                        <Image
                        source={require('../../assets/pedreiro.jpg')}
                        style={styles.image}
                        />
                        <Check/>
                    </View>

                </View>
            </ScrollView>

            <ScrollView scrollEnabled={false} style={styles.scroll}>
                <View style={styles.containerButton}>
                    <TouchableOpacity 
                        style={styles.buttonConclude}
                        onPress={() => navigation.navigate('Screens')}>
                        <Text style={styles.buttonConcludeText}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flex:2,
        backgroundColor: "#619dfd"
    },

    scroll:{
        alignContent: 'center'
    },

    containerButton: {
        flex:1,
        backgroundColor:"#619dfd"
    },

    containerImage: {
        flexWrap:'wrap',
        flexDirection:'row',
        marginRight: 12,
        marginLeft: 12,
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 1   
    },

    image: {
        position:'relative',
        resizeMode:'cover',
        width: 300,
        height: 100,  
        borderWidth:2, 
        borderColor: '#d6e9ff' ,
        borderRadius:30,
        marginHorizontal: 24,
        marginTop: 15
    },

    iconCheck: {
        alignItems: 'center',
        justifyContent:'center'
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#d6e9ff',
        marginTop: '10%',
        marginBottom: '2%',
        paddingStart: '5%',
        paddingEnd:'5%',
        alignItems:'center',
        justifyContent:'center' 
    },

    buttonConclude: {
        backgroundColor:"#d6e9ff",
        width: '70%',
        alignSelf:'center',
        borderRadius: 50,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:30,
        marginTop:15
    },

    buttonConcludeText: {
        color: "#619dfd",
        fontSize: 18,
        fontWeight: 'bold'  
    },
});

