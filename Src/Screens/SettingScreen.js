import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import { StatusBar } from 'expo-status-bar';

const SettingScreen = (props) => {
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
        <StatusBar style="auto" />
      </View>
    );

} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

 export default SettingScreen;