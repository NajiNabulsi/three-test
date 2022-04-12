console.log("coffin Model... start");

// var u = window.location;
// console.log('url: ',u)
// console.log('url: ',u.origin)

import * as THREE from "./build/three.module.js";

import { GLTFLoader } from "./examples/jsm/loaders/GLTFLoader.js";

import { OrbitControls } from "./examples/jsm/controls/OrbitControls.js";

/**
 * Background Color
 */
const whiteBackgroundColor = '#E4CB8F'

/**
 * sizes
 */
const sizes = {
  width: 800,
  height: 600
};

/**
 * global var for links, image, texture and files
 * to avoid broken links need to change this links to web host links
 */
// office url
 const url = 'http://localhost/3dBlock/wp-content/plugins/three-test/three-master'
 const imgUrl = 'http://localhost/3dBlock/wp-content/uploads/2022/04'

//Home url
// const url =  "http://localhost/code/wp/dynamicList/wp-content/plugins/three-test/three-master";
// const imgUrl = "http://localhost/code/wp/dynamicList/wp-content/uploads/2022/04";

/**
 * the model link
 */
const fairwellkaal = `${url}/puur2.glb`;
const sunflower = `${url}/sunflower.glb`;

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
const container = document.getElementById("container");
const webgl = document.querySelector(".webgl"); // TEST LOADIN
/**
 * Materials
 */
//  const grassFhoto = `${imgUrl}/grass.jpeg`;
//  const grassFhoto = `${imgUrl}/grass-1.jpg`;
//  const floorTexture = new THREE.TextureLoader().load(grassFhoto);
// const StandardMaterial = new THREE.MeshStandardMaterial({color: new THREE.Color(0xFDF8EF), roughness : 2  , metalness: 1 });
const StandardMaterial = new THREE.MeshStandardMaterial({roughness : 2  , metalness: 1 });

// StandardMaterial.roughness = 0.7;

/**
* texture
*/

// const matcapFhoto = `${imgUrl}/metacup.jpg`;

// const sceneEnvironmentFhoto = `${imgUrl}/scene-environment-1.jpg`;
// // const sceneEnvironmentFhoto = `${imgUrl}/scene-environment.jpg`

// const matcapTexture = new THREE.TextureLoader().load(matcapFhoto);
// // const sceneEnvironment = new THREE.TextureLoader().load(sceneEnvironmentFhoto);

// const matcapMaterial = new THREE.MeshMatcapMaterial();
// matcapMaterial.matcap = matcapTexture;
// // matcapMaterial.roughness = 1
// // material.color = new THREE.Color('#e0ddd5')
// matcapMaterial.color = new THREE.Color("#E4CB8F");

// const matcapTexture = new THREE.TextureLoader().load(matcapFhoto);
// const sceneEnvironment = new THREE.TextureLoader().load(sceneEnvironmentFhoto);

/** MeshStandardMaterial */
// const matcapMaterial = new THREE.MeshStandardMaterial();
// matcapMaterial.matcap = matcapTexture;
// matcapMaterial.roughness = 1
// material.color = new THREE.Color('#e0ddd5')
// matcapMaterial.color = new THREE.Color("#E4CB8F");
//  matcapMaterial.color = new THREE.Color('rgb(105, 45, 14)');

/**
 * Scene
 */
const scene = new THREE.Scene();
// scene.setClearColor(0xFDF8EF,1)
// scene.background = sceneEnvironment
// scene.background = environmentMap

/**
 * loader
 */
const loader = new GLTFLoader();

loader.load(
  // fairwellkaal,
  sunflower,
  gltf => {
    console.log("gltf: ", gltf);
    const model = gltf.scene;
    model.children[0].traverse(child => {
      child.castShadow = true;
      child.receiveShadow = true;
      
    });
    model.children[0].children[0].material.flatShading = true
   console.log(model.children[0].matrial)
   console.log( model.children[0].children[0].material.flatShading)
    /**
  * to add material for model
  */
    // model.traverse(child => {
    //   child.material =  StandardMaterial 
    // });
    //  model.traverse((child) =>   { child.Mesh.castShadow = true});
    
    model.position.set(0, -0.75, 0)
    model.rotation.set(0, 0, -0.10);
    scene.add(model);
  },
  /**
 * called while loading is progressing
 */
  function(gltf) {
    console.log(gltf.loaded / gltf.total * 100 + "% loaded");
  },
  /**
 * called when loading has errors
 */
  function(error) {
    webgl.innerHTML = "An error happened";
    console.log("An error happened");
  }
);

/**
 * Floor ( CircleGeometry )
 */

// const floor = new THREE.Mesh(
//   new THREE.CircleBufferGeometry(30, 50),
//   StandardMaterial
// );
// floor.rotation.x = -Math.PI * 0.5;
// floor.position.y = -1.35;
// floor.receiveShadow = true;
// scene.add(floor);

/**
 * lights
 */
const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(-0.3, 10, 10 );
// dirLight.castShadow = true;

// // dirLight.shadow.mapSize.width = 1024; // default
// // dirLight.shadow.mapSize.height = 1024; // default
// // dirLight.shadow.camera.near = 0.5; // default
// // dirLight.shadow.camera.far = 500; // default
scene.add(dirLight);

// // const helper = new THREE.DirectionalLightHelper( dirLight, 2 );
// // scene.add( helper );

const dirLight1 = new THREE.DirectionalLight(0xffffff);
// // dirLight1.castShadow = true
dirLight1.position.set(15, 8, -10 );
scene.add(dirLight1);

// // const helper1 = new THREE.DirectionalLightHelper( dirLight1, 2 );
// // scene.add( helper1 );

const topLight = new THREE.DirectionalLight(0xd3d2d1)
topLight.position.set(0, 10, 0)
// topLight.position.set(-1.5, 0.5, -10 );
// topLight.castShadow = true

scene.add(topLight)

const frontLight = new THREE.DirectionalLight(0xd3d2d1)
frontLight.position.set(-10, 0, 0)
// frontLight.position.set(-1.5, 0.5, -10 );
// frontLight.castShadow = true

scene.add(frontLight)

const buttomLight = new THREE.DirectionalLight(0xd3d2d1)
buttomLight.position.set(0, -10, 0)
// buttomLight.position.set(-1.5, 0.5, -10 );
// buttomLight.castShadow = true

scene.add(buttomLight)

// const topHelper = new THREE.DirectionalLightHelper(topLight, 2)
// topHelper.castShadow = true
// scene.add(topHelper)

// const pointLight = new THREE.DirectionalLight(0xffffff);
// pointLight.position.set( 0 , 0, 1.5);
// pointLight.castShadow = true
// scene.add( pointLight );

// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
// scene.add( pointLightHelper );

// const light = new THREE.AmbientLight(0xffffff); // soft white light
// scene.add(light);

/**
 * camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 4;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);

/**
 * renderer
 */
// global variable to set the size of the window
const reSize = 1.5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth / reSize, window.innerHeight / reSize);
// renderer.setClearColor(0xf7f4f4, 1);
// renderer.setClearColor(0xaaa4a4);
renderer.setClearColor('#FDF8EF',0.95);
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

container.appendChild(renderer.domElement);

window.onresize = function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / reSize, window.innerHeight / reSize);
};

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.enableZoom = false;

controls.maxPolarAngle = 0;
controls.minPolarAngle = 1.5;

controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;

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
