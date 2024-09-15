import { Player } from "./player.js";

export class BotPlayer extends Player {
	public constructor(color: string) {
		super('Bot', color);
	}

	public getMove(columns: number): number {
		//randomly picks a column
		return Math.floor(Math.random() * columns);
	}
}