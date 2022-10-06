import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { BaseScene } from '../BaseScene';

export class CannonPhysicsScene extends BaseScene {
  private _camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private physicsWorld: CANNON.World;
  private physicsTimestep = 1 / 60;
  private ballBody: CANNON.Body;
  private ballMesh: THREE.Mesh;

  public get camera() {
    return this._camera;
  }

  public initScene(): void {
    this.scene = new THREE.Scene();

    this.setupCamera();

    // Ground plane
    const planeGeom = new THREE.PlaneGeometry(100, 100);
    const planeMat = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeom, planeMat);
    plane.rotation.x = Math.PI / 2;
    this.scene.add(plane);

    // Ball
    const ballGeom = new THREE.SphereGeometry(5, 32, 16);
    const ballMat = new THREE.MeshBasicMaterial({ color: 'blue' });
    const ball = new THREE.Mesh(ballGeom, ballMat);
    ball.position.y = 5;
    this.ballMesh = ball;
    this.scene.add(ball);

    // Cannon world
    this.physicsWorld = new CANNON.World();
    this.physicsWorld.gravity.set(0, -9.82, 0);

    // Cannon ball
    const ballShape = new CANNON.Sphere(5);
    const ballBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 20, 0),
      shape: ballShape,
    });
    this.physicsWorld.addBody(ballBody);
    this.ballBody = ballBody;
  }

  private setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      this.canvasListener.width / this.canvasListener.height,
      0.1,
      1000
    );
    camera.position.x = 25;
    camera.position.y = 25;
    camera.position.z = 25;
    this._camera = camera;
    this.controls = new OrbitControls(this.camera, this.canvasListener.canvas);
    this.controls.enableDamping = true;
  }

  public updateScene(deltaTime: number): void {
    this.controls.update();

    this.physicsWorld.step(this.physicsTimestep, deltaTime, 5);

    // Update ball position to that of its physics body
    this.ballMesh.position.set(
      this.ballBody.position.x,
      this.ballBody.position.y,
      this.ballBody.position.z
    );
  }

  public destroyScene(): void {}
}
