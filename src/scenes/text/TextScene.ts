import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import Font from '../../assets/fonts/helvetiker_regular.typeface.json';

import { BaseScene } from '../BaseScene';

export class TextScene extends BaseScene {
  private _camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;

  public get camera() {
    return this._camera;
  }

  public initScene() {
    this.scene = new THREE.Scene();

    // Setup camera
    this.setupCamera();

    // Load font
    const fontLoader = new FontLoader();
    const font = `${Font}`;
    fontLoader.load('/assets/helvetiker_regular.typeface.json', (font) => {
      console.log('font loaded', font);

      const textGeom = new TextGeometry('Hello world', {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 2,
      });

      const textMat = new THREE.MeshNormalMaterial();
      const text = new THREE.Mesh(textGeom, textMat);

      const box = new THREE.Box3().setFromObject(text);
      const size = new THREE.Vector3();
      box.getSize(size);

      text.position.x -= size.x * 0.5;

      this.scene.add(text);
    });
  }

  public updateScene(deltaTime: number) {
    this.controls.update();
  }

  public destroyScene() {}

  private setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      this.canvasListener.width / this.canvasListener.height,
      0.1,
      1000
    );
    camera.position.x = 2;
    camera.position.y = 2;
    camera.position.z = 2;
    this._camera = camera;
    this.controls = new OrbitControls(this.camera, this.canvasListener.canvas);
    this.controls.enableDamping = true;
  }
}
