import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Constants from "expo-constants";
import _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment-timezone";
import * as Localization from "expo-localization";

import SIZES from "../../Configs/Sizes";
import COLORS from "../../Configs/Colors";
import { JSONToString } from "../../Components.js/CustomFunctions";
import { PasswordTableInsert } from "../../Database/PasswordTable";
import {
  ToastNotification,
  TOAST_ALERT_TYPES,
} from "../../Components.js/ToastNotification";

const AddScreen = (props) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const inputTemplate = { key: "", value: "", hide: false };
  const [data, setData] = useState([]);
  const currentTime = moment().tz(Localization.timezone).format("DD-MM-YYYY HH:mm:ss");

  const addColumn = () => {
    setData([...data, inputTemplate]);
  };

  const deleteColumn = (index) => {
    let d = _.cloneDeep(data);
    if (index == 0) d.shift();
    else d.splice(index, index);
    setData(d);
  };

  const isDataMinimum = () => {
    return data.length < 2;
  };

  const updateColumn = (index, text, column) => {
    let d = _.cloneDeep(data);
    d[index][column] = text;
    setData(d);
  };

  const toggleHideForColumn = (index) => {
    let d = _.cloneDeep(data);
    d[index]["hide"] = !d[index]["hide"];
    setData(d);
  };
  const submitData = () => {
    if (_.isEmpty(title)) {
      setTitleError(true);
      ToastNotification(
        TOAST_ALERT_TYPES.WARNING,
        "WARNING!",
        "Please add password title!!!"
      );
      return;
    }

    let d = _.map(data, (item) => {
      if (_.isEmpty(item.key) || _.isEmpty(item.value)) {
        ToastNotification(
          TOAST_ALERT_TYPES.WARNING,
          "WARNING!",
          "Please fill the columns!!!"
        );
        return true;
      }
      return false;
    });
    if (d.includes(true)) return;

    let payload = {
      title: title,
      data: JSONToString(data),
      used: 0,
      created_at: currentTime,
    };
    PasswordTableInsert(payload);
    ToastNotification(
      TOAST_ALERT_TYPES.SUCCESS,
      "SUCCESS!",
      "Password Added Successfully!!!"
    );
    resetData();
  };

  const resetData = () => {
    setData([inputTemplate]);
    setTitle("");
    setTitleError(false);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     resetData();
  //   }, [])
  // );

  useEffect(() => {
    addColumn();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Images/Background.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.heading}>Add Password</Text>
          <TextInput
            onChangeText={(text) => {
              setTitle(text);
              setTitleError(false);
            }}
            value={title}
            placeholder="Add Title"
            style={{
              ...styles.titleInput,
              borderColor: titleError ? COLORS.RED : COLORS.GREY,
            }}
          />
          <View style={{ height: SIZES.SCREEN_HEIGHT * 0.55, marginTop: 50 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {data.map((item, index) => {
                return (
                  <View style={{ marginBottom: 10 }} key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <TextInput
                        style={{ ...styles.input, width: "30%" }}
                        value={item.key}
                        placeholder="Enter Title"
                        onChangeText={(text) =>
                          updateColumn(index, text, "key")
                        }
                      />
                      <TextInput
                        value={item.value}
                        secureTextEntry={item.hide}
                        style={{ ...styles.input, width: "60%" }}
                        onChangeText={(text) =>
                          updateColumn(index, text, "value")
                        }
                        placeholder="Enter Value"
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          toggleHideForColumn(index);
                        }}
                        style={styles.icon}
                      >
                        <Ionicons
                          name={
                            item.hide
                              ? "ios-eye-off-outline"
                              : "ios-eye-outline"
                          }
                          size={SIZES.LARGE}
                          color={COLORS.BLACK}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={isDataMinimum()}
                        onPress={() => {
                          deleteColumn(index);
                        }}
                        style={styles.icon}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={SIZES.LARGE}
                          color={isDataMinimum() ? COLORS.GREY : COLORS.RED}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={addColumn}>
              <Text style={{ color: COLORS.WHITE }}>Add Column</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={submitData}
          style={{ position: "absolute", right: 40, top: 30 }}
        >
          <Ionicons
            name="checkmark-circle"
            size={SIZES.LEGIBLE * 2}
            color={COLORS.GREEN}
          />
        </TouchableOpacity>
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
    width: SIZES.SCREEN_WIDTH + 10,
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
  titleInput: {
    borderBottomWidth: 1,
    marginTop: 50,
    height: 40,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    padding: 10,
    elevation: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  icon: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: COLORS.BLUE,
    width: SIZES.SCREEN_WIDTH * 0.3,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderRadius: 5,
  },
});

export default AddScreen;
