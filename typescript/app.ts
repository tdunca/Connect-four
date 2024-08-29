import { Game } from './game.js';
import prompt from './helpers/prompt.js';

const run = () => {
  const name = prompt("Vad heter du? ")
  const game = new Game(name);
  game.start()
}

run()