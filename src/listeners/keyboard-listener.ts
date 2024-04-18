export type KeyEventCallback = () => void;

export class KeyboardListener {
  private pressedKeys = new Set<string>();
  private pressCallbacks = new Map<string, KeyEventCallback[]>();
  private releaseCallbacks = new Map<string, KeyEventCallback[]>();

  constructor() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  on(key: string, callback: KeyEventCallback) {
    const existing = this.pressCallbacks.get(key) ?? [];
    if (!existing.includes(callback)) {
      existing.push(callback);
    }
    this.pressCallbacks.set(key, existing);
  }

  onRelease(key: string, callback: KeyEventCallback) {
    const existing = this.releaseCallbacks.get(key) ?? [];
    if (!existing.includes(callback)) {
      existing.push(callback);
    }
    this.releaseCallbacks.set(key, existing);
  }

  off(key: string, callback: KeyEventCallback) {
    let existing = this.pressCallbacks.get(key);
    if (!existing) {
      return;
    }
    existing = existing.filter((cb) => cb !== callback);
    this.pressCallbacks.set(key, existing);
  }

  offRelease(key: string, callback: KeyEventCallback) {
    let existing = this.releaseCallbacks.get(key);
    if (!existing) {
      return;
    }
    existing = existing.filter((cb) => cb !== callback);
    this.releaseCallbacks.set(key, existing);
  }

  isKeyPressed(key: string) {
    return this.pressedKeys.has(key);
  }

  anyKeysPressed(keys: string[]) {
    for (const key of keys) {
      if (this.isKeyPressed(key)) {
        return true;
      }
    }

    return false;
  }

  private readonly onKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLocaleLowerCase();

    // Ensures listeners are only called once
    if (this.pressedKeys.has(key)) {
      return;
    }

    this.pressedKeys.add(key);
    this.pressCallbacks.get(key)?.forEach((cb) => cb());
  };

  private readonly onKeyUp = (e: KeyboardEvent) => {
    this.releaseCallbacks.get(e.key.toLocaleLowerCase())?.forEach((cb) => cb());
    this.pressedKeys.delete(e.key.toLocaleLowerCase());
  };
}
