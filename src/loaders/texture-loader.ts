import * as THREE from "three";

export class TextureLoader {
  doneLoading = false;

  private textures = new Map<string, THREE.Texture>();
  private loadingManager = new THREE.LoadingManager();

  get(name: string) {
    return this.textures.get(name);
  }

  applyModelTexture(object: THREE.Object3D, textureName: string) {
    const texture = this.get(textureName);
    if (!texture) {
      return;
    }

    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
        child.material.shininess = 0;
      }
    });
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
    this.getNameUrlMap().forEach((url, name) => {
      loader.load(url, (texture) => {
        texture.encoding = THREE.sRGBEncoding;
        this.textures.set(name, texture);
      });
    });
  }

  private getNameUrlMap() {
    const map = new Map<string, string>();

    const banditUrl = new URL("/textures/bandit-texture.png", import.meta.url)
      .href;
    map.set("bandit", banditUrl);

    return map;
  }
}
