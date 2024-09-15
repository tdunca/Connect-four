import { Board } from "./board.js";
import { Player } from "./player.js";
import { BotPlayer } from "./botPlayer.js";
import prompt from "./helpers/prompt.js";

export class Game {
  private playerX: Player;
  private playerO: Player;
  private board: Board;

  public constructor() {
	const isBot = prompt("Vill du spela mot en bot? (ja/nej): ").toLowerCase() === 'ja';

	//initialises players, X is always human, 0 is human or bot
    this.playerX = new Player(prompt("Spelare X:s namn: "), "X");
	if (isBot) {
		this.playerO = new BotPlayer("0");
	} else {
		this.playerO = new Player(prompt("Spelare 0:s namn: "), "0");
	}

    this.board = new Board()
    this.start();
	}

	public start(): void {
        console.log(`Välkomna ${this.playerX.name} (X) och ${this.playerO.name} (0)`);

		while (!this.board.gameOver) {
			console.clear();
			this.board.render();

			const currentPlayer = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;
			let column: number;

			//gets move from current player
			if (currentPlayer instanceof BotPlayer) {
				column = currentPlayer.getMove(this.board.columns);
			console.log(`Bot väljer kolumn ${column + 1}`);
			} else {
				column = this.getMove(currentPlayer);
			}

			//Checks if current column is full
			if (!this.board.isColumnFull(column)) {
				this.board.dropPiece(column, currentPlayer.color);
				this.board.winner = this.board.checkWin();
				 this.board.isADraw = this.board.checkDraw();
                this.board.gameOver = !!this.board.winner || this.board.isADraw;
                this.board.currentPlayerColor = this.board.currentPlayerColor === 'X' ? '0' : 'X';
			} else {
				console.log("Kollumnen är full. Välj en annan kollumn");
			}
		}

		this.endGame();
  }

  private getMove(player: Player): number {
	let move: number;
	while (true) {
		const input = prompt(`Player ${player.color} (${player.name}), choose a column (1-${this.board.columns}): `);
		move = +input.trim() - 1;
		if (!isNaN(move) && move >= 0 && move < this.board.columns) {
			break;
		}
		console.log("Otillgänglig kollumn. Försök igen");
	}
	return move;
  }

  private endGame(): void {
	console.clear();
	//renders final board state
	this.board.render();
	if (this.board.winner) {
		const winningPlayer = this.board.winner === 'X' ? this.playerX : this.playerO;
	console.log(`Grattis ${winningPlayer.name}! Du vann!`);
	} else {
		console.log('Det blev lika!');
	}
  }
}

