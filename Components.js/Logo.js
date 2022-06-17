import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'; 

const Logo = (props) => {

    return (
      <Image
        style={{ height: 48 * 2, width: 84 * 2, alignSelf: "center" }}
        source={require("../assets/Images/Logo.png")}
      />
    );
} 

const styles = StyleSheet.create({}) 

 export default Logo;