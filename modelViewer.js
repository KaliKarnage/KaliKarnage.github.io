// modelViewer.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.140.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.140.0/examples/jsm/loaders/GLTFLoader.js';


const models = ["WallOuterCorner.gltf", "FloorTile.gltf"]; // constant array of models
const modelSelector = document.getElementById('modelSelector'); // model selector

models.forEach(function(model) {
    const option = document.createElement('option'); 
    option.value = model;
    option.textContent = model;
    modelSelector.appendChild(option);
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.getElementById('modelViewer').appendChild(renderer.domElement);

const loader = new GLTFLoader();

function loadModel(modelName) {
    // Update this path to the correct folder where your models are stored
    loader.load(`/models/${modelName}`, function (gltf) {
        scene.add(gltf.scene);
        animate();
    }, undefined, function (error) {
        console.error(error);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

modelSelector.addEventListener('change', function() {
    const modelName = this.value;
    loadModel(modelName);
});

loadModel(models[0]);
