let boardData;
let playingPiece;

const PAWN = "pawn";
const ROOK = "rook";
const KNIGHT = "knight";
const BISHOP = "bishop";
const QUEEN = "queen";
const KING = "king";
const playerList = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];

const chessBoard = document.createElement("div");
chessBoard.classList.add("outline-board");
document.body.appendChild(chessBoard);

const chessTable = document.createElement("table");
chessBoard.appendChild(chessTable);

function showWinnerDialogue() {
  let winner = boardData.winner.charAt(0).toUpperCase() + boardData.winner.slice(1);
  const winnerDialogue = document.createElement("div");
  winnerDialogue.classList.add("winner");
  winnerDialogue.textContent = winner + " Wins!";
  chessBoard.appendChild(winnerDialogue);
}

// function that returns a list of the chess pieces with their initial position on the board
function getInitialBoard() {
  let result = [];
  for (let i = 0; i < playerList.length; i++) {
    result.push(new Piece(0, i, "black", playerList[i]));
    result.push(new Piece(7, i, "white", playerList[i]));
    result.push(new Piece(1, i, "black", PAWN));
    result.push(new Piece(6, i, "white", PAWN));
  }
  return result;
}

// function that adds an image to a cell
function addImage(cell, type, name) {
  const image = document.createElement("img");
  image.src = "static/" + type + "/" + name + ".png";
  image.draggable = false;
  cell.appendChild(image);
}

// event function that happens every click, shows potential moves, moves player
function onCellClick(row, col) {
  //this part of code is for the second click of a move, to move the piece to the desired tile
  if (playingPiece !== undefined) {
    if (chessTable.rows[row].cells[col].classList.contains("potential")) {
      boardData.makeMove(playingPiece, row, col);
      boardData.switchMoves();
    }
    boardData.cleanCells();
  }
  if (boardData.winner === undefined) {
    //this part of code is for the first click of a move, to show the possibilitiy movement of a piece
    playingPiece = boardData.getPiece(row, col);
    if (playingPiece != undefined && playingPiece.type === boardData.turn) {
      chessTable.rows[playingPiece.row].cells[playingPiece.col].classList.add("clicked");
      playingPiece.paintPossibleMoves(boardData);
    } else {
      playingPiece = undefined;
    }
  } else {
    showWinnerDialogue();
  }
}

//function that makes the 8*8 board and initializes board
function chessGame() {
  for (let i = 0; i < 8; i++) {
    let row = chessTable.insertRow(i);
    for (let j = 0; j < 8; j++) {
      let cell = row.insertCell(j);
      if ((i + j) % 2 == 0) {
        cell.classList.add("light");
      } else {
        cell.classList.add("dark");
      }
      cell.addEventListener("click", () => onCellClick(i, j));
    }
  }
  // gets a piece and adds it image to the board by its initial position
  boardData = new BoardData(getInitialBoard());
  for (let piece of boardData.pieces) {
    addImage(chessTable.rows[piece.row].cells[piece.col], piece.type, piece.name);
  }
}

window.addEventListener("load", chessGame);
