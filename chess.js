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
