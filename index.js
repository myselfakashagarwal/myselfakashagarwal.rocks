
/* 
  constants
*/
const sizes = { width: window.innerWidth, height: window.innerHeight };
var device;
if (window.device.mobile()) {
  device = "mobile";
} else if (window.device.desktop()) {
  device = "desktop";
} else {
  device = "tablet";
}

/*
  canvas and scene
*/
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 1000000);

/*
  camera and controls
*/
camera.position.set(0, 0, 0.000000001);
camera.rotation.set(0, Math.PI, 0);
camera.scale.set(1, 1, 1);
scene.add(camera);
const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.maxDistance = 6;
/*
  objects
*/

const testGeometry = new THREE.BoxBufferGeometry(1,1,1,1,1,1)
const testMaterial = new THREE.MeshNormalMaterial({wireframe:true})
const test = new THREE.Mesh(testGeometry,testMaterial)
scene.add(test);

/*
  render
*/
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/*
  animate and update
*/
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
