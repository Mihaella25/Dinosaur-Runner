const dinosaur = document.getElementById("dinosaur");
const gameContainer = document.querySelector(".game-container");
const gameOverMessage = document.getElementById("game-over");
const scoreDisplay = document.createElement("div");
scoreDisplay.id = "score-display";
gameContainer.appendChild(scoreDisplay);

let isJumping = false;
let isGameOver = false;
let startTime = null;
let score = 0;

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping && !isGameOver) {
        if (startTime === null) {
            startTime = performance.now();
        }
        jump();
    }
});

function jump() {
    if (!isJumping && !isGameOver) {
        isJumping = true;
        let position = 0;
        const jumpInterval = setInterval(() => {
            if (position >= 100) {
                clearInterval(jumpInterval);
                let downInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    position -= 5;
                    dinosaur.style.bottom = position + "px";
                }, 20);
            }
            position += 20;
            dinosaur.style.bottom = position + "px";
        }, 20);
    }
}

function createObstacle() {
    if (!isGameOver) {
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        gameContainer.appendChild(obstacle);

        let obstaclePosition = gameContainer.offsetWidth;
        obstacle.style.left = obstaclePosition + "px";

        const moveInterval = setInterval(() => {
            if (obstaclePosition <= -50) {
                clearInterval(moveInterval);
                obstacle.remove();
            }
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + "px";

            const dinosaurRect = dinosaur.getBoundingClientRect();
            const obstacleRect = obstacle.getBoundingClientRect();

            if (
                dinosaurRect.left < obstacleRect.right &&
                dinosaurRect.right > obstacleRect.left &&
                dinosaurRect.bottom > obstacleRect.top
            ) {
                gameOver();
            }
        }, 20);
    }
}

function gameOver() {
    isGameOver = true;
    clearInterval(scoreInterval);
    gameOverMessage.style.display = "block";
    gameOverMessage.innerHTML = `GAME OVER ! Your score: ${score}`;
}

const scoreInterval = setInterval(() => {
    if (!isGameOver) {
        score = Math.floor(performance.now() - startTime);
        scoreDisplay.innerHTML = `Score: ${score}`;
    }
}, 100);

setInterval(createObstacle, 1000);