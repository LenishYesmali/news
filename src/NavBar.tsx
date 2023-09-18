/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';

import Icons from 'react-native-vector-icons/Ionicons';

export default function NavBar() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Icons name="menu" size={40} color="black" />
      <Image
        source={require('../assets/Images/user1.jpg')}
        style={{height: 45, width: 45, borderRadius: 50}}
      />
    </View>
  );
}
