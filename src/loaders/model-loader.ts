import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export class ModelLoader {
  doneLoading = false;
  readonly models = new Map<string, THREE.Object3D>();

  private loadingManager = new THREE.LoadingManager();

  // Returns a clone of the model or a red sphere if not found
  get(modelName: string): THREE.Object3D {
    // Return the model if found
    const model = this.models.get(modelName);
    if (model) {
      return SkeletonUtils.clone(model);
    }

    // Otherwise create debug object and error message
    console.error(
      `Could not find ${modelName}, returning debug object instead`
    );
    return new THREE.Mesh(
      new THREE.SphereGeometry(),
      new THREE.MeshBasicMaterial({ color: "red" })
    );
  }

  load(onLoad: () => void) {
    // Setup loading manager
    this.loadingManager.onError = (url) => console.error("error loading", url);
    this.loadingManager.onLoad = () => {
      this.doneLoading = true;
      onLoad();
    };

    this.loadModels();
  }

  private getNameUrlMap() {
    const map = new Map<string, string>();

    const banditUrl = new URL("/models/bandit.fbx", import.meta.url).href;
    map.set("bandit", banditUrl);

    return map;
  }

  private loadModels = () => {
    const gltfLoader = new GLTFLoader(this.loadingManager);
    this.loadKenneyBox(gltfLoader);

    const fbxLoader = new FBXLoader(this.loadingManager);
    this.getNameUrlMap().forEach((url, name) => {
      fbxLoader.load(url, (group) => {
        this.models.set(name, group);
      });
    });
  };

  private loadKenneyBox(loader: GLTFLoader) {
    const boxUrl = new URL("/models/box-small.glb", import.meta.url).href;
    loader.load(boxUrl, (gltf) => {
      // Traverse the gltf scene
      gltf.scene.traverse((child) => {
        const node = child as THREE.Mesh;
        if (node.isMesh) {
          // https://kenney.nl/ assets need their metalness reducing to render correctly
          const mat = node.material as THREE.MeshStandardMaterial;
          mat.metalness = 0;
        }
      });

      this.models.set("box", gltf.scene);
    });
  }
}
