// ES6 modules for Three.js - these links are subject to change and may need to be updated with the latest from the Three.js repository
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.147.0/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.147.0/examples/jsm/loaders/FBXLoader.js';

let scene, camera, renderer;
let currentModelIndex = 0;
let currentModel = null;
const models = [
    { type: 'obj', path: 'models/Baton.obj' },
    { type: 'fbx', path: 'models/model2.fbx' },
    // Add more models here
];

function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('modelViewer').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    camera.position.z = 5;
}

function loadModel(index) {
    const model = models[index];
    if (currentModel) {
        scene.remove(currentModel);
    }

    let loader;
    if (model.type === 'obj') {
        loader = new OBJLoader();
    } else if (model.type === 'fbx') {
        loader = new FBXLoader();
    }

    loader.load(model.path, function (object) {
        currentModel = object;
        scene.add(currentModel);
    }, undefined, function (error) {
        console.error(error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (currentModel) {
        currentModel.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

function switchModel(delta) {
    currentModelIndex += delta;
    if (currentModelIndex < 0) currentModelIndex = models.length - 1;
    if (currentModelIndex >= models.length) currentModelIndex = 0;
    loadModel(currentModelIndex);
}

document.getElementById('nextModel').addEventListener('click', () => switchModel(1));
document.getElementById('prevModel').addEventListener('click', () => switchModel(-1));

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

initThreeJS();
loadModel(currentModelIndex); // Load the initial model
animate(); // Start the animation loop
