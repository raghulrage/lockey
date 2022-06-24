import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import _ from "lodash";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import SIZES from "../../Configs/Sizes";
import Constants from "expo-constants";
import Logo from "../../Components.js/Logo";
import { PasswordTableSelect } from "../../Database/PasswordTable";
import SwipebleCard from "../../Components.js/HomeScreen/SwipebleCard";
import COLORS from "../../Configs/Colors";

const HomeScreen = (props) => {
  const [passData, setpassData] = useState([]);
  const [selectedSort, setSelectedSort] = useState("used");
  const [searchData, setSearchData] = useState("");
  const sortData = [
    {
      id: "used",
      placeholder: "Frequently used",
    },
    {
      id: "created_at",
      placeholder: "Recently added",
    },
  ];

  const getPassData = async () => {
    let d = await PasswordTableSelect(selectedSort, searchData);
    setpassData(d);
  };

  useFocusEffect(
    React.useCallback(() => {
      getPassData();
    }, [])
  );

  useEffect(() => {
    getPassData();
  }, [selectedSort]);

  const RenderFilter = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedSort(item.id)}
        style={{
          ...styles.button,
          backgroundColor:
            selectedSort == item.id ? COLORS.PRIMARY : COLORS.WHITE,
        }}
      >
        <Text
          style={{
            color: selectedSort == item.id ? COLORS.WHITE : COLORS.BLACK,
          }}
        >
          {item.placeholder}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Images/Background.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Logo />

        {/* Search Bar */}
        <View style={styles.searchbar}>
          <TextInput
            style={{ width: SIZES.SCREEN_WIDTH * 0.7, fontSize: SIZES.SMALL }}
            placeholder="Search"
            placeholderTextColor={COLORS.GREY}
            value={searchData}
            onChangeText={(text) => {
              setSearchData(text);
            }}
          />
          <TouchableOpacity onPress={getPassData}>
            <Ionicons
              name="search-outline"
              size={SIZES.LARGER}
              color={COLORS.GREY}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          {_.map(sortData, (item) => (
            <RenderFilter key={item.id} item={item} />
          ))}
        </View>

        {!_.isEmpty(passData) ? (
          <ScrollView>
            {_.map(passData, (item) => (
              <SwipebleCard
                key={item.id}
                data={item}
                refresh={getPassData}
                navigation={props.navigation}
              />
            ))}
            <View style={{ height: 120 }} />
          </ScrollView>
        ) : (
          <View
            style={{ alignItems: "center", top: SIZES.SCREEN_HEIGHT * 0.15 }}
          >
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
  nodata: {
    color: COLORS.GREY,
    fontSize: SIZES.LARGER,
    marginTop: 20,
  },
  nodatasub: {
    color: COLORS.GREY,
    fontSize: SIZES.SMALL,
    fontFamily: "light-italic",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 5,
    elevation: 5,
    borderRadius: 5,
  },
  searchbar: {
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical : 10,
    padding: 10,
    paddingHorizontal : 20,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default HomeScreen;