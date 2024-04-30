const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gamegrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// let's create a function to initialise the game.

function initGame() {
    currentPlayer = "X";
    gamegrid = ["", "", "", "", "", "", "", "", ""];

    // UI par empty bhi krna pdenga boxes ko.
    boxes.forEach((box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";

        // initialise box with css properties again.

        box.classList =`box box${index+1}`;
    })

    // newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;

}
initGame();


function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    // UI update.
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value.
        if ((gamegrid[position[0]] != "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "")
            && (gamegrid[position[0]] === gamegrid[position[1]]) && (gamegrid[position[1]] === gamegrid[position[2]])) {
            // check if winner is X
            if (gamegrid[position[0]] === "X")
                answer = "X";
            else
                answer = '0';

                //disable pointer events.
                boxes.forEach((box) =>{
                    box.style.pointerEvents="none";
                })

                //now we know x/0 is a winner.

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // it means we have a winner.

    if(answer!=="")
    {
    gameInfo.innerText =`winner Player-${answer}`;
    newGameBtn.classList.add("active");
    return;

    }

    // we know , NO Winner Found, let's check whether there is tie.
    let fillCount =0;
    gamegrid.forEach((box) =>{
        if(box!==""){
            fillCount++;

        }
    });

    //  board is failled , game is Tie.
    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if (gamegrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gamegrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = 'none';

        //swap karo turn ko.
        swapTurn();

        //cheack koi jeeta toh nahii hai.
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

// game time 01:30 min.