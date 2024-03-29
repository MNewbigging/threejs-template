import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TextureLoader } from "./texture-loader";

export class ModelLoader {
  doneLoading = false;
  readonly models = new Map<string, THREE.Object3D>();

  private loadingManager = new THREE.LoadingManager();

  private textureLoader = new TextureLoader();

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

    // Load textures for models first, then models
    this.textureLoader.load(this.loadModels);
  }

  private loadModels = () => {
    const gltfLoader = new GLTFLoader(this.loadingManager);
    this.loadKenneyBox(gltfLoader);

    const fbxLoader = new FBXLoader(this.loadingManager);
    this.loadSyntyModel(fbxLoader);
  };

  private loadKenneyBox(loader: GLTFLoader) {
    const boxUrl = new URL("/box-small.glb", import.meta.url).href;
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

  private loadSyntyModel(loader: FBXLoader) {
    const url = new URL("/bandit.fbx", import.meta.url).href;
    loader.load(url, (group) => {
      const texture = this.textureLoader.get("bandit");
      if (texture) {
        this.applyModelTexture(group, texture);
      }

      this.scaleSyntyModel(group);
      this.models.set("bandit", group);
    });
  }

  private applyModelTexture(group: THREE.Group, texture: THREE.Texture) {
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshLambertMaterial;
        mat.map = texture;
        // Synty models have this true by default, making model black
        mat.vertexColors = false;
      }
    });
  }

  private scaleSyntyModel(group: THREE.Group) {
    // Synty models need scale adjusting, unless done in blender beforehand
    group.scale.multiplyScalar(0.01);
    group.updateMatrixWorld();
  }
}
