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
blackKing.setAttribute('id', 'black-king')
chessTable.appendChild(blackKing)

let blackQueen = document.createElement("img");
blackQueen.src = "static/black-queen.png"
blackQueen.setAttribute('id', 'black-queen')
chessTable.appendChild(blackQueen)

let blackRook1 = document.createElement("img");
blackRook1.src = "static/black-rook.png"
blackRook1.setAttribute('id', 'black-rook1')
chessTable.appendChild(blackRook1)

let blackRook2 = document.createElement("img");
blackRook2.src = "static/black-rook.png"
blackRook2.setAttribute('id', 'black-rook2')
chessTable.appendChild(blackRook2)


