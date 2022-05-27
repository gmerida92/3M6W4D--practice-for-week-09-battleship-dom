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

            if(board.showHit(row,column)){
                cell.innerText = board.showHit(row,column);
            }

            let container = document.querySelector(".board");

            container.appendChild(cell);
        }
    }
}

// Selecting/clicking a Cell to check if hit or miss and turn color of cell red or green, respectively

const clickingCell = () => { //TODO change to a name with handler in it.
            let e = window.event.target; //* how to access the event target from a listener.
            let coordinateAtt = e.dataset.coordinate;
            //row,col
            console.log('testerrr', e);
            let coordinate = coordinateAtt.split(",");
            let [row, col] = coordinate
            let shot = board.makeHit(row, col);

            console.log('test',board.numRemaining);

            if(board.isGameOver() === false){
                if (shot) {
                    e.classList.add("hit");
                    e.innerText = shot;
                }
                else {
                    e.classList.add("miss");
                }

            }
            else{
                if (shot) { //? here to fill the last shot in before the event gets stopped
                    e.classList.add("hit");
                    e.innerText = shot;
                }
                let cells = document.querySelectorAll('.cell');
                cells.forEach(el =>{
                    el.removeEventListener('click', clickingCell);
                })
            }


}

const cellShot = () => {
    let allCells = document.querySelectorAll(".cell");
    allCells.forEach(cell => {

        cell.addEventListener('click', clickingCell);

    });
}

window.onload = () => {
    createBoardLayout();
    populateCells();
    cellShot();



    // removeListen();

    // endGame();
    // gameOver();

}
