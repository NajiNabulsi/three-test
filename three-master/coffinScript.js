/**
* old script for old coffin
 */
console.log("coffin Model... start");

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
 * global var for links, image, texture and files
 * to avoid broken links need to change this links to web host links
 */
// office url
 const url = 'http://localhost/3dBlock/wp-content/plugins/three-test/three-master'
 const imgUrl = 'http://localhost/3dBlock/wp-content/uploads/2022/04'

//Home url
// const url =
//   "http://localhost/code/wp/dynamicList/wp-content/plugins/three-test/three-master";
// const imgUrl =
//   "http://localhost/code/wp/dynamicList/wp-content/uploads/2022/04";

/**
 * the model link
 */
const fairwellkaal = `${url}/puur2.glb`;

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
const floorMaterial = new THREE.MeshStandardMaterial();
floorMaterial.roughness = 0;
floorMaterial.metalness = 0

const modelEnvoMapFhoto = `${imgUrl}/TexturesCom_FabricPlain0052_1_M.jpg`;
const modelEnvoMapTexture = new THREE.TextureLoader().load(modelEnvoMapFhoto );

const modealMaterial = new THREE.MeshStandardMaterial();
// modealMaterial.color = new THREE.Color(0xC6BBA7)
modealMaterial.color = new THREE.Color(0x968766)
// modealMaterial.roughness =   ;
modealMaterial.metalness = 1
modealMaterial.roughness = 1
modealMaterial.envMap = modelEnvoMapTexture

/**
* texture
*/
// const matcapFhoto = `${imgUrl}/TexturesCom_FabricPlain0052_1_M.jpg`;

// const sceneEnvironmentFhoto = `${imgUrl}/scene-environment-1.jpg`;
// const sceneEnvironmentFhoto = `${imgUrl}/scene-environment.jpg`

// const matcapTexture = new THREE.TextureLoader().load(matcapFhoto);
// const sceneEnvironment = new THREE.TextureLoader().load(sceneEnvironmentFhoto);

// const matcapMaterial = new THREE.MeshMatcapMaterial();
// matcapMaterial.matcap = matcapTexture;
// material.color = new THREE.Color('#e0ddd5')
// matcapMaterial.color = new THREE.Color("#E4CB8F");

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
  fairwellkaal,
  gltf => {
    console.log("gltf: ", gltf);
    const model = gltf.scene;
    model.children[0].traverse(n => {
      n.castShadow = true;
      // n.receiveShadow = true;
    });

    /**
  * to add material for model
  */
    model.traverse(child => {
      child.material = modealMaterial;
    });
    //  model.traverse((child) =>   { child.Mesh.castShadow = true});

    model.position.y = -1.25;
    model.rotation.set(0, 0, -0.15);
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

const floor = new THREE.Mesh(
  new THREE.CircleBufferGeometry(50, 20),
  floorMaterial
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = -1.75;
floor.receiveShadow = true;
scene.add(floor);

/**
 * lights
 */
const dirLight = new THREE.PointLight(0xffffff, 1 ,10);
dirLight.position.set(0, -0.5, 2);
dirLight.castShadow = true;
scene.add(dirLight);

// const helper = new THREE.PointLightHelper(dirLight, 1)
// scene.add(helper)

const leftLight = new THREE.PointLight(0xffffff, 1 ,10);
leftLight.position.set(0,-0.5, -2);
// leftLight.castShadow = true;
scene.add(leftLight);

// const helper1 = new THREE.PointLightHelper(leftLight, 1)
// scene.add(helper1)

const forLight = new THREE.PointLight(0xffffff, 1 ,10);
forLight.position.set(-3, -0.8, 0);
// forLight.castShadow = true;
scene.add(forLight);

// const helper3 = new THREE.PointLightHelper(forLight, 1)
// scene.add(helper3)

// const afterLight = new THREE.PointLight(0xffffff, 1 ,10);
// afterLight.position.set(3, -0.8, 0);
// // afterLight.castShadow = true;
// scene.add(afterLight);

// const helper4 = new THREE.PointLightHelper(afterLight, 1)
// scene.add(helper4)

const topLight = new THREE.PointLight(0xffffff,1,100);
topLight.position.set(0,1, 0);
// topLight.castShadow = true;
// topLight.shadow.mapSize.width = 1024
// topLight.shadow.mapSize.height = 1024
scene.add(topLight);


// const helper2 = new THREE.PointLightHelper(topLight, 1)
// scene.add(helper2)


// const light = new THREE.AmbientLight(0x404040); // soft white light
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
camera.position.y = 2;
camera.position.x = 0;
scene.add(camera);

/**
 * renderer
 */
// global variable to set the size of the window
const reSize = 1.5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth / reSize, window.innerHeight / reSize);
// renderer.setClearColor(0xfdf8ef, 1);
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

// controls.maxPolarAngle = 0;
// controls.minPolarAngle = 1.5;

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