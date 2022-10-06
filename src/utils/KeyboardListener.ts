import { ListenerCallback } from './CanvasListener';

export class KeyboardListener {
  public pressedKeys = new Set<string>();
  private pressListeners = new Map<string, ListenerCallback[]>();

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  public addKeyPressListener(key: string, callback: ListenerCallback) {
    const existing = this.pressListeners.get(key) ?? [];
    existing.push(callback);
    this.pressListeners.set(key, existing);
  }

  public removeKeyPressListener(key: string, callback: ListenerCallback) {
    let existing = this.pressListeners.get(key) ?? [];
    existing = existing.filter((cb) => cb !== callback);
    this.pressListeners.set(key, existing);
  }

  public cleanup() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  public isPressed(key: string) {
    return this.pressedKeys.has(key);
  }

  private readonly onKeyDown = (e: KeyboardEvent) => {
    // Ensures listeners are only called once
    if (this.pressedKeys.has(e.key)) {
      return;
    }

    this.pressedKeys.add(e.key);

    const callbacks = this.pressListeners.get(e.key) ?? [];
    callbacks.forEach((cb) => cb());
  };

  private readonly onKeyUp = (e: KeyboardEvent) => {
    this.pressedKeys.delete(e.key);
  };
}
