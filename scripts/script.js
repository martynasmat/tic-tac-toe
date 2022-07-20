function gameBoard() {
    let boardArray = [['1.1', '1.2', '1.3'], ['2.1', '2.2', '2.3'], ['3.1', '3.2', '3.3']];


    function getBoard() {
        return boardArray;
    };


    return {
        getBoard,
    };
};


function player(name) {


    function getName() {
        return name;
    };


    return {
        getName,
    };
};


function displayController() {


    function refreshBoard(board) {
        
    };


    return {
        refreshBoard,

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


const gameStartBtn = document.querySelector(".start-game-button");
gameStartBtn.addEventListener("click", (e) => {
    const gameBoardObj = gameBoard();
    const displayControllerObj = displayController();
    const playerOneObj = player();
    const playerTwoObj = player(); 
});

const readyButtons = document.querySelectorAll(".player-ready-button");
readyButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
        evt.target.classList.toggle("ready");
        evt.target.parentNode.parentNode.classList.toggle("container-ready");
        readyButtons.forEach(() => {
            if(checkReady(readyButtons)) {
                gameStartBtn.disabled = false;
            }else {
                gameStartBtn.disabled = true;
            };
        });
    });
});

