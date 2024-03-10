/*
MIT License

Copyright (c) 2020 Abdallah Hemdan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { Actor, Move } from "./helper";

let scores = {
  X: -10,   //ME
  O: 10,    //BOT
  tie: 0
};

export class MiniMax {
  public board: string[][];
  public blockIndex: number;
  public winnerIs: string;

  bestMove() {
    // AI makes its turn
    let bestScore = -Infinity;
    let move: Move;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        // Is the spot available?
        if (this.board[row][col] === "") {
          this.board[row][col] = Actor.BOT;
          let score = this.minimax(0, false);
          this.board[row][col] = ""; // undo your move

          if (score > bestScore) {
            bestScore = score;
            move = { row, col };
          }
        }
      }
    }
    if (move) {
      this.board[move.row][move.col] = Actor.BOT;
    }
    //currentPlayer = human;
    return move;
  }

  minimax(depth: number, isMaximizer: boolean) {
    let result = this.evaluate();
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizer) {  //this block won't run
      let bestScore = -Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          // Is the spot available?
          if (this.board[row][col] === "") {
            this.board[row][col] = Actor.BOT;
            let score = this.minimax(depth + 1, false);
            this.board[row][col] = ""; // undo your move
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          // Is the spot available?
          if (this.board[row][col] == "") {
            this.board[row][col] = Actor.ME;
            let score = this.minimax(depth + 1, true);
            this.board[row][col] = ""; // undo your move
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  private equals3(a, b, c) {
    return a == b && b == c && a != "";
  }

  evaluate() {
    let winner = null;

    // horizontal
    for (let row = 0; row < 3; row++) {
      if (this.equals3(this.board[row][0], this.board[row][1], this.board[row][2])) {
        winner = this.board[row][0];
      }
    }

    // Vertical
    for (let col = 0; col < 3; col++) {
      if (this.equals3(this.board[0][col], this.board[1][col], this.board[2][col])) {
        winner = this.board[0][col];
      }
    }

    // Diagonal
    if (this.equals3(this.board[0][0], this.board[1][1], this.board[2][2])) {
      winner = this.board[0][0];
    }
    if (this.equals3(this.board[2][0], this.board[1][1], this.board[0][2])) {
      winner = this.board[2][0];
    }

    let openSpots = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] == "") {
          openSpots++;
        }
      }
    }

    if (winner === null && openSpots === 0) {
      return "tie";
    } else {
      return winner;
    }
  }

}