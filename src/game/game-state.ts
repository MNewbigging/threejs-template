import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPipeline } from "./render-pipeline";
import { AssetManager, ModelAsset } from "./asset-manager";
import { AnimatedObject } from "./animated-object";

export class GameState {
  private renderPipeline: RenderPipeline;
  private clock = new THREE.Clock();

  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera();
  private controls: OrbitControls;

  private player: THREE.Mesh;

  constructor(private assetManager: AssetManager) {
    this.setupCamera();
    this.renderPipeline = new RenderPipeline(this.scene, this.camera);
    this.setupLights();

    this.controls = new OrbitControls(this.camera, this.renderPipeline.canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 1, 0);

    this.scene.background = new THREE.Color("#1680AF");

    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);

    //

    this.player = this.setupPlayer();
    this.scene.add(this.player);

    //
    const floor = this.createFloor();
    this.scene.add(floor);

    // Start game
    this.update();
  }

  private setupCamera() {
    this.camera.fov = 75;
    this.camera.far = 500;
    this.camera.position.set(-12, 1.5, 0);
  }

  private setupLights() {
    const ambientLight = new THREE.AmbientLight(undefined, 1);
    this.scene.add(ambientLight);

    const directLight = new THREE.DirectionalLight(undefined, Math.PI);
    directLight.position.copy(new THREE.Vector3(0.75, 1, 0.75).normalize());
    this.scene.add(directLight);
  }

  private setupPlayer() {
    const height = 1;

    const player = new THREE.Mesh(
      new THREE.BoxGeometry(1, height, 1),
      new THREE.MeshBasicMaterial({ color: "green" })
    );

    player.translateY(height * 0.5);

    return player;
  }

  private createFloor() {
    const height = 1;

    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(3, height, 3),
      new THREE.MeshBasicMaterial()
    );

    floor.translateY(-height * 0.5);

    return floor;
  }

  private update = () => {
    requestAnimationFrame(this.update);

    const dt = this.clock.getDelta();

    this.controls.update();

    this.renderPipeline.render(dt);
  };
}
