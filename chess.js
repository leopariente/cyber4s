function blackRow(row) {
  for(let i=0; i<8; i++) {
    if(i % 2 == 0) {
      let chessTile = row.insertCell(i);
      chessTile.classList.add("dark");
    }
    else {
      let chessTile = row.insertCell(i);
      chessTile.classList.add("light");
    }
  }
}

function whiteRow(row) {
    for(let i=0; i<8; i++) {
      if(i % 2 == 0) {
        let chessTile = row.insertCell(i);
        chessTile.classList.add("light");
      }
      else {
        let chessTile = row.insertCell(i);
        chessTile.classList.add("dark");
      }
    }
}

const chessBoard = document.createElement("div");
chessBoard.classList.add("outline-board")
document.body.appendChild(chessBoard);
const chessTable = document.createElement("table");
chessBoard.appendChild(chessTable);
for(let i=0; i<8; i++) {
  let chessRow = chessTable.insertRow(i);
  if (i % 2 == 0) {
    blackRow(chessRow);
  }
  else {
    whiteRow(chessRow);
  }
}