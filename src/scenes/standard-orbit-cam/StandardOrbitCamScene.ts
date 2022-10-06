import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { BaseScene } from '../BaseScene';
import { KeyboardListener } from '../../utils/KeyboardListener';

export class StandardOrbitCamScene extends BaseScene {
  private _camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private keyboard = new KeyboardListener();
  private props: THREE.Mesh[] = [];
  private propMat: THREE.MeshBasicMaterial;
  private curPropMat: THREE.MeshBasicMaterial;
  private curPropTarget = 0;

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
    camera.position.x = 8;
    camera.position.y = 2;
    camera.position.z = 20;
    this._camera = camera;

    // Setup props
    const propGeom = new THREE.BoxGeometry();
    this.propMat = new THREE.MeshBasicMaterial({ color: 'yellow' });
    this.curPropMat = new THREE.MeshBasicMaterial({ color: 'blue' });
    const propCount = 10;
    for (let i = 0; i < propCount; i++) {
      // Create a new prop object, position it and add to scene
      const prop = new THREE.Mesh(propGeom, this.propMat);
      prop.position.x = i * 1.5;
      prop.position.z = i * 2;
      this.props.push(prop);
      scene.add(prop);
    }

    // Setup controls
    this.controls = new OrbitControls(this.camera, this.canvasListener.canvas);
    this.controls.target = this.props[this.curPropTarget].position;
    this.controls.update();
    this.controls.enableDamping = true;
    this.props[this.curPropTarget].material = this.curPropMat;

    this.keyboard.addKeyPressListener('ArrowLeft', this.onLeftArrow);
    this.keyboard.addKeyPressListener('ArrowRight', this.onRightArrow);

    this.scene = scene;
  }

  public updateScene(deltaTime: number) {
    this.controls.update();
  }

  public destroyScene() {
    this.props.forEach((prop) => prop.geometry.dispose());
    this.propMat.dispose();
    this.curPropMat.dispose();
  }

  private onLeftArrow = () => {
    // Revert material of current prop
    this.props[this.curPropTarget].material = this.propMat;

    // Adjust current prop
    this.curPropTarget--;
    if (this.curPropTarget < 0) {
      this.curPropTarget = this.props.length - 1;
    }

    // Update camera and material for new target
    this.props[this.curPropTarget].material = this.curPropMat;
    this.controls.target = this.props[this.curPropTarget].position;
    this.controls.update();
  };

  private onRightArrow = () => {
    this.props[this.curPropTarget].material = this.propMat;

    this.curPropTarget++;
    if (this.curPropTarget === this.props.length) {
      this.curPropTarget = 0;
    }

    this.props[this.curPropTarget].material = this.curPropMat;
    this.controls.target = this.props[this.curPropTarget].position;
    this.controls.update();
  };
}
