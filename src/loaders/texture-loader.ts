import * as THREE from "three";

export class TextureLoader {
  loading = false;
  readonly textures = new Map<string, THREE.Texture>();

  private loadingManager = new THREE.LoadingManager();

  load(onLoad: () => void) {
    // Setup loading manager
    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log(
        `Loading texture: ${url}. \n Loaded ${itemsLoaded} of ${itemsTotal}`
      );
    };

    this.loadingManager.onLoad = () => {
      this.loading = false;
      onLoad();
    };

    this.loading = true;
    this.loadTextures();
  }

  private loadTextures() {
    const loader = new THREE.TextureLoader(this.loadingManager);

    // Example
    const textureUrl = new URL("/path/to/texture", import.meta.url).href;
    //loader.load(textureUrl, (texture) => this.textures.set('name', texture));
  }
}
