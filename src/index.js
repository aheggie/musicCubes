//Scene Objects Camera Renderer

//Scene

const scene = new THREE.Scene();

//Group

// const group = new THREE.Group();

// empty array of len x

const emptyArray = (len) => [...new Array(len)];

// random in range

const randBetween = (start, end) =>
  start + Math.floor(Math.random() * (end - start + 1));

//boxMaker

// const startCoords = emptyArray(3).map((_) => randBetween(-2, 3));

const boxMaker = (color) => {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color })
  );

  // box.position.x = startCoords[0];
  // box.position.y = startCoords[1];
  // box.position.z = startCoords[2];
  return box;
};

// random color

const randSingleColorHex = (start = 0, end = 255) =>
  randBetween(start, end).toString(16).padStart(2, "0");
console.log(randSingleColorHex());
const hexCode = (rHex, gHex, bHex) => `#${rHex}${gHex}${bHex}`;
console.log(hexCode(...["af", "22", "bc"]));

const randHexCode = () =>
  hexCode(...emptyArray(3).map((_) => randSingleColorHex()));
console.log(randHexCode());

const hexFuncs = [
  () => randSingleColorHex(0, 50),
  () => randSingleColorHex(25, 100),
  () => randSingleColorHex(175, 255),
].sort((_) => 0.5 - Math.random());

const call = (fn) => fn();

const randColorfulHexCode = () => hexCode(...hexFuncs.map(call));

console.log(randColorfulHexCode());

//Mesh

// const meshes = ["#FF6F00", "#31A6FF", "#FABBAE", "#FAADED", "#4B1DAD"].map(
//   boxMaker
// );

const consoleReturn = (x) => {
  console.log(x);
  return x;
};

const boxArrayMaker = (nBoxes) =>
  emptyArray(nBoxes).map(randColorfulHexCode).map(consoleReturn).map(boxMaker);

const meshes = boxArrayMaker(100);

meshes.forEach((mesh) => scene.add(mesh));

//Camera

const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height); //default near and far is 1, 2000

camera.position.x = 5;
camera.position.y = 1.5;

camera.position.z = 8;
scene.add(camera);

// Lighting Rig

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

//Renderer
const canvas = document.querySelector(".draw");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);
renderer.render(scene, camera);

const animate = (target, interval = 100, bias = 0.01, grain = 0.01) => {
  const randShift = (position) => position + (0.5 - Math.random()) * grain;

  let xBias = bias;
  let yBias = bias;
  let zBias = bias;

  setInterval(() => {
    target.rotation.x = xBias + randShift(target.rotation.x);
    target.position.x = xBias + randShift(target.position.x);
    target.rotation.y = yBias + randShift(target.rotation.y);
    target.position.y = yBias + randShift(target.position.y);
    target.rotation.z = zBias + randShift(target.rotation.z);
    target.position.z = zBias + randShift(target.position.z);
    xBias = randShift(xBias);
    yBias = randShift(yBias);
    zBias = randShift(zBias);
    renderer.render(scene, camera);
  }, interval);
};

meshes.forEach((mesh) => animate(mesh));

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
