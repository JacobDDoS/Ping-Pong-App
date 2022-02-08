import { Dimensions } from "react-native";
export default {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  X_GRID_SIZE: 25,
  Y_GRID_SIZE: 20,
  CELL_SIZE: 20,
  BALL_REFRESH_RATE: 10,
  BALL_REFRESH_RATE_SPEED_UP_RATE: 0.2,
};