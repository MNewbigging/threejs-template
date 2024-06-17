import * as THREE from "three";

import { ModelLoader } from "./model-loader";
import { AnimLoader } from "./anim-loader";
import { TextureLoader } from "./texture-loader";

// This is a higher-order loader class that groups the various loaders together
export class GameLoader {
  readonly modelLoader = new ModelLoader();
  readonly animLoader = new AnimLoader();
  readonly textureLoader = new TextureLoader();

  private onLoad?: () => void;

  constructor() {
    THREE.Cache.enabled = true;
  }

  load(onLoad: () => void) {
    this.onLoad = onLoad;

    this.animLoader.load(this.onLoaderFinish);
    this.modelLoader.load(this.onLoaderFinish);
    this.textureLoader.load(this.onLoaderFinish);
  }

  private onLoaderFinish = () => {
    // Simply check if all loaders have finished now
    if (this.modelLoader.doneLoading && this.animLoader.doneLoading && this.textureLoader.doneLoading) {
      this.onLoad?.();
    }
  };
}
