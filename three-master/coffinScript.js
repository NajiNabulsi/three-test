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
 * global variables
 */
const hexColor = { color: 0x8a3c11 };

/**
 * global var for links, image, texture and files
 * to avoid broken links need to change this links to web host links
 */
const url =
  "http://localhost/code/wp/dynamicList/wp-content/plugins/three-test/three-master";
const imgUrl =
  "http://localhost/code/wp/dynamicList/wp-content/uploads/2022/04";

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
* texture
*/
const matcapFhoto = `${imgUrl}/metacup.jpg`;

const sceneEnvironmentFhoto = `${imgUrl}/scene-environment-1.jpg`;
// const sceneEnvironmentFhoto = `${imgUrl}/scene-environment.jpg`

const matcapTexture = new THREE.TextureLoader().load(matcapFhoto);
const sceneEnvironment = new THREE.TextureLoader().load(sceneEnvironmentFhoto);

const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
// material.color = new THREE.Color('#e0ddd5')
material.color = new THREE.Color("#E4CB8F");

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
      n.receiveShadow = true;
    });

    /**
  * to add material for model
  */
    model.traverse(child => {
      child.material = material;
    });
    //  model.traverse((child) =>   { child.Mesh.castShadow = true});

    model.position.y = -1.25;
    //  model.position.set(0, -1.25, 0);
    //  model.position.set(0, -1.50, 0);
    //  model.scale.set(1, 1, 1);
    model.rotation.set(0, 0, -0.15);
    model.castShadow = true;
    //  model.material = material;
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
 * CircleGeometry
 */
// const geometry = new THREE.PlaneBufferGeometry( 20,20 );
const geometry = new THREE.CircleBufferGeometry(10, 20);
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xfdf8ef });
// circleMaterial.side = THREE.DoubleSide
const floor = new THREE.Mesh(geometry, circleMaterial);
floor.receiveShadow = true;

// floor.rotateY(90)
floor.rotation.x = 300;
// floor.rotation.y = 180
floor.rotation.z = 0;
floor.position.y = -2;
// floor.rotateZ(90)
scene.add(floor);

/**
 * test
 */
// const geometry = new THREE.PlaneBufferGeometry( 20,20 );
const geo = new THREE.BoxGeometry(1, 1, 1);
const geoMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geo, geoMaterial);
cube.castShadow = true;
scene.add(cube);

/**
 * lights
 */
var spotLight = new THREE.SpotLight("red");
spotLight.position.set(500, 500, 500);
spotLight.castShadow = true;
//  spotLight.shadowCameraVisible = true;

spotLight.shadow.mapSize.height = 100;
spotLight.shadow.mapSize.width = 100;
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(0, 2, 0);
dirLight.castShadow = true;
scene.add(dirLight);

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
// renderer.setSize(sizes.width, sizes.height );
// renderer.setSize(sizes.width /2, sizes.height/2 );
renderer.setClearColor(0xfdf8ef, 1);
// renderer.setClearAlpha(0.5);
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
controls.enableZoom = false;

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
