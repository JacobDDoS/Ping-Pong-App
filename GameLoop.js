import Constants from "./Constants";
let isUserPressingDownButton = false;
let isUserPressingUpButton = false;
let ballSpeedX = -0.2;
let ballSpeedY = 0.0;
let ballSpeedUp = 0.01;
let paddleSpeed = 0.2;
let paddleSpeedUp = 0.01
let hasBallGonePastPaddle = false;
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
    // playerPaddle.nextMove -= 2;
    // if (playerPaddle.nextMove <= 0) {
    // playerPaddle.nextMove = playerPaddle.updateFrequency;
    if (!(Math.floor(playerPaddle.position[0])+4+paddleSpeed > Constants.Y_GRID_SIZE) && isUserPressingUpButton){
        // playerPaddle.xspeed = 1;
        playerPaddle.position[0]+=paddleSpeed;
    } else if (!(playerPaddle.position[0]-paddleSpeed <= 0) && isUserPressingDownButton) {
        playerPaddle.position[0]-=paddleSpeed;
    } else if (isUserPressingUpButton) {
        playerPaddle.position[0] = Constants.Y_GRID_SIZE - 4;
    } else if (isUserPressingDownButton) {
        playerPaddle.position[0] = 0;
    }
    // } 

    //Move ball
    // ball.nextMove -= 1.25;
    // if (ball.nextMove <= 0) {
        // ball.nextMove = Constants.BALL_REFRESH_RATE - ballRefreshSpeedUp;
    ball.position[0] += ballSpeedY;
    ball.position[1] += ballSpeedX;
    if (!hasBallGonePastPaddle) {
        ball.position[1] = Math.max(0.98, ball.position[1])
    }
    ball.position[1] = Math.min(Constants.X_GRID_SIZE-1, ball.position[1])
    ball.position[0] = Math.max(0, ball.position[0])
    ball.position[0] = Math.min(Constants.Y_GRID_SIZE-1, ball.position[0])

    //Check to see if ball is hitting paddle
    if (ball.position[1] == 0.98) {
        if ((playerPaddle.position[0] <= ball.position[0]+1 && ball.position[0] <= playerPaddle.position[0]+4)) {
            ballSpeedX *= -1;
            ballSpeedY += (Math.random() - 0.5)/5;
            ballSpeedX += ballSpeedUp;
            paddleSpeed += paddleSpeedUp;
        } else {
            // Ball has gone past paddle
            hasBallGonePastPaddle = true;
        }
    }

    //Check to see if user has lost
    if (ball.position[1] <= -0.2) {
        ballSpeedX = -0.2;
        ballSpeedY = 0.0;
        ball.position[0] = 10;
        ball.position[1] = 13;
        paddleSpeed = 0.2;
        hasBallGonePastPaddle = false;
    }

    //Check to see if ball is hitting top wall
    if (ball.position[0]>=Constants.Y_GRID_SIZE-1) {
        ballSpeedY *= -1;
    }
    //Check to see if ball is hitting right wall
    // console.log(ball.position[1])
    if (ball.position[1]>=Constants.X_GRID_SIZE-1) {
        ballSpeedX *= -1;
    }
    //Check to see if ball is hitting bottom wall
    if (ball.position[0]<=0) {
        ballSpeedY *= -1;
    }
// }

    return entities;
}

export default GameLoop