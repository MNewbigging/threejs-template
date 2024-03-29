import * as THREE from "three";
import { action, makeAutoObservable, observable } from "mobx";

import { ModelLoader } from "./model-loader";
import { AnimLoader } from "./anim-loader";

// This is a higher-order loader class that groups the various loaders together
export class GameLoader {
  @observable loading = false;

  readonly modelLoader = new ModelLoader();
  readonly animLoader = new AnimLoader();

  private onLoad?: () => void;

  constructor() {
    makeAutoObservable(this);
    THREE.Cache.enabled = true;
  }

  @action load(onLoad: () => void) {
    this.onLoad = onLoad;

    this.loading = true;

    this.modelLoader.load(this.onLoaderFinish);
    // this.animLoader.load(this.onLoaderFinish); // if adding, also check for doneLoading below
  }

  private onLoaderFinish = () => {
    // Simply check if all loaders have finished now
    if (this.modelLoader.doneLoading) {
      this.loading = false;
      this.onLoad?.();
    }
  };
}
