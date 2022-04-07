console.log('hello coffin');

// var u = window.location;
// console.log('url: ',u)
// console.log('url: ',u.origin)

import * as THREE from "./build/three.module.js";

import { GLTFLoader } from "./examples/jsm/loaders/GLTFLoader.js";

import { OrbitControls } from "./examples/jsm/controls/OrbitControls.js";

/**
 * sizes
 */
const sizes = {
 width: 800,
 height: 600
};

/**
 * global variables
 */
const hexColor = {color:0x8A3C11}

/**
 * links for image, texture and fils
 */
const url = 'http://localhost/3dBlock/wp-content/plugins/three-test/three-master'
const imgUrl = 'http://localhost/3dBlock/wp-content/uploads/2022/04'
 
/**
 * the model link
 */
 const fairwellkaal = `${url}/puur2.glb`

/**
 * Environment map
 */
//  const cubTextureLoader = new THREE.CubeTextureLoader()

 /**
  * land environment
  */
//  const environmentMap = cubTextureLoader.load([
  
//    `${imgUrl}/px.jpg`,
//    `${imgUrl}/nx.jpg`,
//    `${imgUrl}/py.jpg`,
//    `${imgUrl}/ny1.jpg`,
//    `${imgUrl}/pz.jpg`,
//    `${imgUrl}/nz.jpg`
//  ])

/**
  * ston environment
*/
//  const environmentMap = cubTextureLoader.load([
  
//    `${imgUrl}/nx1.jpg`,
//    `${imgUrl}/nx1.jpg`,
//    `${imgUrl}/nx1.jpg`,
//    `${imgUrl}/nx1.jpg`,
//    `${imgUrl}/nx1.jpg`,
//    `${imgUrl}/nx1.jpg`
//  ])

 /**
  * Dom element
  */
 const container = document.getElementById( 'container' );
const webgl = document.querySelector( '.webgl' );// TEST LOADIN

/**
* texture
*/
const matcapFhoto = `${imgUrl}/metacup.jpg`

const sceneEnvironmentFhoto = `${imgUrl}/scene-environment-1.jpg`
// const sceneEnvironmentFhoto = `${imgUrl}/scene-environment.jpg`

const matcapTexture = new THREE.TextureLoader().load(matcapFhoto)
const sceneEnvironment = new THREE.TextureLoader().load(sceneEnvironmentFhoto)


const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;

/**
 * Scene
 */
const scene = new THREE.Scene();
scene.background = sceneEnvironment
// scene.background = environmentMap

/**
 * loader
 */
const loader = new GLTFLoader();

loader.load(fairwellkaal, (gltf) => {
 const model = gltf.scene;
 
 /**
  * to add material for model
  */
 model.traverse((child) =>   { child.material = material});
 
 model.position.set(0, -1.50, 0);
//  model.scale.set(1, 1, 1);
 model.rotation.set(0, 0, -0.15);
//  model.material = material;
 scene.add(model);

} ,

/**
 * called while loading is progressing
 */
function ( gltf ) {
   console.log( ( gltf.loaded / gltf.total * 100 ) + '% loaded' );
},

/**
 * called when loading has errors
 */
function ( error ) {
webgl.innerHTML= 'An error happened'
 console.log( 'An error happened' );

});

/**
 * lights
 */

// const dirLight = new THREE.DirectionalLight(0xffffff);
// dirLight.position.set(0, 2, 0);
// scene.add(dirLight);

// const light = new THREE.AmbientLight(0x404040); // soft white light
// scene.add(light);

/**
 * camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);

/**
 * renderer
 */
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

 /**
  * Update controls
  */
 controls.update();

 /**
  * Render
  */
 renderer.render(scene, camera);

 /**
  * Call tick again on the next frame
  */
 window.requestAnimationFrame(tick);
};

tick();