import * as THREE from "three";
import { action, makeAutoObservable, observable } from "mobx";

import { ModelLoader } from "./model-loader";
import { TextureLoader } from "./texture-loader";

// This is a higher-order loader class that groups the various loaders together
export class GameLoader {
  @observable loading = false;

  readonly modelLoader = new ModelLoader();
  //readonly textureLoader = new TextureLoader();

  private onLoad?: () => void;

  constructor() {
    makeAutoObservable(this);
    THREE.Cache.enabled = true;
  }

  @action load(onLoad: () => void) {
    this.onLoad = onLoad;

    this.loading = true;

    this.modelLoader.load(this.onLoaderFinish);
    //this.textureLoader.load(this.onLoaderFinish);
  }

  private onLoaderFinish = () => {
    // Simply check if all loaders have finished now
    if (!this.modelLoader.loading) {
      this.loading = false;
      this.onLoad?.();
    }
  };
}
