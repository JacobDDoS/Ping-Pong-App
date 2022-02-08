import { GameEngine } from "react-native-game-engine";
import React, { useRef } from "react";
import Constants from "./Constants";
import Ball from "./src/Ball";
import UserPaddle from "./src/Paddles/UserPaddle";
import { StyleSheet, View, TouchableOpacity} from "react-native";
import GameLoop from "./GameLoop";


export default function Pong() {
  const XBoardSize = Constants.X_GRID_SIZE * Constants.CELL_SIZE;
  const YBoardSize = Constants.Y_GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);
  return (
    <View style={styles.canvas}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPressIn={()=>engine.current.dispatch("move-down")} onPressOut={()=>engine.current.dispatch("move-down-finish")}>
          <View style={{width: Constants.MAX_WIDTH/2-10, height: 80, backgroundColor: 'green'}}></View>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={()=>engine.current.dispatch("move-up")} onPressOut={()=>engine.current.dispatch("move-up-finish")}>
          <View style={{width: Constants.MAX_WIDTH/2-10, height: 80, backgroundColor: 'blue'}}></View>
        </TouchableOpacity>
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
                ball: {position: [10, 13], xspeed: 0, yspeed: 0, updateFrequency: 10, nextMove: 10, size: Constants.CELL_SIZE, renderer: <Ball/>}
              }}
            />
    </View>
  )
}
const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
