import { action, makeAutoObservable, observable } from "mobx";

export class AppState {
  @observable count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  @action incrementCount = () => {
    this.count++;
  };
}
