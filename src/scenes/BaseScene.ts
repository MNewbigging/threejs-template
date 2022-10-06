import * as THREE from 'three';

import { CanvasListener } from '../utils/CanvasListener';

export abstract class BaseScene {
  public scene: THREE.Scene;

  constructor(protected canvasListener: CanvasListener) {
    this.canvasListener.onResize(() => this.onCanvasResize());
  }

  public abstract get camera(): THREE.Camera;

  public abstract initScene(): void;

  public abstract updateScene(deltaTime: number): void;

  public destroyScene(): void {
    // Cleanup
    this.canvasListener.removeCanvasListener(this.onCanvasResize);
  }

  protected onCanvasResize(): void {
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = this.canvasListener.width / this.canvasListener.height;
      this.camera.updateProjectionMatrix();
    }
  }
}
