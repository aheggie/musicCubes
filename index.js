//Scene Objects Camera Renderer

//Scene

const scene = new THREE.Scene();

//Mesh

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#FF6F00" });
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.x = 2;
scene.add(mesh);
//Camera

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height); //default near and far is 1, 2000

camera.position.x = 4;
camera.position.y = 4;

camera.position.z = 10;
scene.add(camera);
//Renderer
const canvas = document.querySelector(".draw");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);
renderer.render(scene, camera);

const randShift = (position, grain = 0.01) =>
  position + (0.5 - Math.random()) * grain;

let bias = 0.01;
setInterval(() => {
  mesh.rotation.x = bias + randShift(mesh.rotation.x);
  mesh.position.x = bias + randShift(mesh.position.x);
  mesh.rotation.y = bias + randShift(mesh.rotation.y);
  mesh.position.y = bias + randShift(mesh.position.y);
  mesh.rotation.z = bias + randShift(mesh.rotation.z);
  mesh.position.z = bias + randShift(mesh.position.z);
  bias = randShift(bias);
  renderer.render(scene, camera);
}, 100);
// //Mesh

// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 })
// );

// //Add cube to scene
// scene.add(cube);

// //Camera

// const sizes = {
//   width: 800,
//   height: 600,
// };

// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3;

// scene.add(camera);

// //Renderer

// const canvas = document.querySelector(".webgl");
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);

// renderer.render(scene, camera);
