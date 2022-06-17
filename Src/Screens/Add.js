import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import { StatusBar } from 'expo-status-bar';

const AddScreen = (props) => {
    return (
      <View style={styles.container}>
        <Text>Add Password Screen</Text>
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

 export default AddScreen;