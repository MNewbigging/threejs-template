import * as THREE from 'three';

import { BaseScene } from '../BaseScene';
import { KeyboardListener } from '../../utils/KeyboardListener';

export class BasicTransfoms extends BaseScene {
  private _camera: THREE.PerspectiveCamera;
  private cube: THREE.Mesh;
  private cubeMat: THREE.MeshBasicMaterial;
  private keyboardListener = new KeyboardListener();
  private readonly slowMoveSpeed = 1;
  private readonly fastMoveSpeed = 5;

  public get camera() {
    return this._camera;
  }

  public initScene() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      this.canvasListener.width / this.canvasListener.height,
      0.1,
      1000
    );
    camera.position.z = 5;
    this._camera = camera;

    const boxGeom = new THREE.BoxGeometry();
    this.cubeMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(boxGeom, this.cubeMat);
    scene.add(this.cube);
    this.scene = scene;
  }

  public updateScene(deltaTime: number) {
    const speed = this.keyboardListener.isPressed('Shift')
      ? this.fastMoveSpeed * deltaTime
      : this.slowMoveSpeed * deltaTime;

    // Rotation
    if (this.keyboardListener.isPressed('ArrowLeft')) {
      this.cube.rotation.y -= speed;
    }
    if (this.keyboardListener.isPressed('ArrowRight')) {
      this.cube.rotation.y += speed;
    }
    if (this.keyboardListener.isPressed('ArrowUp')) {
      this.cube.rotation.x += speed;
    }
    if (this.keyboardListener.isPressed('ArrowDown')) {
      this.cube.rotation.x -= speed;
    }

    // Position
    if (this.keyboardListener.isPressed('a')) {
      this.cube.position.x -= speed;
    }
    if (this.keyboardListener.isPressed('d')) {
      this.cube.position.x += speed;
    }
    if (this.keyboardListener.isPressed('w')) {
      this.cube.position.y += speed;
    }
    if (this.keyboardListener.isPressed('s')) {
      this.cube.position.y -= speed;
    }

    // Scale
    if (this.keyboardListener.isPressed('q')) {
      this.cube.scale.x -= speed;
      this.cube.scale.y -= speed;
      this.cube.scale.z -= speed;
    }
    if (this.keyboardListener.isPressed('e')) {
      this.cube.scale.x += speed;
      this.cube.scale.y += speed;
      this.cube.scale.z += speed;
    }
  }

  public destroyScene() {
    super.destroyScene();

    this.keyboardListener.cleanup();
    this.cube.geometry.dispose();
    this.cubeMat.dispose();
  }
}
