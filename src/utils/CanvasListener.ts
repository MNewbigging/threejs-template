export type ListenerCallback = () => void;
export class CanvasListener {
  private canvasListeners: ListenerCallback[] = [];
  private _canvasWidth: number;
  private _canvasHeight: number;

  constructor(public canvas: HTMLCanvasElement) {
    this._canvasWidth = canvas.clientWidth;
    this._canvasHeight = canvas.clientHeight;

    window.addEventListener('resize', this.onWindowResize);
  }

  get width() {
    return this._canvasWidth;
  }

  get height() {
    return this._canvasHeight;
  }

  public onResize(callback: ListenerCallback) {
    if (!this.canvasListeners.includes(callback)) {
      this.canvasListeners.push(callback);
    }
  }

  public removeCanvasListener(callback: ListenerCallback) {
    this.canvasListeners = this.canvasListeners.filter((cb) => cb !== callback);
  }

  private onWindowResize = () => {
    this._canvasWidth = this.canvas.clientWidth;
    this._canvasHeight = this.canvas.clientHeight;

    this.canvasListeners.forEach((cb) => cb());
  };
}
