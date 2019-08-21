const openSquares = document.querySelectorAll(".open");
const centerSquare = document.getElementById("sqr_2-2");
const cornerSquares = document.querySelectorAll(".corner");
const topRow = document.querySelectorAll(".top-row");
const middleRow = document.querySelectorAll(".middle-row");
const bottomRow = document.querySelectorAll(".bottom-row");
const leftColumn = document.querySelectorAll(".left-column");
const middleColumn = document.querySelectorAll(".middle-column");
const rightColumn = document.querySelectorAll(".right-column");
const diagonalTtB = document.querySelectorAll(".diagonal-TtB");
const diagonalBtT = document.querySelectorAll(".diagonal-BtT");
const groups = [topRow, middleRow, bottomRow, leftColumn, middleColumn, rightColumn, diagonalTtB, diagonalBtT];
const gameOver = document.getElementById("game-over");
let playerTurn = true;
let roundCount = 0;
let openIndex;

function markO(square) {
    if (square.classList.value.includes("open")) {
        square.innerHTML = "O"
        square.classList.remove("open");
    } else {
        return;
    }
}

function checkForTwo(group, marker) {
    if (group[0].innerHTML === group[1].innerHTML && group[0].innerHTML === marker && group[2].classList.value.includes("open")) {
        openIndex = 2;
        return true;
    } else if (group[1].innerHTML === group[2].innerHTML && group[1].innerHTML === marker && group[0].classList.value.includes("open")) {
        openIndex = 0;
        return true;
    } else if (group[0].innerHTML === group[2].innerHTML && group[0].innerHTML === marker && group[1].classList.value.includes("open")) {
        openIndex = 1;
        return true;
    } 
    else {
        return false;
    }
}

function checkkAllForOs() {
    for (let i = 0; i < groups.length; i++) {
        if (checkForTwo(groups[i], "O")) {
            return true;
        }
    }
}

function checkkAllForXs() {
    for (let i = 0; i < groups.length; i++) {
        if (checkForTwo(groups[i], "X")) {
            return true;
        }
    }
}

function computerGo() {
    if (!playerTurn) {
        if (roundCount == 0) {
            if (centerSquare.classList.value.includes("open")) {
                markO(centerSquare);
            } else {
                markO(cornerSquares[0]);
            }
        } else if (checkkAllForOs()) {
            for (let i = 0; i < groups.length; i++) {
                if (checkForTwo(groups[i], "O")) {
                    markO(groups[i][openIndex]);
                    checkForGameOver();
                    return;
                }
            }
        } else if (checkkAllForXs()) {
            for (let i = 0; i < groups.length; i++) {
                if (checkForTwo(groups[i], "X")) {
                    markO(groups[i][openIndex]);
                }
            }
        } else if (cornerSquares[1].innerHTML === "X" && cornerSquares[2].innerHTML === "X" && middleRow[2].classList.value.includes("open")) {
            markO(middleRow[2]);
        } else if (middleRow[2].classList.value.includes("open")) {
            markO(middleRow[2]);
        } else if (topRow[1].classList.value.includes("open")) {
            markO(topRow[1]);
        } else if (middleRow[0].classList.value.includes("open")) {
            markO(middleRow[0]);
        } else {
            let currentOpenSquares = document.querySelectorAll(".open");
            markO(currentOpenSquares[0]);
        }
    }
    checkForGameOver();
    playerTurn = true;
    roundCount++;
}

function playerGo() {
    if (this.classList.value.includes("open")) {
        this.innerHTML = "X";
        this.classList.remove("open");
        playerTurn = false;
        checkForGameOver();
        computerGo();
    }
}

for (let i = 0; i < openSquares.length; i++) {
    openSquares[i].addEventListener("click", playerGo);
}

function checkForGameOver() {
    let currentOpenSquares = document.querySelectorAll(".open");
    for (let i = 0; i < groups.length; i++) {
        if (groups[i][0].innerHTML === groups[i][1].innerHTML && groups[i][0].innerHTML === groups[i][2].innerHTML && groups[i][0].innerHTML !== "") {
            for (let j = 0; j < currentOpenSquares.length; j++) {
                currentOpenSquares[j].classList.remove("open");
            }
            groups[i][0].style.background = "blue";
            groups[i][1].style.background = "blue";
            groups[i][2].style.background = "blue";
            gameOver.innerHTML = "GAME OVER";
        } else if (currentOpenSquares.length === 0) {
            gameOver.innerHTML = "GAME OVER";
        }
    }
}