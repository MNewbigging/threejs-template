import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { BaseScene } from '../BaseScene';

export class BufferGeometryScene extends BaseScene {
  private _camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private mat: THREE.MeshBasicMaterial;
  private mesh: THREE.Mesh;

  public get camera() {
    return this._camera;
  }

  public initScene() {
    const scene = new THREE.Scene();

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      this.canvasListener.width / this.canvasListener.height,
      0.1,
      1000
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    this._camera = camera;

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvasListener.canvas);
    this.controls.enableDamping = true;

    // Material
    this.mat = new THREE.MeshBasicMaterial({
      color: 'red',
      wireframe: true,
    });

    // Setup buffer geometry
    const triCount = 100;
    const posArrayLength = triCount * 3 * 3; // three vertices and three values per tri
    const posArray = new Float32Array(posArrayLength);
    for (let i = 0; i < posArrayLength; i++) {
      posArray[i] = (Math.random() - 0.5) * 2;
    }

    const positionsAttr = new THREE.BufferAttribute(posArray, 3);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', positionsAttr);

    this.mesh = new THREE.Mesh(geom, this.mat);
    scene.add(this.mesh);

    this.scene = scene;
  }

  public updateScene() {
    this.controls.update();
  }

  public destroyScene() {
    this.mesh.geometry.dispose();
    this.mat.dispose();
  }
}
