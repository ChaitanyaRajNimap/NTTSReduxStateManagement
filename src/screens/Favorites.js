import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GLOBALSTYLE, COLORS} from '../constants/Theme';

const Favorites = () => {
  return (
    <View style={GLOBALSTYLE.rootContainerStyle}>
      <Text style={GLOBALSTYLE.headingStyle}>Fav Movie Screen</Text>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
