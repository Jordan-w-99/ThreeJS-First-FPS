import * as THREE from './three';
import { PointerLockControls } from './three/examples/jsm/controls/PointerLockControls'
import Camera from './camera'

export default class Player extends THREE.Object3D {
    constructor() {
        super();
        this.camera = new Camera(new THREE.Vector3(0, 1.4, 0));
        this.controls = new PointerLockControls(this.camera, document.body);
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.speed = 0.1;

        this.body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.5, 1.5, 30),
            new THREE.MeshBasicMaterial( { color: 0xFFFFFF })
        );
        this.body.position.set(5, 0.75, 5);
        this.body.castShadow = true;
        this.add(this.body);
    }

    update() {
        this.controls.moveRight(this.velocity.x * this.speed);
        this.controls.moveForward(this.velocity.y * this.speed);

        this.body.position.copy(this.camera.position);
    }
}