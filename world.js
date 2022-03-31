import * as THREE from 'three';
import Player from './player';

import sb_ft from "./assets/skybox/sh_ft.png";
import sb_bk from "./assets/skybox/sh_bk.png";
import sb_up from "./assets/skybox/sh_up.png";
import sb_dn from "./assets/skybox/sh_dn.png";
import sb_lf from "./assets/skybox/sh_lf.png";
import sb_rt from "./assets/skybox/sh_rt.png";

import gnd from "./assets/grassTile.png";

export default class World extends THREE.Scene {
    constructor() {
        super();
        // Ambient Light
        this.ambientLighting = new THREE.AmbientLight(0xFFFFFF, 0.1);
        this.add(this.ambientLighting);

        // Sunlight (directional) Light
        this.sunlightOffset = new THREE.Vector3(4, 10, 3);
        this.sunlight = new THREE.DirectionalLight(0xFFFFFF, 1);
        this.sunlight.castShadow = true;

        this.camSize = 20;
        this.sunlight.shadow.camera.near = -this.camSize;
        this.sunlight.shadow.camera.far = this.camSize * 2;
        this.sunlight.shadow.camera.left = this.camSize;
        this.sunlight.shadow.camera.right = -this.camSize;
        this.sunlight.shadow.camera.top = this.camSize;
        this.sunlight.shadow.camera.bottom = -this.camSize;

        this.sunlight.shadow.mapSize.width = 2048 * 8;
        this.sunlight.shadow.mapSize.height = 2048 * 8;

        this.sunlightTarget = new THREE.Object3D();

        this.sunlight.target = this.sunlightTarget;
        this.add(this.sunlight);
        this.add(this.sunlight.target);

        this.lightHelper = new THREE.CameraHelper(this.sunlight.shadow.camera);
        // this.add(this.lightHelper);

        // Ground
        const groundTexture = new THREE.TextureLoader().load(gnd);
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(12, 12);
        this.ground = new THREE.Mesh(
            new THREE.BoxGeometry(50, 0.001, 50),
            new THREE.MeshStandardMaterial({ map: groundTexture })
        )
        this.ground.position.set(0, -0.001, 0);
        this.ground.receiveShadow = true;
        this.add(this.ground);

        // Box
        this.box = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial({ color: 0xff00ff })
        );
        this.box.position.set(3, this.box.scale.y, 0);
        this.box.castShadow = true;
        this.add(this.box);

        this.player = new Player();
        this.add(this.player);

        // skybox
        const ft = new THREE.TextureLoader().load(sb_ft);
        const bk = new THREE.TextureLoader().load(sb_bk);
        const up = new THREE.TextureLoader().load(sb_up);
        const dn = new THREE.TextureLoader().load(sb_dn);
        const lf = new THREE.TextureLoader().load(sb_lf);
        const rt = new THREE.TextureLoader().load(sb_rt);

        const skyboxMaterialArray = [
            new THREE.MeshBasicMaterial({ map: ft, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: bk, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: up, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: dn, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: rt, side: THREE.BackSide }),
            new THREE.MeshBasicMaterial({ map: lf, side: THREE.BackSide }),
        ];
        this.skyBox = new THREE.Mesh(
            new THREE.BoxGeometry(1000, 1000, 1000),
            skyboxMaterialArray
        )

        this.add(this.skyBox);
    }

    update() {
        this.player.update();

        this.skyBox.position.copy(this.player.camera.position);

        const lookDir = this.player.controls.getDirection(new THREE.Vector3(0, 0, 0)).multiplyScalar(this.camSize - 1);
        lookDir.y = 0;

        this.sunlight.position.copy(this.player.camera.position);
        this.sunlight.position.add(lookDir);
        this.sunlight.position.add(this.sunlightOffset);

        this.sunlightTarget.position.copy(this.player.camera.position);
        this.sunlightTarget.position.add(lookDir);
        this.sunlightTarget.position.sub(this.sunlightOffset);
    }
}