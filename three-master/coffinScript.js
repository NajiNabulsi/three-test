console.log('hello coffin');
import * as THREE from "./build/three.module.js";

import { GLTFLoader } from "./examples/jsm/loaders/GLTFLoader.js";

import { OrbitControls } from "./examples/jsm/controls/OrbitControls.js";

import Stats from './examples/jsm/libs/stats.module.js'

// sizes
const sizes = {
 width: 800,
 height: 600
};
//  image for texture link
// const imageSource = 'http://localhost/wp/three/wp-content/themes/wpcourse/assets/three-master/Wood_Texture.jpg'
const url = 'http://localhost/3dBlock/wp-content/plugins/three-test/three-master'
const imageSource = `${url}/Wood_Texture.jpg`
   
 
// the model link
// const fairwellkaal = `${url}/Fairwell_kaal.gltf`
const fairwellkaal = `${url}/Fairwell_kaal.gltf`

const image = new Image()
const texture = new THREE.Texture(image)
image.addEventListener('load', () =>
{
   texture.needsUpdate = true
})
image.src = imageSource
/**
* Debug
*/

const container = document.getElementById( 'container' );
const webgl = document.querySelector( '.webgl' );// TEST LOADIN
const stats = new Stats();
// container.appendChild( stats.dom );

const scene = new THREE.Scene();

const material = new THREE.MeshBasicMaterial({map : texture});

// loader
const loader = new GLTFLoader();

loader.load(fairwellkaal, (gltf) => {
 const model = gltf.scene;
 
 // to add material for model
 model.traverse((child) =>   { child.material = material});
 
 model.position.set(0, -0.75, 0);
 model.scale.set(1, 1, 1);
 model.rotation.set(0, 90, 0);
 model.material = material;
 scene.add(model);

} ,
// called while loading is progressing
function ( gltf ) {
   console.log( ( gltf.loaded / gltf.total * 100 ) + '% loaded' );
},
// called when loading has errors
function ( error ) {
webgl.innerHTML= 'An error happened'
 console.log( 'An error happened' );

});

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(3, 10, 10);
scene.add(dirLight);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
camera.position.y = 0;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(sizes.width / 2, sizes.height /2);
renderer.setClearColor(0xffffff, 0);
renderer.setClearAlpha(0.5);
container.appendChild( renderer.domElement );

window.onresize = function () {
 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();

//  renderer.setSize(window.innerWidth, window.innerHeight);
};

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const tick = () => {
 // const elapsedTime = clock.getElapsedTime();

 // Update controls
 controls.update();

 // Render
 renderer.render(scene, camera);

 // Call tick again on the next frame
 window.requestAnimationFrame(tick);
};

tick();