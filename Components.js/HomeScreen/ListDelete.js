import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../../Configs/Colors';
import SIZES from '../../Configs/Sizes';
import { PasswordTableDelete } from '../../Database/PasswordTable';
import { ToastNotification, TOAST_ALERT_TYPES } from '../ToastNotification';
const ListDelete = (props) => {
    
  const deleteItem = () => {
    PasswordTableDelete(props.data.id)
    props.refresh()
    ToastNotification(
      TOAST_ALERT_TYPES.SUCCESS,
      "SUCCESS!",
      "Password deleted successfully!!!"
    );
  }

    return (
      <TouchableOpacity onPress={deleteItem} style={styles.container}>
        <MaterialCommunityIcons name="delete-empty" size={SIZES.GIGANTIC} color={COLORS.RED} />
      </TouchableOpacity>
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