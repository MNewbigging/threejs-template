import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export class AnimLoader {
  doneLoading = false;
  private clips = new Map<string, THREE.AnimationClip>();
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
  }

  private loadAnim(loader: FBXLoader) {
    const url = new URL("/path/to/clip", import.meta.url).href;
    loader.load(url, (group) => {
      if (group.animations.length) {
        const clip = group.animations[0];
        clip.name = "clip-name";
        this.clips.set("clip-name", clip);
      }
    });
  }
}
