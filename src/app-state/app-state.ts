import { GameState } from "../game/game-state";
import { AssetManager } from "../game/asset-manager";
import { eventListener } from "../events/event-listener";

class AppState {
  loaded = false;
  started = false;

  gameState?: GameState;

  private assetManager = new AssetManager();

  constructor() {
    // Give loading UI time to mount
    setTimeout(() => this.loadGame(), 10);
  }

  startGame = () => {
    this.gameState = new GameState(this.assetManager);
    this.started = true;
    eventListener.fire("game-started", null);
  };

  private async loadGame() {
    this.assetManager.load().then(this.onLoad);
  }

  private onLoad = () => {
    this.loaded = true;
    eventListener.fire("game-loaded", null);
  };
}

export const appState = new AppState();
