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
      this.playerO = new Player(prompt("Spelare 0:s namn: "), "0")
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

	//place piece in selected column
	const moveMade = this.board.dropPiece(column, color);

	if (!moveMade) {
		console.log("Ogiltigt drag. Försök igen.");
		return; //stop here if move was invalid
	}

	//checks if someone has won or draw
	this.board.winner = this.winCheck();
    this.board.isADraw = this.drawCheck();

    // the game is over if someone has won or if it's a draw
    this.board.gameOver = !!this.board.winner || this.board.isADraw;

	//switch to the next player
	this.board.currentPlayerColor = this.board.currentPlayerColor === 'X' ? '0' : 'X';

	//debug log
	console.log(`Next player's turn: ${this.board.currentPlayerColor}`);

  }

  private winCheck() {
	const m = this.board.matrix;
    const directions = [
        [[0, 1], [0, 2], [0, 3]],  // horizontal right
        [[1, 0], [2, 0], [3, 0]],  // vertical down
        [[1, 1], [2, 2], [3, 3]],  // diagonal down-right
        [[1, -1], [2, -2], [3, -3]] // diagonal down-left
    ];

    for (let color of ['X', '0']) {
      for (let r = 0; r < m.length; r++) {
        for (let c = 0; c < m[0].length; c++) {
			if (m[r][c] === color) {
				for (let dir of directions) {
					const combo = dir.every(([dr, dc]) => m[r + dr] && m[r + dr][c + dc] === color
					);
					if (combo) {
						return color
					}
				}
			}
        }
      }
    }
    return false;
  }

  //checks if draw
  private drawCheck() {
	  const boardFilled = this.board.matrix.every(row => row.every(cell => cell !== ' '));
      return !this.board.winner && boardFilled;
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

