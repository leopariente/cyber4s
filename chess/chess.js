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

const chessBoard = document.createElement("div");
chessBoard.classList.add("outline-board");
document.body.appendChild(chessBoard);

chessTable = document.createElement("table");
chessBoard.appendChild(chessTable);

// class for chess piece. Has properties for their postition, color and name
class Piece {
  constructor(row, col, type, name) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.name = name;
  }

  // function that takes a piece and returns a list of its possible moves.

  getPossibleMoves(boardData) {
    let moves;
    if (this.name === PAWN) {
      moves = this.getPawnMoves(boardData);
    } else if (this.name === ROOK) {
      moves = this.getRookMoves(boardData);
    } else if (this.name === KNIGHT) {
      moves = this.getKnightMoves(boardData);
    } else if (this.name === BISHOP) {
      moves = this.getBishopMoves(boardData);
    } else if (this.name === QUEEN) {
      moves = this.getQueenMoves(boardData);
    } else if (this.name === KING) {
      moves = this.getKingMoves(boardData);
    }
    let filteredMoves = [];
    for (let absoluteMove of moves) {
      if (
        absoluteMove[0] >= 0 &&
        absoluteMove[0] <= 7 &&
        absoluteMove[1] >= 0 &&
        absoluteMove[1] <= 7
      ) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  // returns a list of possible moves for each direction

  getMovesInDirection(rowDirection, colDirection, boardData) {
    let result = [];
    for (let i = 1; i < 8; i++) {
      let position = [this.row + rowDirection * i, this.col + colDirection * i];
      if (boardData.isEmpty(position[0], position[1])) {
        result.push(position);
      } else if (boardData.isOponenent(position[0], position[1], this.type)) {
        result.push(position);
        return result;
      } else {
        return result;
      }
    }
    return result;
  }

  // this section of code returns a list of absolute moves for each chess piece

  getPawnMoves(boardData) {
    let result = [];
    let direction = -1;
    if (this.type === "black") {
      direction = 1;
    }
    let position = [this.row + direction, this.col];
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    }
    position = [this.row + direction, this.col + 1];
    if (boardData.isOponenent(position[0], position[1], this.type)) {
      result.push(position);
    }
    position = [this.row + direction, this.col - 1];
    if (boardData.isOponenent(position[0], position[1], this.type)) {
      result.push(position);
    }
    return result;
  }
  getRookMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(1, 0, boardData));
    result = result.concat(this.getMovesInDirection(-1, 0, boardData));
    result = result.concat(this.getMovesInDirection(0, 1, boardData));
    result = result.concat(this.getMovesInDirection(0, -1, boardData));
    return result;
  }
  getKnightMoves(boardData) {
    let result = [];
    let possibleMoves = [
      [2, 1],
      [-2, 1],
      [2, -1],
      [-2, -1],
      [1, 2],
      [-1, 2],
      [1, -2],
      [-1, -2],
    ];
    for (let move of possibleMoves) {
      let position = [this.row + move[0], this.col + move[1]];
      if (
        boardData.isEmpty(position[0], position[1]) ||
        boardData.isOponenent(position[0], position[1], this.type)
      ) {
        result.push(position);
      }
    }
    return result;
  }
  getBishopMoves(boardData) {
    let result = [];
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    return result;
  }
  getQueenMoves(boardData) {
    let result = [];
    result = result.concat(this.getBishopMoves(boardData));
    result = result.concat(this.getRookMoves(boardData));
    return result;
  }
  getKingMoves(boardData) {
    let result = [];
    let possibleMoves = [
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
    ];
    for (let move of possibleMoves) {
      let position = [this.row + move[0], this.col + move[1]];
      if (
        boardData.isEmpty(position[0], position[1]) ||
        boardData.isOponenent(position[0], position[1], this.type)
      ) {
        result.push(position);
      }
    }
    return result;
  }
}

// class for the "brain" of the game. arranges the position of pieces, and order of game

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
    this.turn = "white";
  }

  // function that recieves a tile on board and returns the piece that is on it.

  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isOponenent(row, col, type) {
    if (this.getPiece(row, col) !== undefined) {
      return this.getPiece(row, col).type !== type;
    }
    return false;
  }

  // function that moves the desired piece on the board and eats

  makeMove(piece, row, col) {
    if (piece.type === this.turn) {
      let eatenPiece = boardData.getPiece(row, col);
      if (eatenPiece !== undefined) {
        chessTable.rows[row].cells[col].removeChild(
          chessTable.rows[row].cells[col].firstElementChild
        );
        eatenPiece.row = undefined;
        eatenPiece.col = undefined;
      }
      chessTable.rows[piece.row].cells[piece.col].removeChild(
        chessTable.rows[piece.row].cells[piece.col].firstElementChild
      );
      addImage(chessTable.rows[row].cells[col], piece.type, piece.name);
      piece.row = row;
      piece.col = col;
      playingPiece = undefined;
    }
  }

  // function that switches turns between the white and black player

  switchMoves() {
    if (this.turn === "white") {
      this.turn = "black";
    } else {
      this.turn = "white";
    }
  }
}

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
  result.push(new Piece(row, 0, type, ROOK));
  result.push(new Piece(row, 1, type, KNIGHT));
  result.push(new Piece(row, 2, type, BISHOP));
  result.push(new Piece(row, 3, type, QUEEN));
  result.push(new Piece(row, 4, type, KING));
  result.push(new Piece(row, 5, type, BISHOP));
  result.push(new Piece(row, 6, type, KNIGHT));
  result.push(new Piece(row, 7, type, ROOK));
}

// function that adds an image to a cell

function addImage(cell, type, name) {
  const image = document.createElement("img");
  image.src = "static/" + type + "/" + name + ".png";
  cell.appendChild(image);
}

// event function that happens every click, shows potential moves, moves player

function onCellClick(event, row, col) {
  //this part of code is for the second click of a move, to move the piece to the desired tile
  if (selectedCell !== undefined) {
    selectedCell = event.currentTarget;
    if (selectedCell.classList.contains("potential")) {
      boardData.makeMove(playingPiece, row, col);
      boardData.switchMoves();
    }
    departureCell.classList.remove("clicked");
    let cellList = document.querySelectorAll("td.potential");
    for (cell of cellList) {
      cell.classList.remove("potential");
    }
  }
  //this part of code is for the first click of a move, to show the possibilitiy movement of a piece
  selectedCell = event.currentTarget;
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