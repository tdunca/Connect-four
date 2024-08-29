import { Player } from "./player.js";

export class Game {
	private playerX: Player
  private playerO: Player

  public constructor(playerXName: string) {
    this.playerX = new Player(playerXName, "X")
    this.playerO = new Player("Dumb bot", "O")
  }

  public start() {
    console.log(`Hello from ${this.playerX.name} and ${this.playerO.name}`)
  }
}

