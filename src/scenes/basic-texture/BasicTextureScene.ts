import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import doorColor from '../../assets/door/color.jpg';
import minecraftImg from '../../assets/minecraft.png';
import { BaseScene } from '../BaseScene';

export class BasicTextureScene extends BaseScene {
  private _camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private textures: THREE.Texture[] = [];
  private materials: THREE.MeshBasicMaterial[] = [];
  private meshes: THREE.Mesh[] = [];

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
    camera.position.x = 2;
    camera.position.y = 2;
    camera.position.z = 2;
    this._camera = camera;
    this.controls = new OrbitControls(this.camera, this.canvasListener.canvas);
    this.controls.enableDamping = true;

    // Textures
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = this.onLoad;
    loadingManager.onStart = this.onLoadStart;
    loadingManager.onProgress = this.onLoadProgress;
    loadingManager.onError = this.onLoadError;

    const textureLoader = new THREE.TextureLoader(loadingManager);
    const color = textureLoader.load(doorColor);
    const minecraft = textureLoader.load(minecraftImg);

    this.textures = [color, minecraft];

    // Meshes
    const boxGeom = new THREE.BoxGeometry();

    const doorMat = new THREE.MeshBasicMaterial({ map: color });
    this.materials.push(doorMat);
    const doorMesh = new THREE.Mesh(boxGeom, doorMat);
    doorMesh.position.z = -1;
    this.meshes.push(doorMesh);
    scene.add(doorMesh);

    minecraft.generateMipmaps = false;
    minecraft.minFilter = THREE.NearestFilter;
    minecraft.magFilter = THREE.NearestFilter;
    const mcMat = new THREE.MeshBasicMaterial({ map: minecraft });
    this.materials.push(mcMat);
    const mcMesh = new THREE.Mesh(boxGeom, mcMat);
    mcMesh.position.z = 1;
    this.meshes.push(mcMesh);
    scene.add(mcMesh);

    this.scene = scene;
  }

  public updateScene() {
    this.controls.update();
  }

  public destroyScene() {
    this.meshes.forEach((m) => m.geometry.dispose());
    this.materials.forEach((m) => m.dispose());
    this.textures.forEach((t) => t.dispose());
  }

  private onLoadStart = () => {
    console.log('starting loading...');
  };

  private onLoadProgress = () => {
    console.log('loading...');
  };

  private onLoadError = () => {
    console.log('load error');
  };

  private onLoad = () => {
    console.log('loading done');
  };
}
