import * as THREE from 'three';

import { BaseScene } from '../BaseScene';
import { KeyboardListener } from '../../utils/KeyboardListener';
import { MouseListener } from '../../utils/MouseListener';
import { NumberUtils } from '../../utils/NumberUtils';

export class BasicOrbitCamScene extends BaseScene {
  private _camera: THREE.PerspectiveCamera;
  private cube: THREE.Mesh;
  private cubeMat: THREE.MeshBasicMaterial;
  private refCube: THREE.Mesh;
  private refCubeMat: THREE.MeshBasicMaterial;
  private mouseListener = new MouseListener(this.canvasListener);
  private keyboardListener = new KeyboardListener();
  private distance = 3;

  public get camera() {
    return this._camera;
  }

  public initScene() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      this.canvasListener.width / this.canvasListener.height,
      0.1,
      100
    );
    camera.position.x = 2;
    camera.position.y = 2;
    camera.position.z = 2;
    this._camera = camera;

    const boxGeom = new THREE.BoxGeometry();
    this.cubeMat = new THREE.MeshBasicMaterial({ color: 'red' });
    this.cube = new THREE.Mesh(boxGeom, this.cubeMat);
    scene.add(this.cube);

    this.refCubeMat = new THREE.MeshBasicMaterial({ color: 'blue' });
    this.refCube = new THREE.Mesh(boxGeom, this.refCubeMat);
    this.refCube.position.x = 3;
    scene.add(this.refCube);

    this.scene = scene;

    this.mouseListener.setWheelListener(this.onMouseWheel);
  }

  public updateScene(deltaTime: number) {
    // Get the normalised mouse position and offset it
    const mousePos = this.mouseListener.getMousePosNormalised();
    const offsetX = mousePos.x - 0.5;
    const offsetY = -(mousePos.y - 0.5);

    // Full rotation in normalised range of mouse movement
    const fullRotation = Math.PI * 2;

    // Move camera
    const vDistance = 6;
    this._camera.position.x = Math.sin(offsetX * fullRotation) * this.distance;
    this._camera.position.z = Math.cos(offsetX * fullRotation) * this.distance;
    this._camera.position.y = offsetY * vDistance;

    // Always point to cube
    this._camera.lookAt(this.cube.position);
  }

  public destroyScene() {
    super.destroyScene();

    this.mouseListener.cleanup();
    this.keyboardListener.cleanup();

    this.cube.geometry.dispose();
    this.cubeMat.dispose();
    this.refCube.geometry.dispose();
    this.refCubeMat.dispose();
  }

  private onMouseWheel = (deltaNorm: number) => {
    // Adjust distance, reverse dir
    const newDistance = this.distance + deltaNorm * 0.2;

    // Clamp within range
    this.distance = NumberUtils.clampToRange(3, 10, newDistance);
  };
}
