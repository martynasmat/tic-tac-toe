function gameBoard() {
    let boardArray = [['', '', ''], ['', '', ''], ['', '', '']];
    let turns = 1;


    function checkAvailable(row, column) {
        if(boardArray[row][column] != '') {
            return false;
        }else {
            return true;
        }
    };

    
    function makeMove(row, column, marker) {
        if(checkAvailable(row, column)) {
            boardArray[row][column] = marker;
            this.incrementTurns();
        };
    };


    function getBoard() {
        return boardArray;
    };


    function clearBoard() {
        boardArray = [['', '', ''], ['', '', ''], ['', '', '']];
    };


    function incrementTurns() {
        turns += 1;
    };

    
    function getTurns() {
        return turns;
    };


    function gameOver(display, winningSquareArray, turnCount, winner) {
        const board = display.getBoardElement();
        board.classList.add("game-over");
        if(turnCount != 10) {
            display.addWinnerClass(winningSquareArray);
        }else {
            console.log("TIE");
            display.addTieClass();
        };
        display.removeActiveClass();
        display.removeEvtListener();
        display.displayFinalText(winner);
    };

    
    function checkWin() {
        // if no win condition is satisfied return 0
        // if player 1 won return 1
        // if player 2 won return 2
        let winningSquarePosArray = [[], [], []];
        for(let i = 0; i < 3; i++) {
            // check row
            if(boardArray[i][0] === boardArray[i][1] && boardArray[i][1] === boardArray[i][2]) {
                winningSquarePosArray = [[i, 0], [i, 1], [i, 2]];
                if(boardArray[i][0] === "X") {
                    return [1, winningSquarePosArray];
                }else if(boardArray[i][0] === "O"){
                    return [2, winningSquarePosArray];
                };
            };
            // check column
            if(boardArray[0][i] === boardArray[1][i] && boardArray[1][i] === boardArray[2][i]) {
                winningSquarePosArray = [[0, i], [1, i], [2, i]];
                if(boardArray[0][i] === "X") {
                    return [1, winningSquarePosArray];
                }else if(boardArray[0][i] === "O"){
                    return [2, winningSquarePosArray];
                };
            };
        };
        // check diagonals
        if(boardArray[0][0] === boardArray[1][1] && boardArray[1][1] === boardArray[2][2]) {
            winningSquarePosArray = [[0, 0], [1, 1], [2, 2]];
            if(boardArray[0][0] === "X") {
                return [1, winningSquarePosArray];
            }else if(boardArray[0][0] === "O"){
                return [2, winningSquarePosArray];
            };
        } else if(boardArray[0][2] === boardArray[1][1] && boardArray[1][1] === boardArray[2][0]) {
            winningSquarePosArray = [[0, 2], [1, 1], [2, 0]];
            if(boardArray[0][2] === "X") {
                return [1, winningSquarePosArray];
            }else if(boardArray[0][2] === "O"){
                return [2, winningSquarePosArray];
            };
        };
        return [0, []];
    };


    return {
        getBoard,
        checkWin,
        clearBoard,
        makeMove,
        checkAvailable,
        incrementTurns,
        getTurns,
        gameOver,
    };
};


function player(element, marker) {
    let name = element.value;
    if(!name) {
        name = element.getAttribute("defaultValue");
    };


    function getMarker() {
        return marker;
    };


    function getName() {
        return name;
    };


    return {
        getName,
        getMarker,
    };
};


function displayController() {
    const boardElement = document.querySelector(".board-wrapper");


    function addTieClass() {
        getBoardSquares().forEach((square) => {
            square.classList.add("tie");
        });
    };


    function removeEvtListener() {
        getBoardSquares().forEach((square) => {
            square.removeEventListener("click", (evt) => {
                squareEventHandler(evt, playerOneObj, playerTwoObj, gameBoardObj, displayControllerObj);
            });
        });
    };


    function displayFinalText(winnerObj) {
        if(!winnerObj.tie) {
            
        }else {

        };
    };


    function addDisappearClass() {
        getBoardSquares().forEach((square) => {
            square.classList.add("disappear");
        });
    }


    function deleteChildren() {
        console.log('kas daros nx');
        while(boardElement.hasChildNodes()) {
            boardElement.firstChild.remove();
        };
    };


    function removeActiveClass() {
        for(square of getBoardSquares()) {
            square.classList.remove("active");
        };
    };


    function createBoardSquares(board) {
        for(let i = 0; i < board.length; i++) {
            const row = board[i];
            for(let j = 0; j < row.length; j++) {
                const cell = document.createElement("div");
                cell.setAttribute("class", "square active");
                cell.setAttribute("id", `${i} ${j}`)
                cell.textContent = row[j];
                boardElement.appendChild(cell);
            };
        };
    };


    function updateBoardSquares(board) {
        const boardSquares = document.querySelectorAll(".square");
        boardSquares.forEach((square) => {
            squarePos = square.getAttribute("id").split(" ");
            squareRow = squarePos[0];
            squareColumn = squarePos[1];
            square.textContent = board[squareRow][squareColumn];
        });
    };


    function addWinnerClass(squareArray) {
        for(let i = 0; i < 3; i++) {
            document.getElementById(`${squareArray[i][0]} ${squareArray[i][1]}`).classList.add("winner");
        };
    };


    function getBoardElement() {
        return boardElement;
    };


    function getBoardSquares() {
        return document.querySelectorAll(".square");
    };


    return {
        createBoardSquares,
        updateBoardSquares,
        deleteChildren,
        getBoardSquares,
        removeActiveClass,
        getBoardElement,
        addWinnerClass,
        addTieClass,
        addDisappearClass,
        displayFinalText,
        removeEvtListener,
    };
};


function checkReady(buttons) {
    let ready = true;
    buttons.forEach((button) => {
        if(!(button.classList.contains("ready"))) {
            ready = false;
        };
    });
    return ready;
};


function disablePlayerOptions() {
    const buttons = document.querySelectorAll(".player-ready-button");
    buttons.forEach((button) => {
        button.disabled = true;
    });

    const inputs = document.querySelectorAll("#player-one-name, #player-two-name");
    inputs.forEach((input) => {
        input.disabled = true;
    });
};


function enablePlayerOptions() {
    const buttons = document.querySelectorAll(".player-ready-button");
    buttons.forEach((button) => {
        button.disabled = false;
    });
    
    const inputs = document.querySelectorAll("#player-one-name, #player-two-name");
    inputs.forEach((input) => {
        input.disabled = false;
    });
};


function squareEventHandler(evt, playerOneObj, playerTwoObj, gameBoardObj, displayControllerObj) {
    const squarePos = evt.target.getAttribute("id").split(" ");
    const row = squarePos[0];
    const column = squarePos[1];
    let activePlayer = playerOneObj;
    if(gameBoardObj.getTurns() % 2 === 0) {
        activePlayer = playerTwoObj;
    };
    gameBoardObj.makeMove(row, column, activePlayer.getMarker());
    displayControllerObj.updateBoardSquares(gameBoardObj.getBoard());
    let winCheck = gameBoardObj.checkWin();
    if(winCheck[0] === 1) {
        gameBoardObj.gameOver(displayControllerObj, winCheck[1], gameBoardObj.getTurns(), playerOneObj);
    }else if(winCheck[0] === 2){
        gameBoardObj.gameOver(displayControllerObj, winCheck[1], gameBoardObj.getTurns(), playerTwoObj);
    }else if(gameBoardObj.getTurns() === 10) {
        const tieObj = player();
        tieObj.tie = true;
        gameBoardObj.gameOver(displayControllerObj, winCheck[1], gameBoardObj.getTurns(), tieObj);
    };
};


function game() {
    const gameBoardObj = gameBoard();
    const displayControllerObj = displayController();
    const playerOneObj = player(document.querySelector("#player-one-name"), "X");
    const playerTwoObj = player(document.querySelector("#player-two-name"), "O"); 
    displayControllerObj.createBoardSquares(gameBoardObj.getBoard());
    displayControllerObj.getBoardSquares().forEach((square) => {
        square.addEventListener("click", (evt) => {
            squareEventHandler(evt, playerOneObj, playerTwoObj, gameBoardObj, displayControllerObj);
        });
    });
}


const gameStartBtn = document.querySelector(".start-game-button");
gameStartBtn.addEventListener("click", () => {
    // when the start button is clicked, disable all buttons and start game
    gameStartBtn.disabled = true;
    disablePlayerOptions();
    game();
});

const readyButtons = document.querySelectorAll(".player-ready-button");
readyButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
        evt.target.classList.toggle("ready");
        evt.target.parentNode.parentNode.classList.toggle("container-ready");
        // if both players are ready, enable the start button, else disable
        readyButtons.forEach(() => {
            if(checkReady(readyButtons)) {
                gameStartBtn.disabled = false;
            }else {
                gameStartBtn.disabled = true;
            };
        });
    });
});
