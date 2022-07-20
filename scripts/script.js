function gameBoard() {
    let boardArray = [['1.1', '1.2', '1.3'], ['2.1', '2.2', '2.3'], ['3.1', '3.2', '3.3']];


    function getBoard() {
        return boardArray;
    };


    return {
        getBoard,
    };
};


function player(element) {
    let name = element.value;
    if(!name) {
        name = element.getAttribute("defaultValue");
    };

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


const gameStartBtn = document.querySelector(".start-game-button");
gameStartBtn.addEventListener("click", (e) => {
    const gameBoardObj = gameBoard();
    const displayControllerObj = displayController();
    const playerOneObj = player(document.querySelector("#player-one-name"));
    const playerTwoObj = player(document.querySelector("#player-two-name")); 
    // if a game is active, disable all buttons
    gameStartBtn.disabled = true;
    disablePlayerOptions();
});

const readyButtons = document.querySelectorAll(".player-ready-button");
readyButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
        evt.target.classList.toggle("ready");
        evt.target.parentNode.parentNode.classList.toggle("container-ready");
        // if both players are ready, disable the start button
        readyButtons.forEach(() => {
            if(checkReady(readyButtons)) {
                gameStartBtn.disabled = false;
            }else {
                gameStartBtn.disabled = true;
            };
        });
    });
});
