import React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'

const Message = () => {
  return (
    <SafeAreaView  style={styles.backColor}>
      <StatusBar backgroundColor="#2C8AD8" barStyle="ligth-content"/>
      <View>
          <Text style={styles.textHeader}>Mensagens</Text>
      </View>
      <View style={styles.container}></View>
    </SafeAreaView>
  );
}

export default Message;

const styles = StyleSheet.create({
  backColor:{
    backgroundColor: "#2C8AD8",
    height: '100%',
  },

  textHeader:{  
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 0,
    marginLeft: 20,
  },

  container:{
    marginTop: 30,
    backgroundColor: "#f8f8f8",
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});