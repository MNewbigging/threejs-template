export type MouseEventCallback = (props?: any) => void;
export type MouseEventType = "mousedown" | "mouseup" | "wheel";

export class MouseListener {
  lmb = false;

  private enabled = false;
  private callbacks = new Map<MouseEventType, MouseEventCallback[]>();

  constructor() {
    this.enable();
  }

  enable() {
    if (this.enabled) {
      return;
    }

    window.addEventListener("mousedown", this.onMouseDownEvent);
    window.addEventListener("mouseup", this.onMouseUpEvent);
    window.addEventListener("wheel", this.onMouseWheelEvent);

    this.enabled = true;
  }

  disable() {
    if (!this.enabled) {
      return;
    }

    window.removeEventListener("mousedown", this.onMouseDownEvent);
    window.removeEventListener("mouseup", this.onMouseUpEvent);
    window.removeEventListener("wheel", this.onMouseWheelEvent);

    this.enabled = false;
  }

  addListener(eventType: MouseEventType, callback: MouseEventCallback) {
    const existing = this.callbacks.get(eventType) ?? [];
    existing.push(callback);
    this.callbacks.set(eventType, existing);
  }

  removeListener(eventType: MouseEventType, callback: MouseEventCallback) {
    let existing = this.callbacks.get(eventType);
    if (existing?.length) {
      existing = existing.filter((cb) => cb !== callback);
      this.callbacks.set(eventType, existing);
    }
  }

  private triggerCallbacks(eventType: MouseEventType, props?: any) {
    this.callbacks.get(eventType)?.forEach((cb) => cb(props));
  }

  private onMouseDownEvent = (e: MouseEvent) => {
    this.lmb = e.button === 0;

    this.triggerCallbacks("mousedown");
  };

  private onMouseUpEvent = (e: MouseEvent) => {
    this.lmb = !(e.button === 0);

    this.triggerCallbacks("mouseup");
  };

  private onMouseWheelEvent = (e: WheelEvent) => {
    this.triggerCallbacks("wheel", e.deltaY);
  };
}
