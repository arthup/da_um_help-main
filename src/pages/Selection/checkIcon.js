import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default class App extends React.Component {
  state = {
    liked: false
  };

  toggleLike = () => this.setState(state => ({ liked: !state.liked }));

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={this.toggleLike}  hitSlop={{left: 100, right: 100, bottom: undefined, top: undefined}}>
            <Image
              source={ this.state.liked ? require("../../assets/check.png") : undefined }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },

  iconRow: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  
  icon: {
    width: 80,
    height:85,
    resizeMode:'cover'
  }
});

