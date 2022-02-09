import { GameEngine } from "react-native-game-engine";
import React, { useRef, useState } from "react";
import Constants from "./Constants";
import Ball from "./src/Ball";
import UserPaddle from "./src/Paddles/UserPaddle";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import GameLoop from "./GameLoop";
import AIPaddle from "./src/Paddles/AIPaddle";
import { StatusBar } from "expo-status-bar";
import Score from "./src/Score.js";

export default function Pong() {
  const [score, setScore] = useState(0)
  const XBoardSize = Constants.X_GRID_SIZE * Constants.CELL_SIZE;
  const YBoardSize = Constants.Y_GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);
  return (
    <View style={styles.canvas}>
      <StatusBar hidden />
      <View style={{flex: 1, flexDirection: 'row', alignContent: 'flex-start'}}>
        <TouchableOpacity onPressIn={()=>engine.current.dispatch("move-down")} onPressOut={()=>engine.current.dispatch("move-down-finish")}>
          <View style={{width: Constants.MAX_WIDTH/2-60, height: 235, backgroundColor: 'green'}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={()=>engine.current.dispatch("move-up")} onPressOut={()=>engine.current.dispatch("move-up-finish")}>
          <View style={{width: Constants.MAX_WIDTH/2-60, height: 235, backgroundColor: 'blue'}}></View>
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: "white", transform: [{rotate: '90deg'}], fontSize: 69}}>
            {score}
          </Text>
        </View>
      </View>
      <GameEngine
              ref={engine}
              style={{
                width: YBoardSize,
                height: XBoardSize,
                flex: null,
                backgroundColor: "white",
              }}
              systems={[ GameLoop ]}
              entities={{
                playerPaddle: { position: [8, 0], xspeed:0, yspeed: 0, updateFrequency: 10, nextMove: 10, size: Constants.CELL_SIZE, renderer: <UserPaddle />},
                AIPaddle: { position: [8, Constants.X_GRID_SIZE-1], xspeed:0, yspeed: 0, updateFrequency: 10, nextMove: 10, size: Constants.CELL_SIZE, renderer: <AIPaddle />},
                ball: {position: [10, 13], xspeed: 0, yspeed: 0, updateFrequency: 10, nextMove: 10, size: Constants.CELL_SIZE, renderer: <Ball/>},
                score: {score: score, setScore: setScore, renderer: <Score/>}
              }}
            />
    </View>
  )
}
const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
