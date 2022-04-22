const chessBoard = document.createElement("div");
chessBoard.classList.add("outline-board")
document.body.appendChild(chessBoard);

let selectedCell;
let boardData;
let playingPiece;

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const QUEEN = 'queen';
const KING = 'king';

chessTable = document.createElement("table");
chessBoard.appendChild(chessTable);

class Piece {
  constructor(row, col, type, name){
    this.row = row;
    this.col = col;
    this.type = type;
    this.name = name;
  }
  // function that takes a piece and returns a list of its possible moves.

  getPossibleMoves() {
    let relativeMoves;
    if (this.name === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    }
    else if (this.name === ROOK){
      relativeMoves = this.getRookRelativeMoves();
    }
    else if (this.name === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves();
    }
    else if (this.name === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    }
    else if (this.name === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves();
    }
    else if (this.name === KING){
      relativeMoves = this.getKingRelativeMoves();
    }
    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      absoluteMoves.push([relativeMove[0] + this.row, relativeMove[1] + this.col]);
      }
    let filteredMoves = [];
    for(let absoluteMove of absoluteMoves) {
      if ((absoluteMove[0] >= 0 && absoluteMove[0] <= 7) && (absoluteMove[1] >= 0 && absoluteMove[1] <= 7)) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  // this section of code returns a list of relative moves for each chess piece

  getPawnRelativeMoves() {
    if(this.type === "black") {
    return [[1,0]];
    }
    else {
      return [[-1, 0]];
    }
  }
  getRookRelativeMoves() {
    let result = [];
    for(let i = 1; i < 8; i++) {
      result.push([i,0]);
      result.push([-i,0]);
      result.push([0,i]);
      result.push([0,-i]);
    }
    return result;
  }
  getKnightRelativeMoves() {
    let result = [];
    result.push([2, 1]);
    result.push([-2, 1]);
    result.push([2, -1]);
    result.push([-2, -1]);
    result.push([1, 2]);
    result.push([-1, 2]);
    result.push([1, -2]);
    result.push([-1, -2]);
    return result;
  }
  getBishopRelativeMoves() {
    let result = [];
    for(let i=1; i<8; i++) {
        result.push([i, i]);
        result.push([-i, -i]);
        result.push([i, -i]);
        result.push([-i, i]);
    }
    return result;
  }
  getQueenRelativeMoves() {
  let result = [];
  for(let i=1; i<8; i++) {
      result.push([i, i]);
      result.push([-i, -i]);
      result.push([i, -i]);
      result.push([-i, i]);
      result.push([i,0]);
      result.push([-i,0]);
      result.push([0,i]);
      result.push([0,-i]);
  }
  return result;
  }
  getKingRelativeMoves() {
    let result = [];
        result.push([1, 1]);
        result.push([-1, -1]);
        result.push([1, -1]);
        result.push([-1, 1]);
        result.push([1,1]);
        result.push([-1,0]);
        result.push([1,0]);
        result.push([0,1]);
        result.push([0,-1]);
    return result;
  }
}

class BoardData {
  constructor(pieces){
    this.pieces = pieces;
    this.turn = "white";
  }

  // function that recieves a tile on board and returns the piece that is on it.

  getPiece(row, col) {
    for(const piece of this.pieces){
      if(piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }

  // function that moves the desired piece on the board

  makeMove(piece, row, col) {
    if(piece.type === this.turn){
    addImage(chessTable.rows[row].cells[col], piece.type, piece.name);
    chessTable.rows[piece.row].cells[piece.col].removeChild(chessTable.rows[piece.row].cells[piece.col].firstElementChild);
    piece.row = row;
    piece.col = col;
    playingPiece = undefined;
    }
  }
  
  // function that switches turns between the white and black player 

  switchMoves() {
    if(this.turn === "white") {
      this.turn = "black";
    }
    else {
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
  const image = document.createElement('img');
  image.src = 'static/' + type + '/' + name + '.png';
  cell.appendChild(image);
}

// event function that happens every click, shows potential moves, moves player

function onCellClick(event, row, col) {
  //this block of code checks if the user has already clicked on a piece before. If they did, we check if the new cell
  // is a potential movement, move and switch turns 
  if (selectedCell !== undefined) { 
    selectedCell.classList.remove("clicked");
    selectedCell = event.currentTarget;
    if (selectedCell.classList.contains("potential")) {
      // gets a list of all potential moves and removes the css class to make the board clean again
      let cellList = document.querySelectorAll("td.potential");
      for (cell of cellList) {
        cell.classList.remove('potential');
      }
      boardData.makeMove(playingPiece, row, col);
      boardData.switchMoves();
    }
  }
  selectedCell = event.currentTarget;
  //checks if the tile clicked is a player. If it is and its their turn it shows the possible moves
  let piece = boardData.getPiece(row, col);
  if(piece.type === boardData.turn) {
  if (piece != undefined) {
    playingPiece = piece;
    selectedCell.classList.add('clicked');
    let possibleMoves = piece.getPossibleMoves();
    for (let possiblemove of possibleMoves) {
      chessTable.rows[possiblemove[0]].cells[possiblemove[1]].classList.add("potential");
    }
  }
  }
  }

// code block below makes the 8*8 board

for(let i=0; i<8; i++) {
  let chessRow = chessTable.insertRow(i);
    for(let j=0; j<8; j++) {
      let chessTile = chessRow.insertCell(j);
      if((i+j) % 2 == 0) {
        chessTile.classList.add("light");
      }
      else {
        chessTile.classList.add("dark");
      }
      chessTile.addEventListener("click", (event) => onCellClick(event, i, j))
    }
  }

// gets a piece and adds it image to the board by its initial position
boardData = new BoardData(getInitialBoard());  
for (let piece of boardData.pieces) {
  addImage(chessTable.rows[piece.row].cells[piece.col], piece.type, piece.name);
}
