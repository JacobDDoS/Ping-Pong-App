import Constants from "./Constants";
let isUserPressingDownButton = false;
let isUserPressingUpButton = false;
let ballSpeedX = -0.2;
let ballSpeedY = 0.0;
let ballSpeedUp = 0.01;
let paddleSpeed = 0.2;
let AIPaddleSpeed = 0.2;
let paddleSpeedUp = 0.01
let hasBallGonePastPaddle = false;
const GameLoop = (entities, { touches, dispatch, events}) => {
    //Entities
    let playerPaddle = entities.playerPaddle
    let AIPaddle = entities.AIPaddle
    let ball = entities.ball
    let scoreEntity = entities.score
    
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

    //-------------------Player Paddle-------------------------

    //Move player's paddle
    //If the current position plus how much it goes up/down is out of bounds, then set the position manually 
    if (!(Math.floor(playerPaddle.position[0])+4+paddleSpeed > Constants.Y_GRID_SIZE) && isUserPressingUpButton){
        playerPaddle.position[0]+=paddleSpeed;
    } else if (!(playerPaddle.position[0]-paddleSpeed <= 0) && isUserPressingDownButton) {
        playerPaddle.position[0]-=paddleSpeed;
    } else if (isUserPressingUpButton) {
        playerPaddle.position[0] = Constants.Y_GRID_SIZE - 4;
    } else if (isUserPressingDownButton) {
        playerPaddle.position[0] = 0;
    }

    //Move ball
    ball.position[0] += ballSpeedY;
    ball.position[1] += ballSpeedX;
    if (!hasBallGonePastPaddle) {
        ball.position[1] = Math.max(0.98, ball.position[1])
    }
    ball.position[0] = Math.max(0, ball.position[0])
    ball.position[0] = Math.min(Constants.Y_GRID_SIZE-1, ball.position[0])

    //Check to see if ball is hitting paddle
    if (ball.position[1] == 0.98) {
        if ((playerPaddle.position[0] <= ball.position[0]+1 && ball.position[0] <= playerPaddle.position[0]+4)) {
            ballSpeedX *= -1;
            ballSpeedY += (Math.random() - 0.5)/5;
            ballSpeedX += ballSpeedUp;
            paddleSpeed += paddleSpeedUp;
            scoreEntity.setScore(scoreEntity.score+1)
            scoreEntity.score += 1;
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
        AIPaddleSpeed = 0.2;
        hasBallGonePastPaddle = false;
        scoreEntity.setScore(0)
        scoreEntity.score = 0;
    }

//------------------- AI Paddle --------------------------
    //Don't set the position if the ball has gone past the paddle
    if (!hasBallGonePastPaddle) {
        ball.position[1] = Math.min(Constants.X_GRID_SIZE-2, ball.position[1])
    }
    //Move paddle based on ball
    //If ball is higher than half the paddle and more than 1 cell away, move up
    //If ball is lower than half the paddle and more than 1 cell away, move down
    if (ball.position[0] > AIPaddle.position[0]+2 && Math.abs(ball.position[0] - (AIPaddle.position[0]+2)) >= 1 && AIPaddle.position[0] + 4 + AIPaddleSpeed < Constants.Y_GRID_SIZE) {
        AIPaddle.position[0] += AIPaddleSpeed;
    } else if (ball.position[0] > AIPaddle.position[0]+2 && Math.abs(ball.position[0] - (AIPaddle.position[0]+2)) >= 1) {
        AIPaddle.position[0] = Constants.Y_GRID_SIZE-4;
    } else if (ball.position[0] < AIPaddle.position[0]+2 && Math.abs(ball.position[0] - (AIPaddle.position[0]+2)) >= 1 && AIPaddle.position[0] - AIPaddleSpeed >= 0) {
        AIPaddle.position[0] -= AIPaddleSpeed;
    } else if (ball.position[0] < AIPaddle.position[0]+2 && Math.abs(ball.position[0] - (AIPaddle.position[0]+2)) >= 1) {
        AIPaddle.position[0] = 0;
    }

    //Check to see if ball is hitting paddle
    if (ball.position[1] == Constants.X_GRID_SIZE-2) {
        if ((AIPaddle.position[0] <= ball.position[0]+1 && ball.position[0] <= AIPaddle.position[0]+4)) {
            ballSpeedX *= -1;
            ballSpeedY += (Math.random() - 0.5)/5;
            ballSpeedX -= ballSpeedUp;
            AIPaddleSpeed += paddleSpeedUp/2;
        } else {
            // Ball has gone past paddle
            hasBallGonePastPaddle = true;
        }
    }

    //Check to see if user has lost
    if (ball.position[1] >= Constants.X_GRID_SIZE-1.8) {
        ballSpeedX = -0.2;
        ballSpeedY = 0.0;
        ball.position[0] = 10;
        ball.position[1] = 13;
        paddleSpeed = 0.2;
        AIPaddleSpeed = 0.2;
        hasBallGonePastPaddle = false;
        scoreEntity.setScore(scoreEntity.score+10)
        scoreEntity.score += 10;
    }
// -------------- End of AI Paddle ------------------

    //Check to see if ball is hitting top wall
    if (ball.position[0]>=Constants.Y_GRID_SIZE-1) {
        ballSpeedY *= -1;
    }
    //Check to see if ball is hitting bottom wall
    if (ball.position[0]<=0) {
        ballSpeedY *= -1;
    }

    return entities;
}

export default GameLoop