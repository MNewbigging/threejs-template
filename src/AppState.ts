import * as THREE from 'three';
import { action, makeObservable, observable } from 'mobx';

import { CanvasListener } from './utils/CanvasListener';
import { Renderer } from './core/Renderer';
import { BaseScene } from './scenes/BaseScene';
import { SceneName } from './scenes/SceneList';
import { DrawerState } from './components/drawer/DrawerState';
import { BasicTransfoms } from './scenes/basic-transforms/BasicTransformsScene';
import { BufferGeometryScene } from './scenes/buffer-geometry/BufferGeometryScene';
import { BasicOrbitCamScene } from './scenes/basic-orbit-cam/BasicOrbitCamScene';
import { BasicTextureScene } from './scenes/basic-texture/BasicTextureScene';
import { MaterialsScene } from './scenes/materials/MaterialsScene';
import { StandardOrbitCamScene } from './scenes/standard-orbit-cam/StandardOrbitCamScene';
import { TextScene } from './scenes/text/TextScene';
import { CannonPhysicsScene } from './scenes/cannon-physics/CannonPhysicsScene';

export class AppState {
  public activeSceneName = SceneName.BASIC_TRANSFORMS;
  public drawerState = new DrawerState();

  private canvasListener: CanvasListener;
  private renderer: Renderer;
  private masterClock = new THREE.Clock();
  private activeScene?: BaseScene;

  constructor() {
    makeObservable(this, {
      activeSceneName: observable,
      selectScene: action,
    });
  }

  public setup() {
    // Setup screen listener
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Could not find main canvas');
      return;
    }
    this.canvasListener = new CanvasListener(canvas);

    // Renderer
    this.renderer = new Renderer(this.canvasListener);

    // Load initial scene
    this.selectScene(SceneName.CANNON_PHYSICS);

    // Start render loop
    this.update();
  }

  public toggleFullScreen = () => {
    // For safari use: document.webkitFullscreenElement (typescript doesn't like it)

    if (!document.fullscreenElement) {
      this.canvasListener.canvas.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  public selectScene = (sceneName: SceneName) => {
    // Clean up current scene
    this.activeScene?.destroyScene();

    // Load up new scene
    switch (sceneName) {
      case SceneName.BASIC_TRANSFORMS:
        this.activeScene = new BasicTransfoms(this.canvasListener);
        break;
      case SceneName.BASIC_ORBIT_CAM:
        this.activeScene = new BasicOrbitCamScene(this.canvasListener);
        break;
      case SceneName.STANDARD_ORBIT_CAM:
        this.activeScene = new StandardOrbitCamScene(this.canvasListener);
        break;
      case SceneName.BUFFER_GEOMETRY:
        this.activeScene = new BufferGeometryScene(this.canvasListener);
        break;
      case SceneName.BASIC_TEXTURE:
        this.activeScene = new BasicTextureScene(this.canvasListener);
        break;
      case SceneName.MATERIALS:
        this.activeScene = new MaterialsScene(this.canvasListener);
        break;
      case SceneName.TEXT:
        this.activeScene = new TextScene(this.canvasListener);
        break;
      case SceneName.CANNON_PHYSICS:
        this.activeScene = new CannonPhysicsScene(this.canvasListener);
        break;
    }

    // Initialise newly active scene
    this.activeScene.initScene();

    this.activeSceneName = sceneName;
  };

  private update = () => {
    requestAnimationFrame(this.update);

    const deltaTime = this.masterClock.getDelta();

    this.activeScene.updateScene(deltaTime);

    this.renderer.render(this.activeScene.scene, this.activeScene.camera);
  };
}
