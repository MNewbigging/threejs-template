import * as THREE from 'three';
import { CanvasListener } from '../utils/CanvasListener';

export class Renderer {
  private renderer: THREE.WebGLRenderer;

  constructor(private canvasListener: CanvasListener) {
    canvasListener.onResize(this.onCanvasResize);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasListener.canvas });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    //this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.onCanvasResize();
  }

  public render(scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer.render(scene, camera);
  }

  private onCanvasResize = () => {
    this.renderer.setSize(this.canvasListener.width, this.canvasListener.height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
}
