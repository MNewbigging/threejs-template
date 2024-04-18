import { GameLoader } from "../loaders/game-loader";
import { GameState } from "../game/game-state";

export class AppState {
  readonly gameLoader = new GameLoader();
  gameState?: GameState;

  constructor() {
    // Give loading UI time to mount
    setTimeout(() => this.loadGame(), 10);
  }

  private async loadGame() {
    this.gameLoader.load(this.startGame);
  }

  private startGame = () => {
    this.gameState = new GameState(this.gameLoader);
  };
}
