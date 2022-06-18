import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import COLORS from '../../Configs/Colors';
import SIZES from '../../Configs/Sizes';
import { getRandomColor } from '../CustomFunctions';

const ListCard = (props) => {
  const { id, title, data, used, created_at, updated_at } = props.data;

  return (
    <View style={{...styles.container, borderColor : getRandomColor()}}>
      <Text style={styles.contentHead}>{title}</Text>
      <Text style={styles.contentSide}>used {used} time(s)</Text>
    </View>
  );
} 

const styles = StyleSheet.create({
    container : {
        backgroundColor : COLORS.WHITE,
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row",
        height : 60,
        marginHorizontal : 15,
        paddingHorizontal : 20,
        marginBottom : 10,
        marginTop : 5,
        elevation : 5,
        borderRadius: 5,
        borderLeftWidth : 5,
    },
    contentHead : {
        fontFamily: "semibold",
        fontSize : SIZES.LEGIBLE
    },
    contentSide : {
        color : COLORS.GREY
    }
}) 

 export default ListCard;