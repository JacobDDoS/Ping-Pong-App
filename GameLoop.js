import Constants from "./Constants";
let isUserPressingDownButton = false;
let isUserPressingUpButton = false;
let ballSpeedX = -1;
let ballSpeedY = 0;
let ballRefreshSpeedUp = 0;
const GameLoop = (entities, { touches, dispatch, events}) => {
    let playerPaddle = entities.playerPaddle
    let ball = entities.ball
    
    //Set the state based on the events (button presses or releases)
    if (events.length) {
        for (let i=0;i<events.length;i++) {
            if(events[i] === "move-up") {
                isUserPressingUpButton = true;
            } else if (events[i] === "move-up-finish") {
                isUserPressingUpButton = false;
            } else if (events[i] === "move-down") {
                isUserPressingDownButton = true;
            } else if (events[i] === "move-down-finish") {
                isUserPressingDownButton = false;
            }
        }
    }

    //Move player's paddle 
    playerPaddle.nextMove -= 2;
    if (playerPaddle.nextMove <= 0) {
        playerPaddle.nextMove = playerPaddle.updateFrequency;
        if (!(playerPaddle.position[0]+4 >= Constants.Y_GRID_SIZE) && isUserPressingUpButton){
            // playerPaddle.xspeed = 1;
            playerPaddle.position[0]+=1;
        } else if (!(playerPaddle.position[0] <= 0) && isUserPressingDownButton) {
            playerPaddle.position[0]-=1;
        }
    } 

    //Move ball
    ball.nextMove -= 1.25;
    if (ball.nextMove <= 0) {
        ball.nextMove = Constants.BALL_REFRESH_RATE - ballRefreshSpeedUp;
        ball.position[0] += ballSpeedY;
        ball.position[1] += ballSpeedX;
        ball.position[1] = Math.max(1, ball.position[1])
        ball.position[1] = Math.min(Constants.X_GRID_SIZE-1, ball.position[1])
        ball.position[0] = Math.max(0, ball.position[0])
        ball.position[0] = Math.min(Constants.Y_GRID_SIZE-1, ball.position[0])

        //Check to see if ball is hitting paddle
        if (ball.position[1] <= 1.3) {
            if (playerPaddle.position[0] <= ball.position[0] && ball.position[0] <= playerPaddle.position[0]+4) {
                ballSpeedX *= -1;
                ballSpeedY += Math.random() / 2;
                ballRefreshSpeedUp += Constants.BALL_REFRESH_RATE_SPEED_UP_RATE
            } else {
                // Player lost
                ballSpeedX = -1;
                ballSpeedY = 0;
                ball.position[0] = 10;
                ball.position[1] = 13;
                ballRefreshSpeedUp = 0;
            }
        }

        //Check to see if ball is hitting top wall
        if (ball.position[0]>=Constants.Y_GRID_SIZE-1.3) {
            ballSpeedY *= -1;
            ballRefreshSpeedUp += Constants.BALL_REFRESH_RATE_SPEED_UP_RATE
        }
        //Check to see if ball is hitting right wall
        if (ball.position[1]>=Constants.X_GRID_SIZE-1.3) {
            ballSpeedX *= -1;
            ballRefreshSpeedUp += Constants.BALL_REFRESH_RATE_SPEED_UP_RATE
        }
        //Check to see if ball is hitting bottom wall
        if (ball.position[0]<=0.3) {
            ballSpeedY *= -1;
            ballRefreshSpeedUp += Constants.BALL_REFRESH_RATE_SPEED_UP_RATE
        }
    }

    return entities;
}

export default GameLoop