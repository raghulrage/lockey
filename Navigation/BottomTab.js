import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../Src/Screens/HomeScreen";
import COLORS from "../Configs/Colors";
import SIZES from "../Configs/Sizes";
import SettingScreen from "../Src/Screens/SettingScreen";
import AddScreen from "../Src/Screens/AddScreen";

const Tab = createBottomTabNavigator();

const AddButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{ top: -50, alignItems: "center", justifyContent: "center", ...styles.shadow }}
      onPress={onPress}
    >
      <View style={{width : 80, height : 80}}>{children}</View>
    </TouchableOpacity>
);

const BottomTab = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: COLORS.SECONDARY,
            borderRadius: 15,
            height: 90,
            ...styles.shadow,
          },
        }}
      >
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="ios-home"
                  size={SIZES.GIGANTIC}
                  color={focused ? COLORS.PRIMARY : COLORS.GREY}
                />
                <Text
                  style={{
                    color: focused ? COLORS.PRIMARY : COLORS.GREY,
                    fontFamily: "semibold",
                  }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
          name="HomeScreen"
          component={HomeScreen}
        />

        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add-circle"
                size={SIZES.GIGANTIC * 3}
                color={COLORS.PRIMARY}
                style={styles.shadow}
              />
            ),
            tabBarButton: (props) => <AddButton {...props} />,
          }}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="settings"
                  size={SIZES.GIGANTIC + 2}
                  color={focused ? COLORS.PRIMARY : COLORS.GREY}
                />
                <Text
                  style={{
                    color: focused ? COLORS.PRIMARY : COLORS.GREY,
                    fontFamily: "semibold",
                  }}
                >
                  Settings
                </Text>
              </View>
            ),
          }}
          name="SettingScreen"
          component={SettingScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.BLACK,
    elevation: 5,
  },
});
export default BottomTab;