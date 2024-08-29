export class Board {
  public matrix: string[][]
  public currentPlayerColor = "X"
  public winner: string | boolean
  public isADraw = false
  public gameOver = false

  constructor() {
    // A simple way of generating the board
    // - but no so flexible
    /*this.matrix = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];*/
    // A slighly more complex way of generating the board
    // - more flexible since we can change
    // how many rows and columns easily
    this.matrix = [...new Array(7)].map(() =>
      [...new Array(7)].map(() => ' ')
    );
    // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'X';
    // status of game (updated after each move)
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

  // render = output/draw something
  public render() {
      // A basic way of showing the board
      // console.table(this.matrix);
      // A more customized board with our own
      // characters for row and column separation
      let line = '\n' + '-'.repeat(29) + '\n';
      console.log(
          line +
          this.matrix.map(row =>
              row.map(column => `| ${column} `).join('')
              + '|').join(line) +
          line
      );
  }
}
