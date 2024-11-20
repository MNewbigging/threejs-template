import * as THREE from "three";
import {
  AnimationAsset,
  AssetManager,
  ModelAsset,
  TextureAsset,
} from "./asset-manager";

export type AnimatedObjectState = "idle";

export class AnimatedObject extends THREE.Object3D {
  private mixer: THREE.AnimationMixer;
  private actions = new Map<AnimatedObjectState, THREE.AnimationAction>();
  private currentAction?: THREE.AnimationAction;

  constructor(private assetManager: AssetManager) {
    super();

    // Setup mesh
    const mesh = assetManager.getModel(ModelAsset.BANDIT);
    assetManager.applyModelTexture(mesh, TextureAsset.BANDIT);

    this.add(mesh);

    // Animations
    this.mixer = new THREE.AnimationMixer(mesh);
    this.setupAnimations();
  }

  playAnimation(name: AnimatedObjectState) {
    // Find the new action with the given name
    const nextAction = this.actions.get(name);
    if (!nextAction) {
      throw Error(
        "Could not find action with name " + name + "for character " + this
      );
    }

    // Reset the next action then fade to it from the current action
    nextAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);

    this.currentAction
      ? nextAction.crossFadeFrom(this.currentAction, 0.25, false).play()
      : nextAction.play();

    // Next is now current
    this.currentAction = nextAction;
  }

  update(dt: number) {
    this.mixer.update(dt);
  }

  private setupAnimations() {
    const idleClip = this.assetManager.animations.get(
      AnimationAsset.BANDIT_IDLE
    )!;
    const idleAction = this.mixer.clipAction(idleClip);
    this.actions.set("idle", idleAction);
  }
}
