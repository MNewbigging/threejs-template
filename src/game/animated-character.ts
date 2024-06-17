import * as THREE from 'three';

export class AnimatedCharacter {
  currentAction?: THREE.AnimationAction;

  constructor(public object: THREE.Object3D, public mixer: THREE.AnimationMixer, public actions: Map<string, THREE.AnimationAction>) {}

  update(dt: number) {
    this.mixer.update(dt);
  }

  playAnimation(name: string) {
    // Find the new action with the given name
    const nextAction = this.actions.get(name);
    if (!nextAction) {
      throw Error(
        "Could not find action with name " + name + "for character " + this
      );
    }

    // Reset the next action then fade to it from the current action
    nextAction
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)

    this.currentAction ? nextAction.crossFadeFrom(this.currentAction, 0.25, false).play() : nextAction.play();

    // Next is now current
    this.currentAction = nextAction;
  }
}