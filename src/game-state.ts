import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class GameState {
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    window.addEventListener("resize", this.onCanvasResize);

    this.scene.background = new THREE.Color("#1680AF");

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    this.camera.position.z = 1.6;
    this.camera.position.y = 1.2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(ambientLight);

    const directLight = new THREE.DirectionalLight();
    this.scene.add(directLight);

    const url = new URL("/box-small.glb", import.meta.url).href;
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      // Kenney's models need their metalness adjusting
      gltf.scene.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          (
            (node as THREE.Mesh).material as THREE.MeshStandardMaterial
          ).metalness = 0;

          //
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      gltf.scene.rotateY(1);
      this.scene.add(gltf.scene);
    });

    this.onCanvasResize();
    this.update();
  }

  private onCanvasResize = () => {
    this.renderer.setSize(
      this.canvas.clientWidth,
      this.canvas.clientHeight,
      false
    );

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;

    this.camera.updateProjectionMatrix();
  };

  private update = () => {
    requestAnimationFrame(this.update);

    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  };
}
