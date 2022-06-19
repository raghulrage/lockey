import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import _ from "lodash";
import { useFocusEffect } from "@react-navigation/native";

import SIZES from "../../Configs/Sizes";
import Constants from "expo-constants";
import Logo from "../../Components.js/Logo";
import { PasswordTableSelect } from "../../Database/PasswordTable";
import SwipebleCard from "../../Components.js/HomeScreen/SwipebleCard";
import COLORS from "../../Configs/Colors";

const HomeScreen = (props) => {

  const [passData, setpassData] = useState([]);
  const getPassData = async () => {
    let d = await PasswordTableSelect();
    setpassData(d);
  };

  useFocusEffect(
    React.useCallback(() => {
      getPassData();
    }, [])
  );

  useEffect(() => {
    getPassData();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Images/Background.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Logo />

        {!_.isEmpty(passData) ? (
          <ScrollView>
            {_.map(passData, (item) => (
              <SwipebleCard key={item.id} data={item} refresh={getPassData}/>
            ))}
            <View style={{ height: 120 }} />
          </ScrollView>
        ) : (
          <View style={{alignItems : "center", top : SIZES.SCREEN_HEIGHT * 0.15}}>
            <Image
              style={{ height: 100 * 2, width: 150 * 2 }}
              source={require("../../assets/Images/no-data.png")}
            />
            <Text style={styles.nodata}>No Records Found !</Text>
            <Text style={styles.nodatasub}>Start adding your passwords...</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: SIZES.SCREEN_WIDTH,
    height: SIZES.SCREEN_HEIGHT + 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nodata : {
    color : COLORS.GREY,
    fontSize : SIZES.LARGER,
    marginTop : 20
  },
  nodatasub : {
    color : COLORS.GREY,
    fontSize : SIZES.SMALL,
    fontFamily : "light-italic"
  }
});

export default HomeScreen;