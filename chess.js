const chessBoard = document.createElement("div");
chessBoard.classList.add("outline-board")
document.body.appendChild(chessBoard);

const chessTable = document.createElement("table");
chessBoard.appendChild(chessTable);

let selectedCell;
let pieces = [];

class Piece {
  constructor(row, col, type, name, movement){
    this.row = row;
    this.col = col;
    this.type = type;
    this.name = name;
    this.movement = 0;
  }
}

function getInitialBoard() {
  let result = [];
  result.push(new Piece(0, 0, "black", "rook"));
  result.push(new Piece(0, 1, "black", "knight"));
  result.push(new Piece(0, 2, "black", "bishop"));
  result.push(new Piece(0, 3, "black", "queen"));
  result.push(new Piece(0, 4, "black", "king"));
  result.push(new Piece(0, 5, "black", "bishop"));
  result.push(new Piece(0, 6, "black", "knight"));
  result.push(new Piece(0, 7, "black", "rook"));
  for (let i = 0; i < 8; i++) {
    result.push(new Piece(1, i, "black", "pawn"));
  }
  result.push(new Piece(7, 0, "white", "rook"));
  result.push(new Piece(7, 1, "white", "knight"));
  result.push(new Piece(7, 2, "white", "bishop"));
  result.push(new Piece(7, 3, "white", "queen"));
  result.push(new Piece(7, 4, "white", "king"));
  result.push(new Piece(7, 5, "white", "bishop"));
  result.push(new Piece(7, 6, "white", "knight"));
  result.push(new Piece(7, 7, "white", "rook"));
  for (let i = 0; i < 8; i++) {
    result.push(new Piece(6, i, "white", "pawn"));
  }
  return result;
}

function addImage(cell, type, name) {
  const image = document.createElement('img');
  image.src = 'static/' + type + '/' + name + '.png';
  cell.appendChild(image);
}

function onCellClick(event) {
  if (selectedCell !== undefined) {
    selectedCell.classList.remove('clicked');
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add('clicked');
}

function getPlayer(src, cell) {
  let list = src.split('/');
  let selectedPlayer;
  playerType = list[4];
  playerName = list[5].split('.')[0];
  return playerName;
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
      chessTile.addEventListener("click", onCellClick)
    }
  }

pieces = getInitialBoard();
for (let piece of pieces) {
  addImage(chessTable.rows[piece.row].cells[piece.col], piece.type, piece.name);
}
