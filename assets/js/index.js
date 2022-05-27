import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here
const createBoardLayout = () => {
    let container = document.createElement('div');
    container.setAttribute("class", "board");

    document.body.appendChild(container);
}

const populateCells = () => {
    let boardScheme = board.grid;
    let boardColumnLength = boardScheme.length;
    // console.log(boardColumnLength);
    let boardRowLength = boardScheme[0].length;
    // console.log(boardRowLength);

    //create for cells with data attribute, class, id
    for (let row = 0; row < boardRowLength; row++) {
        for (let column = 0; column < boardColumnLength; column++) {
            let cell = document.createElement('div');
            cell.setAttribute("class", "cell");

            let coordinate = [row, column];
            let coordinateString = coordinate.join(",");

            cell.dataset.coordinate = coordinateString;

            let container = document.querySelector(".board");

            container.appendChild(cell);
        }
    }
}

// Selecting/clicking a Cell to check if hit or miss and turn color of cell red or green, respectively

const clickingCell = (cell) => {
    let coordinateAtt = cell.dataset.coordinate;
            //row,col
            let coordinate = coordinateAtt.split(",");
            let [row, col] = coordinate
            let shot = board.makeHit(row, col);

            if(board.isGameOver() === false){
                if (shot) {
                    cell.classList.add("hit");
                    cell.innerText = shot;
                }
                else {
                    cell.classList.add("miss");
                }  
            }
}

const cellShot = () => {
    let allCells = document.querySelectorAll(".cell");
    allCells.forEach(cell => {
        cell.addEventListener("click", event => {
            clickingCell(cell);
            event.stopPropagation();
        })
    });
}

const gameOver = () => {
    if(board.isGameOver()){
        console.log('game over')
        let allCells = document.querySelectorAll(".cell")
        allCells.forEach(cell => {
            cell.removeEventListener("click", clickingCell);
        });
    }
}

window.onload = () => {
    createBoardLayout();
    populateCells();
    cellShot();
    gameOver();

}