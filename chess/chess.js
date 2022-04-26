//TODO: check for check and checkmate.

let selectedCell;
let boardData;
let playingPiece;
let departureCell;

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

chessTable = document.createElement("table");
chessBoard.appendChild(chessTable);

// function that returns a list of the chess pieces with their initial position on the board

function getInitialBoard() {
  let result = [];
  setPieces(result, 0, "black");
  setPieces(result, 7, "white");
  for (let i = 0; i < 8; i++) {
    result.push(new Piece(1, i, "black", PAWN));
    result.push(new Piece(6, i, "white", PAWN));
  }
  return result;
}

// function associated to getInitialBoard. Saves us double writing of code

function setPieces(result, row, type) {
  for (let i = 0; i < playerList.length; i++) {
    result.push(new Piece(row, i, type, playerList[i]));
  }
}

// function that adds an image to a cell

function addImage(cell, type, name) {
  const image = document.createElement("img");
  image.src = "static/" + type + "/" + name + ".png";
  cell.appendChild(image);
}

// event function that happens every click, shows potential moves, moves player

function onCellClick(event, row, col) {
  selectedCell = event.currentTarget;
  //this part of code is for the second click of a move, to move the piece to the desired tile
  if (departureCell !== undefined) {
    if (selectedCell.classList.contains("potential")) {
      boardData.makeMove(playingPiece, row, col);
      boardData.switchMoves();
    }
    boardData.cleanCells(departureCell);
  }
  //this part of code is for the first click of a move, to show the possibilitiy movement of a piece
  let piece = boardData.getPiece(row, col);
  if (piece != undefined) {
    if (piece.type === boardData.turn) {
      playingPiece = piece;
      departureCell = selectedCell;
      departureCell.classList.add("clicked");
      let possibleMoves = piece.getPossibleMoves(boardData);
      for (let possiblemove of possibleMoves) {
        chessTable.rows[possiblemove[0]].cells[possiblemove[1]].classList.add(
          "potential"
        );
      }
    }
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
      cell.addEventListener("click", (event) => onCellClick(event, i, j));
    }
  }
  // gets a piece and adds it image to the board by its initial position
  boardData = new BoardData(getInitialBoard());
  for (let piece of boardData.pieces) {
    addImage(
      chessTable.rows[piece.row].cells[piece.col],
      piece.type,
      piece.name
    );
  }
}

window.addEventListener("load", chessGame);