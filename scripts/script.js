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
        boardArray[row][column] = marker;
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

    
    function checkWin() {
        // if no win condition is satisfied return 0
        // if player 1 won return 1
        // if player 2 won return 2
        return 0;
    };


    return {
        getBoard,
        checkWin,
        clearBoard,
        makeMove,
        checkAvailable,
        incrementTurns,
        getTurns,
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

    function deleteBoardSquares() {
        const boardSquares = document.querySelectorAll(".square");
        for(square of boardSquares) {
            square.remove();
        };
    };


    function createBoardSquares(board) {
        for(let i = 0; i < board.length; i++) {
            const row = board[i];
            for(let j = 0; j < row.length; j++) {
                const cell = document.createElement("div");
                cell.setAttribute("class", "square");
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


    function getBoardSquares() {
        return document.querySelectorAll(".square");
    };


    return {
        createBoardSquares,
        updateBoardSquares,
        deleteBoardSquares,
        getBoardSquares,
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


function game() {
    const gameBoardObj = gameBoard();
    const displayControllerObj = displayController();
    const playerOneObj = player(document.querySelector("#player-one-name"), "X");
    const playerTwoObj = player(document.querySelector("#player-two-name"), "O"); 
    displayControllerObj.createBoardSquares(gameBoardObj.getBoard());
    displayControllerObj.getBoardSquares().forEach((square) => {
        square.addEventListener("click", (evt) => {
            const squarePos = evt.target.getAttribute("id").split(" ");
            const row = squarePos[0];
            const column = squarePos[1];
            let activePlayer = playerOneObj;
            if(gameBoardObj.getTurns() % 2 == 0) {
                activePlayer = playerTwoObj;
            };
            if(gameBoardObj.checkAvailable(row, column)) {
                gameBoardObj.makeMove(squarePos[0], squarePos[1], activePlayer.getMarker());
            }
            displayControllerObj.updateBoardSquares(gameBoardObj.getBoard());
            gameBoardObj.incrementTurns();
        });
    });
}


const gameStartBtn = document.querySelector(".start-game-button");
gameStartBtn.addEventListener("click", (e) => {
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
