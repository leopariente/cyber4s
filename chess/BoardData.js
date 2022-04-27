// class for the "brain" of the game. arranges the position of pieces, and order of game

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
    this.turn = "white";
    this.check = false;
    this.winner = undefined;
  }

  // function that recieves a tile on board and returns the piece that is on it.

  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }

  // checks if tile is empty

  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  // checks if tile is oponent

  isOponenent(row, col, type) {
    if (this.getPiece(row, col) !== undefined) {
      return this.getPiece(row, col).type !== type;
    }
    return false;
  }

  cleanCells(departureCell) {
    let cellList = document.querySelectorAll("td");
    for (let cell of cellList) {
      cell.classList.remove("potential", "clicked");
    }
  }

  // function that moves the desired piece on the board and eats

  makeMove(piece, row, col) {
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
    if (eatenPiece !== undefined && eatenPiece.name === "king") {
      this.winner = piece.type;
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
