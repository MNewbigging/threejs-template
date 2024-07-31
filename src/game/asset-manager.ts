import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export class AssetManager {
  models = new Map();
  textures = new Map();
  animations = new Map();

  private loadingManager = new THREE.LoadingManager();

  applyModelTexture(model: THREE.Object3D, textureName: string) {
    const texture = this.textures.get(textureName);
    if (!texture) {
      return;
    }

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
      }
    });
  }

  load(): Promise<void> {
    const fbxLoader = new FBXLoader(this.loadingManager);
    const gltfLoader = new GLTFLoader(this.loadingManager);
    const rgbeLoader = new RGBELoader(this.loadingManager);
    const textureLoader = new THREE.TextureLoader(this.loadingManager);

    this.loadModels(fbxLoader, gltfLoader);
    this.loadTextures(rgbeLoader, textureLoader);
    this.loadAnimations(fbxLoader);

    return new Promise((resolve) => {
      this.loadingManager.onLoad = () => {
        resolve();
      };
    });
  }

  private loadModels(fbxLoader: FBXLoader, gltfLoader: GLTFLoader) {
    // bandit

    const banditUrl = new URL("/models/bandit.fbx", import.meta.url).href;
    fbxLoader.load(banditUrl, (group) => this.models.set("bandit", group));

    // box
    const boxUrl = new URL("/models/box-small.glb", import.meta.url).href;
    gltfLoader.load(boxUrl, (gltf) => {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.metalness = 0; // kenney assets require this to render correctly
        }
      });
      this.models.set("box", gltf.scene);
    });
  }

  private loadTextures(
    rgbeLoader: RGBELoader,
    textureLoader: THREE.TextureLoader
  ) {
    // bandit texture
    const banditUrl = new URL("/textures/bandit-texture.png", import.meta.url)
      .href;
    textureLoader.load(banditUrl, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textures.set("bandit", texture);
    });

    // skybox
    const orchardUrl = new URL(
      "/textures/orchard_cartoony.hdr",
      import.meta.url
    ).href;
    rgbeLoader.load(orchardUrl, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.textures.set("hdri", texture);
    });
  }

  private loadAnimations(fbxLoader: FBXLoader) {
    // bandit idle
    const idleUrl = new URL("/anims/idle.fbx", import.meta.url).href;
    fbxLoader.load(idleUrl, (group) => {
      if (group.animations.length) {
        const clip = group.animations[0];
        clip.name = "idle";
        this.animations.set("idle", clip);
      }
    });
  }
}
