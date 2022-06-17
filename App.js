import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { setCustomText } from 'react-native-global-props';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import COLORS from './Configs/Colors';
import FONTS from './Configs/Fonts';
import SIZES from './Configs/Sizes';


const customTextProps = {
  style: {
    fontSize: SIZES.SMALL,
    fontFamily: 'regular',
    color: COLORS.BLACK,
  }
}

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);


  useEffect(() => {
    Font.loadAsync(FONTS).then(() => {
      setFontsLoaded(true);
      console.log("Font loaded");
      setCustomText(customTextProps);
    });
  })


  if (!fontsLoaded)
    return <AppLoading />;
    
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
