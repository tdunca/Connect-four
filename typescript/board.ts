export class Board {
  private rows: number;
  private columns: number;
  public matrix: string[][];
  public currentPlayerColor: string;
  public winner: string | false;
  public isADraw: boolean;
  public gameOver: boolean;

  constructor(rows: number = 6, columns: number = 7) {
	this.rows = rows;
	this.columns = columns;
	this.matrix = Array.from({ length: rows }, () => Array(columns).fill(' '));
    this.currentPlayerColor = 'X';
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }


  public render(): void {
      const line = '\n' + '-'.repeat(29) + '\n';
      console.log(
          line +
          this.matrix.map(row => row.map(cell => `| ${cell} `).join('')+ '|').join(line) +
          line
      );
  }


  public isColumnFull(column: number): boolean {
	return this.matrix[0][column] !== ' ';
  }


  public dropPiece(column: number, color: string): boolean {
	for (let row = this.rows - 1; row >= 0; row--) {
		if (this.matrix[row][column] === ' '){
			this.matrix[row][column] = color;
			return true;
		}
	}
	return false;
  }
  public checkWin(): string | false {
        const directions: [number, number][] = [
            [0, 1],  // Horizontal
            [1, 0],  // Vertical
            [1, 1],  // Diagonal down-right
            [1, -1]  // Diagonal down-left
        ];

        const checkDirection = (r: number, c: number, dr: number, dc: number, color: string): boolean => {
            for (let i = 0; i < 4; i++) {
                const nr = r + i * dr;
                const nc = c + i * dc;
                if (nr < 0 || nr >= this.rows || nc < 0 || nc >= this.columns || this.matrix[nr][nc] !== color) {
                    return false;
                }
            }
            return true;
        };

        for (const color of ['X', '0']) {
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.columns; c++) {
                    if (this.matrix[r][c] === color) {
                        for (const [dr, dc] of directions) {
                            if (checkDirection(r, c, dr, dc, color)) {
                                return color;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    public checkDraw(): boolean {
        return !this.checkWin() && this.matrix[0].every(cell => cell !== ' ');
    }
}
