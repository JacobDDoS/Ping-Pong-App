import React from 'react';
import { View } from 'react-native';

//Score simply is an entity that allows the game to get the score and setScore function
const Score = (props) => {
  score = props.score;
  setScore = props.setScore
  return <View/>
};

export default Score;
