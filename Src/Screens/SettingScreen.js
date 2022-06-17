import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'; 
import Constants from 'expo-constants';

import SIZES from '../../Configs/Sizes';

const SettingScreen = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Images/Background.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text>Settings Screen</Text>
        </View>
      </ImageBackground>
    </View>
  );
} 

const styles = StyleSheet.create({
container: {
  flex: 1,
  marginTop: Constants.statusBarHeight,
},
backgroundImage: {
  position: "absolute",
  left: 0,
  top: 0,
  width: SIZES.SCREEN_WIDTH + 10,
  height: SIZES.SCREEN_HEIGHT + 10,
},
content : {
  flex : 1,
  alignItems: "center",
  justifyContent: "center",
}
});

 export default SettingScreen;