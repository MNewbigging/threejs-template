export type ResizeCallback = () => void;

export class CanvasListener {
  private resizeListeners: ResizeCallback[] = [];
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

  public onResize(callback: ResizeCallback) {
    if (!this.resizeListeners.includes(callback)) {
      this.resizeListeners.push(callback);
    }
  }

  public removeCanvasListener(callback: ResizeCallback) {
    this.resizeListeners = this.resizeListeners.filter((cb) => cb !== callback);
  }

  private onWindowResize = () => {
    this._canvasWidth = this.canvas.clientWidth;
    this._canvasHeight = this.canvas.clientHeight;

    this.resizeListeners.forEach((cb) => cb());
  };
}
