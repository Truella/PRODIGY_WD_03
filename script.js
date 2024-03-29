window.onload = () => {
  const tiles = document.querySelectorAll(".tile");
  const playerDisplay = document.querySelector(".display-player");
  const resetBtn = document.getElementById("reset");
  const announcer = document.querySelector(".announcer");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const PLAYERX_WON = "PLAYER X WON";
  const PLAYERO_WON = "PLAYER O WON";
  const TIE = "TIE";

  /*
    Indexes within the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
    */

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", ()=> UserAction(tile, index));
  });

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
        
    }
    if (roundWon) {
        announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }
    if (!board.includes('')) {
        announce(TIE);
    }
  }
  const announce = (type) =>{
    switch (type) {
        case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> won';
            break;
        case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> won';
            break;
        case TIE:
            announcer.innerHTML = "Tie";
            break;
    }
    announcer.classList.remove("hidden");
  }

  const isValidAction = (tile) =>{
    if (tile.innerText === "X" || tile.innerText === "O") {
        return false;
    }
    return true;
  }

  const updateBoard = (index) =>{
    board[index]= currentPlayer;
  }

  const changePlayer = () =>{
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  }
  const UserAction = (tile, index) =>{
    if (isValidAction(tile) && isGameActive) {
        tile.innerHTML = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
  }

  const resetBoard = ()=>{
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hidden");
    if (currentPlayer === "O") {
        changePlayer()
    }
    tiles.forEach(tile => {
        tile.innerText = "";
        tile.classList.remove("playerX");
        tile.classList.remove("playerO")
    });
}

  resetBtn.addEventListener("click", resetBoard);
};
