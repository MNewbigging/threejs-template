import { action, makeObservable, observable } from 'mobx';
import { RandomId } from '../../utils/RandomId';

export enum DialogStage {
  OPEN = 'open',
  CLOSING = 'closing',
  CLOSED = 'closed',
}

export class DialogState {
  public id = RandomId.createId();
  public stage = DialogStage.CLOSED;

  constructor() {
    makeObservable(this, {
      stage: observable,
      open: action,
      close: action,
      removeDialog: action,
    });
  }

  public open() {
    this.stage = DialogStage.OPEN;

    window.addEventListener('click', this.onWindowClick);
  }

  public close() {
    this.stage = DialogStage.CLOSING;

    window.removeEventListener('click', this.onWindowClick);

    // Close after delay to allow transition to finish
    setTimeout(this.removeDialog, 250);
  }

  public isClosed() {
    return this.stage === DialogStage.CLOSED;
  }

  public removeDialog = () => {
    this.stage = DialogStage.CLOSED;
  };

  private onWindowClick = (e: MouseEvent) => {
    const dialogElement = document.getElementById(this.id);
    if (!dialogElement) {
      return;
    }

    if (dialogElement.contains(e.target as Node)) {
      // Clicked inside dialog
      return;
    }

    // Clicked outside dialog; close it
    this.close();
  };
}
