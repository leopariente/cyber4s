const chessBoard = document.createElement("div");
chessBoard.classList.add("outline-board")
document.body.appendChild(chessBoard);

let selectedCell;
let pieces = [];

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
  getPossibleMoves() {
    let relativeMoves;
    if (this.name === PAWN) {
      relativeMoves = this.getPawnRelativeMoves();
    }
    else if (this.name === ROOK){
      relativeMoves = this.getRookRelativeMoves();
    }
    else if (this.name === KNIGHT) {
      //KNIGHT MOVES
    }
    else if (this.name === BISHOP) {
      //BISHOP MOVES
    }
    else if (this.name === KING) {
      //KING MOVES
    }
    else if (this.name === KING){
      //KING MOVES
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
getPawnRelativeMoves() {
  //TODO give different answer for black player
  return [[1,0]];
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
}
function getInitialBoard() {
  let result = [];
  result.push(new Piece(0, 0, "black", ROOK));
  result.push(new Piece(0, 1, "black", KNIGHT));
  result.push(new Piece(0, 2, "black", BISHOP));
  result.push(new Piece(0, 3, "black", QUEEN));
  result.push(new Piece(0, 4, "black", KING));
  result.push(new Piece(0, 5, "black", BISHOP));
  result.push(new Piece(0, 6, "black", KNIGHT));
  result.push(new Piece(0, 7, "black", ROOK));

  result.push(new Piece(7, 0, "white", ROOK));
  result.push(new Piece(7, 1, "white", KNIGHT));
  result.push(new Piece(7, 2, "white", BISHOP));
  result.push(new Piece(7, 3, "white", QUEEN));
  result.push(new Piece(7, 4, "white", KING));
  result.push(new Piece(7, 5, "white", BISHOP));
  result.push(new Piece(7, 6, "white", KNIGHT));
  result.push(new Piece(7, 7, "white", ROOK));
  for (let i = 0; i < 8; i++) {
    result.push(new Piece(1, i, "black", PAWN));
    result.push(new Piece(6, i, "white", PAWN));
  }
  return result;
}

function addImage(cell, type, name) {
  const image = document.createElement('img');
  image.src = 'static/' + type + '/' + name + '.png';
  cell.appendChild(image);
}

function onCellClick(event, row, col) {
  console.log(row, col);
  if (selectedCell !== undefined) {
    let cellList = document.querySelectorAll("td.clicked");
    for (cell of cellList) {
      cell.classList.remove('clicked');
    }
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add('clicked');

  for (piece of pieces) {
    if (piece.row === row && piece.col === col) {
      console.log(piece)
      let possibleMoves = piece.getPossibleMoves();
      for (let possiblemove of possibleMoves) {
        console.log(possiblemove)
        chessTable.rows[possiblemove[0]].cells[possiblemove[1]].classList.add("clicked");
      }
    }
  }
  }

for(let i=0; i<8; i++) {
  let chessRow = chessTable.insertRow(i);
    for(let j=0; j<8; j++) {
      let chessTile = chessRow.insertCell(j);
      chessTile.id = "cell-" + i.toString() + "_" + j.toString();
      if((i+j) % 2 == 0) {
        chessTile.classList.add("light");
      }
      else {
        chessTile.classList.add("dark");
      }
      chessTile.addEventListener("click", (event) => onCellClick(event, i, j))
    }
  }

pieces = getInitialBoard();
for (let piece of pieces) {
  addImage(chessTable.rows[piece.row].cells[piece.col], piece.type, piece.name);
}
