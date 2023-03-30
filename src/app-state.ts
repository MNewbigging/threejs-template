import * as THREE from "three";

import { GameState } from "./assets/game-state";

export class AppState {
  gameState?: GameState;

  constructor() {
    // Give canvas time to mount
    setTimeout(() => this.setupThree(), 1000);
  }

  private setupThree() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
      console.error("could not find canvas");
      return;
    }

    this.gameState = new GameState(canvas);
  }
}
