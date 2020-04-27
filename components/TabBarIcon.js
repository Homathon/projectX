import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image } from 'react-native';
import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    // <Ionicons
    //   name={props.name}
    //   size={30}
    //   style={{ marginBottom: -3 }}
    //   color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    // />
    <Image
        source={props.src}
        fadeDuration={0}
        style={{width: 20, height: 20}}
      />
  );
}
