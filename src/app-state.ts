import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { action, makeAutoObservable, observable } from "mobx";

export class AppState {
  @observable count = 0;

  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
  private renderer?: THREE.WebGLRenderer;
  private controls?: OrbitControls;

  constructor() {
    makeAutoObservable(this);

    // Give canvas time to mount
    setTimeout(() => this.setupThree(), 1000);
  }

  @action incrementCount = () => {
    this.count++;
  };

  private setupThree() {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
      console.error("could not find canvas");
      return;
    }

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(640, 640);

    this.scene.background = new THREE.Color("#1680AF");

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    this.camera.position.z = 2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const boxGeom = new THREE.BoxGeometry();
    const boxMat = new THREE.MeshBasicMaterial({ color: "green" });
    const box = new THREE.Mesh(boxGeom, boxMat);
    //this.scene.add(box);

    const loader = new GLTFLoader();
    loader.load("/chest.gltf", (gltf) => {
      const chest = gltf.scene;
      chest.position.set(0, 0, 0);
      this.scene.add(chest);
      this.controls?.target.set(0, 0, 0);
    });

    this.update();
  }

  private update = () => {
    requestAnimationFrame(this.update);

    this.renderer?.render(this.scene, this.camera);
    this.controls?.update();
  };
}
