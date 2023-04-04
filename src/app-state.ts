import { GameLoader } from "./loaders/game-loader";
import { GameState } from "./game-state";

export class AppState {
  readonly gameLoader = new GameLoader();
  gameState?: GameState;

  constructor() {
    // Give canvas time to mount
    setTimeout(() => this.loadGame(), 10);
  }

  private async loadGame() {
    this.gameLoader.load(this.startGame);
  }

  private startGame = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
      console.error("could not find game canvas");
      return;
    }

    this.gameState = new GameState(canvas, this.gameLoader);
  };
}
