import { Board } from "./board.js";
import { Player } from "./player.js";
import prompt from "./helpers/prompt.js";

export class Game {
  private playerX: Player;
  private playerO: Player;
  private board: Board;

  public constructor() {
    while (true) {
      this.playerX = new Player(prompt("Spelare X:s namn: "), "X")
      this.playerO = new Player(prompt("Spelare 0:s namn: "), "O")
      this.board = new Board()
      this.start()
      this.whoHasWonOnGameOver()
      console.log('');
      let playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
      if (playAgain !== 'ja') { break; }
    }
  }

  public start() {
    console.log(`Hello from ${this.playerX.name} and ${this.playerO.name}`)

    while (!this.board.gameOver) {
      console.clear();
      this.board.render();
      let player = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;
      let move = prompt(
          `Ange ditt drag ${player.color} ${player.name} - välj en kolumn (1-7): `
      );
      let column = +move.trim() - 1;

	  //check column number is valid and not full
	  if (isNaN(column) || column < 0 || column >= this.board.matrix[0].length || this.board.isColumnFull(column)) {
		console.log("Ogiltig kollumn. Försök igen.");
		continue;
	  }
	  //drops piece into column
	  this.makeMove(player.color, column);
    }
  }

  private makeMove(color: string, column: number) {
    if (this.board.gameOver) { return; }
    if (color !== this.board.currentPlayerColor) { return; }

	//drops piece into column
	this.board.dropPiece(column, color);

	//checks if someone has won or draw
	this.board.winner = this.winCheck();
    this.board.isADraw = this.drawCheck();

    // the game is over if someone has won or if it's a draw
    this.board.gameOver = !!this.board.winner || this.board.isADraw;

	//switch to the next player
	this.board.currentPlayerColor = this.board.currentPlayerColor === 'X' ? '0' : 'X';

  }

  private winCheck() {
    // m - a short alias for this.matrix
    let m = this.board.matrix;
    // represent ways you can win as offset from ONE position on the board
    let offsets = [
        [[0, 0], [0, 1], [0, 2], [0, 3]],  // horizontal win
        [[0, 0], [1, 0], [2, 0], [3, 0]],  // vertical win
        [[0, 0], [1, 1], [2, 2], [3, 3]],  // diagonal 1 win
        [[0, 0], [1, -1], [2, -2], [3, -3]] // diagonal 2 win
    ];
    // loop through each player color, each position (row + column),
    // each winType/offsets and each offset coordinate added to the position
    // to check if someone has won :)
    for (let color of 'XO') {
      // r = row, c = column
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
          // ro = row offset, co = column offset
          for (let winType of offsets) {
            let colorsInCombo = '';
            for (let [ro, co] of winType) {
              colorsInCombo += (m[r + ro] || [])[c + co];
            }
            if (colorsInCombo === color.repeat(4)) {
              return color;
            }
          }
        }
      }
    }
    return false;
  }

  private drawCheck() {
    // if no one has won and no empty positions then it's a draw
    return !this.winCheck() && !this.board.matrix.flat().includes(' ');
  }

  private whoHasWonOnGameOver() {
    console.clear()
    this.board.render()

    if (this.board.winner) {
      const winningPlayer = this.board.winner === "X" ? this.playerX : this.playerO

      console.log(`Grattis ${winningPlayer.color}: ${winningPlayer.name} du vann!`);
    } else {
      console.log('Tyvärr det blev oavgjort...');
    }
  }
}

