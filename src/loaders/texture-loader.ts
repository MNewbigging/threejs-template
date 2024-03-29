import * as THREE from "three";

export class TextureLoader {
  doneLoading = false;

  private textures = new Map<string, THREE.Texture>();
  private loadingManager = new THREE.LoadingManager();

  get(name: string) {
    return this.textures.get(name);
  }

  load(onLoad: () => void) {
    // Setup loading manager
    this.loadingManager.onError = (url) => console.error("error loading", url);

    this.loadingManager.onLoad = () => {
      this.doneLoading = true;
      onLoad();
    };

    this.loadTextures();
  }

  private loadTextures() {
    const loader = new THREE.TextureLoader(this.loadingManager);
    this.loadBanditTexture(loader);
  }

  private loadBanditTexture(loader: THREE.TextureLoader) {
    const url = new URL("/bandit-texture.png", import.meta.url).href;
    loader.load(url, (texture) => {
      // So colours don't look washed out
      texture.encoding = THREE.sRGBEncoding;
      this.textures.set("bandit", texture);
    });
  }
}
