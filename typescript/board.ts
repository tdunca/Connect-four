export class Board {
  public matrix: string[][]
  public currentPlayerColor = string;
  public winner: string | boolean
  public isADraw = boolean;
  public gameOver = boolean;

  constructor() {
	//creates a 6 row 7 col board
    this.matrix = [...new Array(6)].map(() =>
      [...new Array(7)].map(() => ' ')
    );
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


}
