console.log('hello coffin');

// let test='<?php echo json_encode($pluginUrl) ?>'; 
// console.log(test);

var u = window.location;
console.log('url: ',u)
console.log('url: ',u.origin)

import * as THREE from "./build/three.module.js";

import { GLTFLoader } from "./examples/jsm/loaders/GLTFLoader.js";

import { OrbitControls } from "./examples/jsm/controls/OrbitControls.js";

// sizes
const sizes = {
 width: 800,
 height: 600
};

// global variables
const hexColor = {color:0x8A3C11}

//  image for texture link
// const imageSource = 'http://localhost/wp/three/wp-content/themes/wpcourse/assets/three-master/Wood_Texture.jpg'
// const url = 'http://localhost/3dBlock/wp-content/plugins/three-test/three-master'
const url = 'http://localhost/3dBlock/wp-content/plugins/three-test/three-master'
// const imageSource = `${url}/Wood_Texture.jpg`
   
 
// the model link
// const fairwellkaal = `${url}/Fairwell_kaal.gltf`
// const fairwellkaal = `${url}/puur2.glb`
const fairwellkaal = `${url}/puur2.glb`

/**
 * Environment map
 */
 const cubTextureLoader = new THREE.CubeTextureLoader()
 const environmentMap = cubTextureLoader.load([
  
   `${url}/cubTexture/px.jpg`,
   `${url}/cubTexture/nx.jpg`,
   `${url}/cubTexture/py.jpg`,
   `${url}/cubTexture/ny.jpg`,
   `${url}/cubTexture/pz.jpg`,
   `${url}/cubTexture/nz.jpg`
 ])

 /**
  * Dom element
  */
 const container = document.getElementById( 'container' );
const webgl = document.querySelector( '.webgl' );// TEST LOADIN
// const stats = new Stats();
// container.appendChild( stats.dom );

/**
* texture
*/
const matcapFhoto = `${url}/texture/metacup.jpg`
const matcapTexture = new THREE.TextureLoader().load(matcapFhoto)

// const material = new THREE.MeshPhongMaterial({color: hexColor.color});
// const material = new THREE.MeshBasicMaterial();
// const material = new THREE.MeshLambertMaterial();
const material = new THREE.MeshMatcapMaterial();
// material.reflectivity = 0.5;
// material.refractionRatio = 0.5;
// material.transparent = true
// material.color = new THREE.Color(0x684523)
material.matcap = matcapTexture;

/**
 * Scene
 */
const scene = new THREE.Scene();
scene.background = environmentMap

// loader
const loader = new GLTFLoader();

loader.load(fairwellkaal, (gltf) => {
 const model = gltf.scene;
 
 // to add material for model
 model.traverse((child) =>   { child.material = material});
 
 model.position.set(0, -0.75, 0);
//  model.scale.set(1, 1, 1);
//  model.rotation.set(0, 0, 0);
//  model.material = material;
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

// const dirLight = new THREE.DirectionalLight(0xffffff);
// dirLight.position.set(3, 10, 10);
// scene.add(dirLight);

// const light = new THREE.AmbientLight(0x404040); // soft white light
// scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(sizes.width , sizes.height );
renderer.setClearColor(0xffffff, 0);
renderer.setClearAlpha(0.5);
renderer.outputEncoding = THREE.sRGBEncoding;
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