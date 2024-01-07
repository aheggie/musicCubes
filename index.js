//Scene Objects Camera Renderer

//Scene

const scene = new THREE.Scene();

//Group

// const group = new THREE.Group();

//Mesh

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#FF6F00" });
const mesh = new THREE.Mesh(geometry, material);

//MeshTwo

const meshTwo = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "#31A6FF" })
);

meshTwo.position.y = 2;

// group.add(mesh, meshTwo);
// scene.add(group);

scene.add(mesh);
scene.add(meshTwo);

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

const animate = (target, interval = 100, bias = 0.01, grain = 0.01) => {
  const randShift = (position) => position + (0.5 - Math.random()) * grain;

  setInterval(() => {
    target.rotation.x = bias + randShift(target.rotation.x);
    target.position.x = bias + randShift(target.position.x);
    target.rotation.y = bias + randShift(target.rotation.y);
    target.position.y = bias + randShift(target.position.y);
    target.rotation.z = bias + randShift(target.rotation.z);
    target.position.z = bias + randShift(target.position.z);
    bias = randShift(bias);
    renderer.render(scene, camera);
  }, interval);
};

animate(mesh);
animate(meshTwo);

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
