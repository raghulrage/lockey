import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { setCustomText } from 'react-native-global-props';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { Root } from "react-native-alert-notification";

import COLORS from './Configs/Colors';
import FONTS from './Configs/Fonts';
import SIZES from './Configs/Sizes';
import BottomTab from './Navigation/BottomTab';
import { createTables } from './Database/DbConfig';


const customTextProps = {
  style: {
    fontSize: SIZES.SMALL,
    fontFamily: 'regular',
    color: COLORS.BLACK,
  }
}

export default function App() {
  LogBox.ignoreLogs(["SplashScreen.preventAutoHideAsync()"]);
  const [fontsLoaded, setFontsLoaded] = useState(false);


  useEffect(() => {
    AsyncStorage.getItem("LockeyOpened").then((res) => {
      if (_.isEmpty(res)) {
        createTables()
        AsyncStorage.setItem('LockeyOpened', "opened")
      }
    });

    Font.loadAsync(FONTS).then(() => {
      setFontsLoaded(true);
      console.log("Font loaded");
      setCustomText(customTextProps);
    });
  })


  if (!fontsLoaded)
    return <AppLoading />;

  return (
    <Root theme='dark'>
      <BottomTab />
    </Root>
  );
}
