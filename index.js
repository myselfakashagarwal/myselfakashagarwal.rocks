/*
  pre
*/
var three = document.getElementById('three');

/*
  constants and varibales 
*/
var device;
if (window.device.mobile()) { device = "mobile";} 
else if (window.device.desktop()) { device = "desktop"; } 
else { device = "tablet"; } 
var width = window.innerWidth;
var height = window.innerHeight;
var charSet = '10';
var start = Date.now();
var fontSize = 10;
var globeSize = 280;
if(device == "desktop")
{
  fontSize = 20;
  globeSize = 260;
}

/*
  scene
*/
console.log(THREE);
var scene = new THREE.Scene();

/*
  camera and controls 
*/
var camera = camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000000);
camera.position.z = 450
var controls = new THREE.OrbitControls(camera, three);
controls.maxPolarAngle = Math.PI / 2.8
controls.minPolarAngle = Math.PI / 2.8
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.rotateSpeed = 0.05;
controls.update();

/*
  lights 
*/
var sunlight = new THREE.DirectionalLight('white', 2);
sunlight.position.set(0, 0, 2);
scene.add(sunlight);

/*
  Textures and Objects 
*/

/* Textures */
var earthTexture = './assets/earth.jpg';
var sphereTex = new THREE.TextureLoader().load(earthTexture);
sphereTex.magFilter = THREE.NearestFilter;
sphereTex.minFilter = THREE.NearestFilter;
var sphereMat = new THREE.MeshToonMaterial({
  map: sphereTex,
  color:'white',
  shininess: 0,
  reflectivity: 0,
  side: THREE.DoubleSide,
});

/*
 Objects
*/

var galaxyMaterial = new THREE.MeshBasicMaterial({color:`grey`})
galaxyMaterial.side = THREE.DoubleSide
var galaxyGerometry = new THREE.SphereGeometry(1000, 32, 32)
var galaxy = new THREE.Mesh(galaxyGerometry, galaxyMaterial)
//scene.add(galaxy);

var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(globeSize, 25, 25), sphereMat);
scene.add(sphere);
if(device == "desktop")
{
  sphere.position.set(0,0,0);
}
else
{
  sphere.position.set(0,-235, 0);

}


/*
renderer 
*/

var renderer = new THREE.WebGLRenderer({ alpha: true });
var asciiRenderer;
// the renderer must have a parent element to work
three.appendChild(renderer.domElement);
asciiRenderer = new AsciiRenderer(renderer, {
  charSet: charSet,
  fontSize: fontSize,
  opacity: 1,
});

init();
function init() {
    onWindowResize();
}

/*
  render 
*/
function render() {
  var timer = Date.now() - start;
  sphere.rotation.y = timer * 0.0002;
  controls.update();
  renderer.render(scene, camera);
}

/*
  resize 
*/
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  var width = three.clientWidth;
  var height = three.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  asciiRenderer.setSize(width, height);
}

/*
  animate 
*/
animate();
function animate() {
  requestAnimationFrame(animate);
  render();
}

if(device != "desktop")
{
  camera.position.z = 800;
}

/*
  components 
*/

const content = document.getElementById('content');
const homeDiv = document.getElementById('homeDiv');
const homeDivGreet = document.getElementById('homeDivGreet');
const homeDivName = document.getElementById('homeDivName');
const homeDivTitle = document.getElementById('homeDivTitle');
const aboutDiv = document.getElementById('aboutDiv');
const aboutDivTitle = document.getElementById('aboutDivTitle');
const aboutDivContent = document.getElementById('aboutDivContent');
const skillsDiv = document.getElementById('skillsDiv');
const skillsDivTitle = document.getElementById('skillsDivTitle');
const skillsDivParagraph = document.getElementById('skillsDivParagraph');
if(device == "desktop" )
{
  homeDivGreet.style.fontSize = "100px";
  homeDivName.style.fontSize = "120px";
  homeDivTitle.style.fontSize = "50px";
  skillsDiv.style.top = homeDiv.clientHeight + aboutDiv.clientHeight + 100 + "px";

}
else
{
  aboutDivTitle.style.fontSize = "30px";
  aboutDivContent.style.fontSize = "20px";
  skillsDivTitle.style.fontSize = "30px";
  skillsDivParagraph.style.fontSize = "20px";
  skillsDiv.style.top = homeDiv.clientHeight + aboutDiv.clientHeight + 200 + "px";
}