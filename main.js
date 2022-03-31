import * as THREE from './three';
import Stats from './nodestats.js';
import World from './world';

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const world = new World();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canv')
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.addEventListener('click', () => {
  world.player.controls.lock();
});

document.addEventListener('keydown', e => {
  switch(e.key){
    case 'w':
      world.player.velocity.y = 1;
      break;
    case 'a':
      world.player.velocity.x = -1;
      break;
    case 's':
      world.player.velocity.y = -1; 
      break;
    case 'd':
      world.player.velocity.x = 1;
      break;
    case ' ':
      world.player.velocity.z = 1;
      break;
  }
});

document.addEventListener('keyup', e => {
  switch(e.key){
    case 'w':
      world.player.velocity.y = 0;
      break;
    case 'a':
      world.player.velocity.x = 0;
      break;
    case 's':
      world.player.velocity.y = 0; 
      break;
    case 'd':
      world.player.velocity.x = 0;
      break;
  }
});

function animate() {
  stats.begin();

  renderer.render(world, world.player.camera);

  world.update();

  requestAnimationFrame(animate);

  stats.end();
}

animate();
