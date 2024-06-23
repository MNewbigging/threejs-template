import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GameLoader } from "../loaders/game-loader";
import { RenderPipeline } from "./render-pipeline";
import { AnimatedCharacter } from "./animated-character";
import { EventListener } from "../listeners/event-listener";

export class GameState {
  private renderPipeline: RenderPipeline;
  private clock = new THREE.Clock();

  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera();
  private controls: OrbitControls;

  private animatedCharacter: AnimatedCharacter;

  constructor(private gameLoader: GameLoader, private events: EventListener) {
    this.setupCamera();

    this.renderPipeline = new RenderPipeline(this.scene, this.camera);

    this.setupLights();
    this.setupObjects();

    this.controls = new OrbitControls(this.camera, this.renderPipeline.canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 1, 0);

    this.scene.background = new THREE.Color("#1680AF");

    this.animatedCharacter = this.setupAnimatedCharacter();
    this.scene.add(this.animatedCharacter.object);
    this.animatedCharacter.playAnimation("idle");

    // Start game
    this.update();
  }

  private setupCamera() {
    this.camera.fov = 75;
    this.camera.far = 500;
    this.camera.position.set(0, 1.5, 3);
  }

  private setupLights() {
    const ambientLight = new THREE.AmbientLight(undefined, 0.25);
    this.scene.add(ambientLight);

    const directLight = new THREE.DirectionalLight(undefined, Math.PI);
    directLight.position.copy(new THREE.Vector3(0.75, 1, 0.75).normalize());
    this.scene.add(directLight);
  }

  private setupObjects() {
    const box = this.gameLoader.modelLoader.get("box");
    this.scene.add(box);
  }

  private setupAnimatedCharacter(): AnimatedCharacter {
    const object = this.gameLoader.modelLoader.get("bandit");
    object.position.z = -0.5;
    this.gameLoader.textureLoader.applyModelTexture(object, "bandit");

    const mixer = new THREE.AnimationMixer(object);
    const actions = new Map<string, THREE.AnimationAction>();
    const idleClip = this.gameLoader.animLoader.clips.get("idle");
    if (idleClip) {
      const idleAction = mixer.clipAction(idleClip);
      actions.set("idle", idleAction);
    }

    return new AnimatedCharacter(object, mixer, actions);
  }

  private update = () => {
    requestAnimationFrame(this.update);

    const dt = this.clock.getDelta();

    this.controls.update();

    this.animatedCharacter.update(dt);

    this.renderPipeline.render(dt);
  };
}
