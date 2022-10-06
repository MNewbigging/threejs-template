import { action, makeObservable, observable } from 'mobx';

export class AppState {
  public count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      incrementCount: action,
    });
  }

  public incrementCount = () => {
    this.count++;
  };
}
