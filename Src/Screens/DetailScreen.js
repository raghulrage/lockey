import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  LogBox,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import moment from "moment-timezone";

import SIZES from "../../Configs/Sizes";
import _ from "lodash";
import { StringToJSON } from "../../Components.js/CustomFunctions";
import COLORS from "../../Configs/Colors";
import {
  ToastNotification,
  TOAST_ALERT_TYPES,
} from "../../Components.js/ToastNotification";
import {
  PasswordTableSelectById,
  PasswordTableUpdate,
} from "../../Database/PasswordTable";

const DetailScreen = (props) => {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);

  const [used, setUsed] = useState(false);

  const [data, setData] = useState({});
  const [passData, setPassData] = useState([]);

  const updateUsage = () => {
    if (used) {
      let payload = {
        id: data.id,
        title: data.title,
        data: data.data,
        used: data.used + 1,
        created_at: data.created_at,
      };
      PasswordTableUpdate(payload);
      props.route.params.refresh()
    }
  };

  const getPasswordDetail = async () => {
    let d = await PasswordTableSelectById(props.route.params.data.id);
    setData(d[0]);
    setPassData(StringToJSON(d[0].data));
  };

  const constRefreshData = () => {
    getPasswordDetail();
    props.route.params.refresh()
  };

  useEffect(() => {
    updateUsage();
    getPasswordDetail();
  }, [used]);

  const copyToClipboard = async (text, column) => {
    await Clipboard.setStringAsync(text);
    setUsed(true);
    ToastNotification(
      TOAST_ALERT_TYPES.SUCCESS,
      "SUCCESS!",
      `${column} copied successfully!!!`
    );
  };

  if (!_.isEmpty(data))
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/Images/Background.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.content}>
            <Text style={styles.heading}>{data.title}</Text>
            <Text style={{ fontSize: SIZES.SMALLER }}>
              <Text style={{fontFamily : "semibold"}}>
                Added On:
              </Text>
              {" " + moment(data.created_at, "DD-MM-YYYY hh:mm:ss").format("Do MMM YYYY, hA")}
            </Text>

            <View style={{ flex: 1, justifyContent: "center" }}>
              {_.map(passData, (item, index) => {
                return (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={styles.subhead}>{item.key}</Text>
                    <View style={styles.subcontent}>
                      <Text>
                        {item.hide ? "*".repeat(item.value.length) : item.value}
                      </Text>
                      <TouchableOpacity
                        onPress={() => copyToClipboard(item.value, item.key)}
                      >
                        <MaterialIcons
                          name="content-copy"
                          size={SIZES.LARGE}
                          color={COLORS.GREY}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
              <View style={{ height: 120 }} />
            </View>
          </View>

          {/* Edit Button */}
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("AddScreen", {
                data: data,
                refresh: constRefreshData,
              });
            }}
            style={{ position: "absolute", right: 40, top: 30 }}
          >
            <Feather
              name="edit"
              size={SIZES.SMALLER * 2}
              color={COLORS.BLACK}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );

  return <View />;
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
    padding: 20,
    marginHorizontal: 20,
  },
  heading: {
    fontSize: SIZES.LARGE,
    fontFamily: "bold",
    marginVertical: 10,
  },
  subhead: {
    fontFamily: "semibold",
    marginLeft: 10,
  },
  subcontent: {
    padding: 15,
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    borderRadius: 5,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DetailScreen;
