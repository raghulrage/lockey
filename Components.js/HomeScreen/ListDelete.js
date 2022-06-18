import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../../Configs/Colors';
import SIZES from '../../Configs/Sizes';
const ListDelete = (props) => {
    
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="delete-empty" size={SIZES.GIGANTIC} color={COLORS.RED} />
      </View>
    );
} 

const styles = StyleSheet.create({
    container : {
        backgroundColor : COLORS.WHITE,
        height : 60,
        width : 60,
        alignItems : "center",
        justifyContent : "center",
        elevation : 5,
        marginTop : 5,
        marginBottom : 10,
        marginRight : 15,
        borderRadius : 5,
    }
}) 

 export default ListDelete;