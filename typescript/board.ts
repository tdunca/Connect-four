export class Board {
  public matrix: string[][];
  public currentPlayerColor: string;
  public winner: string | boolean
  public isADraw: boolean;
  public gameOver: boolean;

  constructor() {
	//creates a 6 row 7 col board
    this.matrix = [...new Array(6)].map(() =>[...new Array(7)].map(() => ' '));
    //player choice
    this.currentPlayerColor = 'X';

    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

  //shows bord
  public render() {
      const line = '\n' + '-'.repeat(29) + '\n';
      console.log(
          line +
          this.matrix
		  .map(row => row.map(column => `| ${column} `).join('')+ '|').join(line) +
          line
      );
  }

  //checks column if full
  public isColumnFull(column: number): boolean {
	return this.matrix[0][column] !== ' '; //if top row is full, column is full
  }

  //drop piece into lowest avalible position in chosen column
  public dropPiece(column: number, color: string): boolean {
	for (let row = this.matrix.length - 1; row >= 0; row--) {
		if (this.matrix[row][column] === ' '){
			this.matrix[row][column] = color;
			console.log (`Placed ${color} in row ${row}, column ${column}`);
			return true; //piece placed successfully
		}
	}
	return false; //no space in column
  }
}
