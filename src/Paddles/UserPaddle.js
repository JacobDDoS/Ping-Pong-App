import React from 'react';
import { View } from 'react-native';

const UserPaddle = (props) => {
    const x = props.position[0];
    const y = props.position[1];
  return <View style={{ width: props.size*4, height: props.size, backgroundColor:'red', position: "absolute", left: x*props.size, top: y*props.size}}/>
};

export default UserPaddle;
