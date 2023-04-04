import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class ModelLoader {
  loading = false;
  readonly models = new Map<string, THREE.Object3D>();

  private loadingManager = new THREE.LoadingManager();

  get(modelName: string) {
    return this.models.get(modelName)?.clone();
  }

  load(onLoad: () => void) {
    // Setup loading manager
    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log(
        `Loading model: ${url}. \n Loaded ${itemsLoaded} of ${itemsTotal}.`
      );
    };

    this.loadingManager.onLoad = () => {
      this.loading = false;
      onLoad();
    };

    // Start loading
    this.loading = true;

    // If you need a texture atlas for the models, load it here first
    // remember to set texture.encoding = THREE.sRGBEncoding;
    // Then pass it to load models and on each model,
    // traverse each loaded model and assign material.map to atlas to each mesh child node

    this.loadModels();
  }

  private loadModels() {
    const gltfLoader = new GLTFLoader(this.loadingManager);

    const boxUrl = new URL("/box-small.glb", import.meta.url).href;
    gltfLoader.load(boxUrl, (gltf) => {
      // Traverse the gltf scene
      gltf.scene.traverse((child) => {
        const node = child as THREE.Mesh;
        if (node.isMesh) {
          // Kenney assets need their metalness reducing to render correctly
          const mat = node.material as THREE.MeshStandardMaterial;
          mat.metalness = 0;
        }
      });

      this.models.set("box", gltf.scene);
    });
  }
}
