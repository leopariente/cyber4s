const chessBoard = document.createElement("div");
chessBoard.classList.add("outline-board")
document.body.appendChild(chessBoard);

const chessTable = document.createElement("table");
chessBoard.appendChild(chessTable);

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
    }
  }

document.querySelectorAll('td')
.forEach(tile => tile.addEventListener("click", function() {
   clickedTile = document.querySelectorAll("td.clicked");
   if (clickedTile.length == 1) {
   clickedTile[0].classList.remove("clicked");
   }
   tile.classList.add("clicked");
}));

let blackKing = document.createElement("img");
blackKing.src = "static/black-king.png"

let blackQueen = document.createElement("img");
blackQueen.src = "static/black-queen.png"

let blackRook1 = document.createElement("img");
blackRook1.src = "static/black-rook.png"

let blackRook2 = document.createElement("img");
blackRook2.src = "static/black-rook.png"

let blackKnight1 = document.createElement("img");
blackKnight1.src = "static/black-knight.png"

let blackKnight2 = document.createElement("img");
blackKnight2.src = "static/black-knight.png"

let blackBishop1 = document.createElement("img");
blackBishop1.src = "static/black-bishop.png"

let blackBishop2 = document.createElement("img");
blackBishop2.src = "static/black-bishop.png"

let tiles = document.getElementsByTagName("td");
console.log(tiles)

tiles[0].appendChild(blackRook1);
tiles[1].appendChild(blackKnight1);
tiles[2].appendChild(blackBishop1);
tiles[3].appendChild(blackQueen);
tiles[4].appendChild(blackKing);
tiles[5].appendChild(blackBishop2);
tiles[6].appendChild(blackKnight2);
tiles[7].appendChild(blackRook2);

for (let i=8; i < 16; i++) {
  let blackPawn = document.createElement("img");
  blackPawn.src = "static/black-pawn.png";
  tiles[i].appendChild(blackPawn);
}

let whiteKing = document.createElement("img");
whiteKing.src = "static/white-king.png"

let whiteQueen = document.createElement("img");
whiteQueen.src = "static/white-queen.png"

let whiteRook1 = document.createElement("img");
whiteRook1.src = "static/white-rook.png"

let whiteRook2 = document.createElement("img");
whiteRook2.src = "static/white-rook.png"

let whiteKnight1 = document.createElement("img");
whiteKnight1.src = "static/white-knight.png"

let whiteKnight2 = document.createElement("img");
whiteKnight2.src = "static/white-knight.png"

let whiteBishop1 = document.createElement("img");
whiteBishop1.src = "static/white-bishop.png"

let whiteBishop2 = document.createElement("img");
whiteBishop2.src = "static/white-bishop.png"

tiles[56].appendChild(whiteRook1);
tiles[57].appendChild(whiteKnight1);
tiles[58].appendChild(whiteBishop1);
tiles[59].appendChild(whiteQueen);
tiles[60].appendChild(whiteKing);
tiles[61].appendChild(whiteBishop2);
tiles[62].appendChild(whiteKnight2);
tiles[63].appendChild(whiteRook2);

for (let i=48; i < 56; i++) {
  let whitePawn = document.createElement("img");
  whitePawn.src = "static/white-pawn.png";
  tiles[i].appendChild(whitePawn);
}

