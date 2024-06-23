import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export class AnimLoader {
  doneLoading = false;
  readonly clips = new Map<string, THREE.AnimationClip>();
  private loadingManager = new THREE.LoadingManager();

  getClips(names: string[]): THREE.AnimationClip[] {
    const clips: THREE.AnimationClip[] = [];

    names.forEach((name) => {
      const clip = this.clips.get(name);
      if (clip) {
        clips.push(clip);
      }
    });

    return clips;
  }

  createActions(mixer: THREE.AnimationMixer) {
    const actions: THREE.AnimationAction[] = [];

    // Fetch each clip here, setup any props e.g
    const clip = this.clips.get("clip-name");
    if (clip) {
      // Each animation may have specific props such as loop once/infinitely, clamp etc
      // So there isn't a generic way to create these
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      actions.push(action);
    }

    return actions;
  }

  load(onLoad: () => void) {
    // Setup loading manager
    this.loadingManager.onError = (url) => console.error("error loading", url);
    this.loadingManager.onLoad = () => {
      this.doneLoading = true;
      onLoad();
    };

    this.loadAnims();
  }

  loadAnims() {
    const loader = new FBXLoader(this.loadingManager);
    this.getNameUrlMap().forEach((url, name) => {
      loader.load(url, (group) => {
        if (group.animations.length) {
          // Assumes the fbx holds a single animation
          const clip = group.animations[0];
          clip.name = name;
          this.clips.set(name, clip);
        }
      });
    });
  }

  private getNameUrlMap() {
    const map = new Map<string, string>();

    const idleUrl = new URL("/anims/idle.fbx", import.meta.url).href;
    map.set("idle", idleUrl);

    return map;
  }
}
