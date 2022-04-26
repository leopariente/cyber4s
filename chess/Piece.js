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