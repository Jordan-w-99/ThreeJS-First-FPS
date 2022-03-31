import * as THREE from './three';

export default class Camera extends THREE.PerspectiveCamera{
    constructor(position){
        const FOV = 75;
        const aspectRatio = window.innerWidth / window.innerHeight;
        const near = 0.1;
        const far = 9999999;
        
        super(FOV, aspectRatio, near, far);
        this.position.set(position.x, position.y, position.z);
    }
}