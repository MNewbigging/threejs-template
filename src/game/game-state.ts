import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPipeline } from "./render-pipeline";
import { AssetManager, ModelAsset } from "./asset-manager";
import { AnimatedObject } from "./animated-object";

interface Floor {
  mesh: THREE.Mesh;
  bounds: THREE.Box3;
}

const CONFIG = {
  GRAVITY: 2,
};

export class GameState {
  private renderPipeline: RenderPipeline;
  private clock = new THREE.Clock();

  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera();
  private controls: OrbitControls;

  private player: THREE.Mesh;
  private playerBounds = new THREE.Box3();
  private playerBoundsHelper: THREE.BoxHelper;

  private floors: Floor[] = [];

  private reused = {
    box: new THREE.Box3(),
    vec3: new THREE.Vector3(),
  };

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

    this.playerBoundsHelper = new THREE.BoxHelper(this.player, 0xff0000);
    this.scene.add(this.playerBoundsHelper);

    //

    const floor = this.createFloor();
    this.floors.push(floor);
    this.scene.add(floor.mesh);

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

  private createFloor(): Floor {
    const height = 5;

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(3, height, 3),
      new THREE.MeshBasicMaterial()
    );

    mesh.translateY(-height * 0.5);

    mesh.geometry.computeBoundingBox();

    const bounds = new THREE.Box3().setFromObject(mesh);

    return { mesh, bounds };
  }

  private updatePlayer(dt: number) {
    // Move down with gravity
    this.player.position.y -= dt * CONFIG.GRAVITY;

    // Update bounds
    this.playerBounds.setFromObject(this.player);

    // Update bounding box helper
    this.playerBoundsHelper.update();
  }

  private updateFloors(dt: number) {
    // All floors move left
    for (const floor of this.floors) {
      floor.mesh.position.z -= dt;
      floor.bounds.setFromObject(floor.mesh);
    }
  }

  private collisions() {
    const playerBounds = this.playerBounds;

    for (const floor of this.floors) {
      const overlap = this.reused.box;
      overlap.copy(playerBounds);
      overlap.intersect(floor.bounds);

      const overlapSize = overlap.getSize(this.reused.vec3);
      if (overlapSize.y > 0) {
        this.player.position.y += overlapSize.y;
      }
    }
  }

  private update = () => {
    requestAnimationFrame(this.update);

    const dt = this.clock.getDelta();

    this.controls.update();

    //

    this.updatePlayer(dt);
    this.updateFloors(dt);

    //

    this.collisions();

    //
    this.renderPipeline.render(dt);
  };
}
