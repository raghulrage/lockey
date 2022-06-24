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
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";

import SIZES from "../../Configs/Sizes";
import _ from "lodash";
import { StringToJSON } from "../../Components.js/CustomFunctions";
import COLORS from "../../Configs/Colors";
import {
  ToastNotification,
  TOAST_ALERT_TYPES,
} from "../../Components.js/ToastNotification";
import { PasswordTableUpdate } from "../../Database/PasswordTable";

const DetailScreen = (props) => {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
    "This can break usage such as persisting and restoring state."
  ]);

  const [used, setUsed] = useState(false);

  const data = props.route.params.data;
  const passData = StringToJSON(data.data);
  const refresh = props.route.params.refresh;
  let cloneData = _.cloneDeep(passData);

  const updateUsage = () => {
    if (used) {
      let payload ={
        id : data.id,
        title : data.title,
        data : data.data,
        used : data.used + 1,
        created_at : data.created_at,
      }
      PasswordTableUpdate(payload);
      refresh();
    }
  };

  useEffect(() => {
    updateUsage();
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

  const toggleHide = (item, index) => {
    let res = item
    res.hide = !item.hide
    cloneData[index] = res
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Images/Background.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.heading}>{data.title}</Text>

          <View style={{ flex: 1, justifyContent: "center" }}>
            {_.map(cloneData, (item,index) => {
              return (
                <View key={item.key} style={{ marginBottom: 10 }}>
                  <Text style={styles.subhead}>{item.key}</Text>
                  <View style={styles.subcontent}>
                    <Text>
                      {item.hide ? "*".repeat(item.value.length) : item.value}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      {item.hide && (
                        <TouchableOpacity
                          onPress={() => toggleHide(item, index)}
                          style={{marginHorizontal : 5, paddingHorizontal : 5}}
                        >
                          <Ionicons
                            name={
                              item.hide
                                ? "ios-eye-off-outline"
                                : "ios-eye-outline"
                            }
                            size={SIZES.LARGE}
                            color={COLORS.GREY}
                          />
                        </TouchableOpacity>
                      )}
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
                </View>
              );
            })}
            <View style={{ height: 120 }} />
          </View>
        </View>
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
    padding: 20,
    marginHorizontal: 20,
  },
  heading: {
    fontSize: SIZES.LARGE,
    fontFamily: "bold",
    marginTop: 10,
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
