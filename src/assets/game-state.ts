import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class GameState {
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  constructor(private readonly canvas: HTMLCanvasElement) {
    console.log("canvas", canvas);

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

    this.camera.position.z = 2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const boxGeom = new THREE.BoxGeometry();
    const boxMat = new THREE.MeshBasicMaterial({ color: "green" });
    const box = new THREE.Mesh(boxGeom, boxMat);
    this.scene.add(box);

    const url = new URL("/chest.gltf", import.meta.url).href;
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      const chest = gltf.scene;

      chest.position.set(0, 0, 0);
      this.scene.add(chest);
    });

    this.onCanvasResize();
    this.update();
  }

  private onCanvasResize = () => {
    console.log("oncanvasresize");
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
