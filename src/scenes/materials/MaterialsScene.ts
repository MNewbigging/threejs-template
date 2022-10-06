import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import doorColorImg from '../../assets/door/color.jpg';
import doorAlphaImg from '../../assets/door/alpha.jpg';
import doorAmbientImg from '../../assets/door/ambientOcclusion.jpg';
import doorHeightImg from '../../assets/door/height.jpg';
import doorNormalImg from '../../assets/door/normal.jpg';
import doorMetalImg from '../../assets/door/metalness.jpg';
import doorRoughImg from '../../assets/door/roughness.jpg';
import matcapImg from '../../assets/matcaps/1.png';
import grandientImg from '../../assets/gradients/3.jpg';

import { BaseScene } from '../BaseScene';

export class MaterialsScene extends BaseScene {
  private _camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private textures: THREE.Texture[] = [];
  private doorMat: THREE.MeshStandardMaterial;
  private matcapMat: THREE.MeshMatcapMaterial;
  private normalMat: THREE.MeshNormalMaterial;
  private depthMat: THREE.MeshDepthMaterial;
  private phongMat: THREE.MeshPhongMaterial;
  private toonMat: THREE.MeshToonMaterial;
  private standardMat: THREE.MeshStandardMaterial;
  private meshes: THREE.Mesh[] = [];

  public get camera() {
    return this._camera;
  }

  public initScene() {
    this.scene = new THREE.Scene();

    // Setup camera
    this.setupCamera();

    // Load textures
    const textureLoader = new THREE.TextureLoader();

    const doorColor = textureLoader.load(doorColorImg);
    const doorAlpha = textureLoader.load(doorAlphaImg);
    const doorAmbient = textureLoader.load(doorAmbientImg);
    const doorHeight = textureLoader.load(doorHeightImg);
    const doorNormal = textureLoader.load(doorNormalImg);
    const doorMetalness = textureLoader.load(doorMetalImg);
    const doorRoughness = textureLoader.load(doorRoughImg);
    const matcap = textureLoader.load(matcapImg);
    const gradient = textureLoader.load(grandientImg);
    gradient.minFilter = THREE.NearestFilter;
    gradient.magFilter = THREE.NearestFilter;
    gradient.generateMipmaps = false;

    this.textures = [
      doorColor,
      doorAlpha,
      matcap,
      gradient,
      doorAmbient,
      doorHeight,
      doorNormal,
      doorMetalness,
      doorRoughness,
    ];

    // Materials and meshes

    // Basic
    const mat = new THREE.MeshStandardMaterial();
    mat.map = doorColor;
    mat.aoMap = doorAmbient;
    mat.aoMapIntensity = 10;
    mat.transparent = true;
    mat.alphaMap = doorAlpha;
    mat.side = THREE.DoubleSide;
    mat.roughness = 0.65;
    mat.metalness = 0.45;
    this.doorMat = mat;
    const doorPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.doorMat);

    // Matcap
    this.matcapMat = new THREE.MeshMatcapMaterial();
    this.matcapMat.matcap = matcap;
    const matSphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), this.matcapMat);
    matSphere.position.x = -1.5;

    // Normal
    this.normalMat = new THREE.MeshNormalMaterial();
    const normalSphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), this.normalMat);
    normalSphere.position.x = 1.5;

    // Depth
    this.depthMat = new THREE.MeshDepthMaterial();
    const depthTorus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), this.depthMat);
    depthTorus.position.z = -1.5;
    depthTorus.position.x = -1.5;

    // Lights for next materials
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    this.scene.add(pointLight);

    // Phong
    this.phongMat = new THREE.MeshPhongMaterial();
    this.phongMat.shininess = 100;
    this.phongMat.specular = new THREE.Color('red');
    const phongSphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), this.phongMat);
    phongSphere.position.z = -1.5;

    // Toon
    this.toonMat = new THREE.MeshToonMaterial();
    this.toonMat.gradientMap = gradient;
    const toonTorus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), this.toonMat);
    toonTorus.position.z = -1.5;
    toonTorus.position.x = 1.5;

    // Standard
    this.standardMat = new THREE.MeshStandardMaterial();
    const stdTorus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), this.standardMat);
    stdTorus.position.z = -3;
    this.standardMat.metalness = 0.45;
    this.standardMat.roughness = 0.65;

    // Add to scene and collections
    [doorPlane, matSphere, normalSphere, depthTorus, phongSphere, toonTorus, stdTorus].forEach(
      (m) => {
        this.meshes.push(m);
        this.scene.add(m);
      }
    );
  }

  public updateScene(deltaTime: number) {
    this.controls.update();

    this.doorMat?.dispose();

    const speed = deltaTime * 0.3;
    this.meshes.forEach((m) => {
      m.rotation.y += speed;
      m.rotation.x += speed;
    });
  }

  public destroyScene() {
    this.doorMat.dispose();
    this.matcapMat.dispose();
    this.normalMat.dispose();
    this.depthMat.dispose();
    this.phongMat.dispose();
    this.toonMat.dispose();
    this.standardMat.dispose();

    this.meshes.forEach((m) => m.geometry.dispose());
    this.textures.forEach((t) => t.dispose());
  }

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
