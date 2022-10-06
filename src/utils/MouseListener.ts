import { CanvasListener } from './CanvasListener';

export interface MousePos {
  x: number;
  y: number;
}

export class MouseListener {
  private mouseX = 0;
  private mouseY = 0;
  private wheelListener?: (deltaNorm: number) => void;

  constructor(private canvasListener: CanvasListener) {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  public setWheelListener(callback: (delta: number) => void) {
    this.wheelListener = callback;
    window.addEventListener('wheel', this.onMouseWheel);
  }

  public cleanup() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('wheel', this.onMouseWheel);
    this.wheelListener = undefined;
  }

  /**
   * Normalised absolute mouse pos against canvas size in range 0-1,
   * with a top-left origin.
   * @returns normalised mouse position
   */
  public getMousePosNormalised(): MousePos {
    return {
      x: this.mouseX / this.canvasListener.width,
      y: this.mouseY / this.canvasListener.height,
    };
  }

  private onMouseMove = (event: MouseEvent) => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  private onMouseWheel = (event: WheelEvent) => {
    // Wheel delta is always either 125 or -125 - normalise as 1 or -1 instead
    const deltaNorm = event.deltaY < 0 ? -1 : 1;
    this.wheelListener?.(deltaNorm);
  };
}
