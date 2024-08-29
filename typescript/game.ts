import { Board } from "./board.js";
import { Player } from "./player.js";
import prompt from "./helpers/prompt.js";

export class Game {
	private playerX: Player
  private playerO: Player
  private board: Board

  public constructor() {
    while (true) {
      this.playerX = new Player(prompt("Spelare X:s namn: "), "X")
      this.playerO = new Player("Dumb bot", "O")
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
      let player = this.board.currentPlayerColor === 'X'
          ? this.playerX : this.playerO;
      let move = prompt(
          `Ange ditt drag ${player.color} ${player.name} - skriv in rad,kolumn: `
      );
      // convert row and columns to numbers and zero-based indexes
      let [row, column] = move.split(',').map((x: string) => +x.trim() - 1);
      // try to make the move
      this.makeMove(player.color, row, column);
    }
  }

  private makeMove(color: string, row: number, column: number) {
    // don't make any move if the game is over
    if (this.board.gameOver) { return false; }
    // check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }
    // check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.board.currentPlayerColor) { return false; }
    // check that the row and column are numbers - otherwise don't make the move
    if (isNaN(row) || isNaN(column)) { return false; }
    // check that the row is between 0 and 2 - otherwise don't make the move
    if (row < 0 || row >= this.board.matrix.length) { return false; }
    // check that the column is between 0 and 2 - otherwise don't make the move
    if (column < 0 || column >= this.board.matrix[0].length) { return false; }
    // check that the position is empty - otherwise don't make the move
    if (this.board.matrix[row][column] !== ' ') { return false; }

    // make the move
    this.board.matrix[row][column] = color;
    // change the current player color
    this.board.currentPlayerColor = this.board.currentPlayerColor === 'X' ? 'O' : 'X';
    // check if someone has won or if it's a draw/tie and update properties
    this.board.winner = this.winCheck();
    this.board.isADraw = this.drawCheck();
    // the game is over if someone has won or if it's a draw
    this.board.gameOver = !!this.board.winner || this.board.isADraw;
    // return true if the move could be made
    return true;
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

