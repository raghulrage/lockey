import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import { GestureHandlerRootView,Swipeable } from "react-native-gesture-handler";
import ListCard from './ListCard';
import ListDelete from './ListDelete';

const SwipebleCard = (props) => {
  const renderRightActions = (progress, dragX) => {
    return <ListDelete data={props.data} refresh={props.refresh}/>;
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        useNativeAnimations={true}
        renderRightActions={renderRightActions}
      >
        <ListCard data={props.data} navigation={props.navigation} refresh={props.refresh}/>
      </Swipeable>
    </GestureHandlerRootView>
  );
} 

const styles = StyleSheet.create({}) 

 export default SwipebleCard;