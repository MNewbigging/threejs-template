import { GameLoader } from "../loaders/game-loader";
import { GameState } from "../game/game-state";
import { action, makeAutoObservable, observable } from "mobx";
import { EventListener } from "../listeners/event-listener";

export class AppState {
  // Observables for UI
  @observable loaded = false;
  @observable started = false;
  @observable paused = false;

  readonly gameLoader = new GameLoader();
  gameState?: GameState;

  private events = new EventListener();

  constructor() {
    makeAutoObservable(this);

    // Give loading UI time to mount
    setTimeout(() => this.loadGame(), 10);
  }

  @action startGame = () => {
    this.gameState = new GameState(this.gameLoader, this.events);
    this.started = true;
  };

  private async loadGame() {
    this.gameLoader.load(this.onLoad);
  }

  @action private onLoad = () => {
    this.loaded = true;
  };
}
