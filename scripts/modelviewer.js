// modelviewer.js - Scalable Three.js implementation for 3D model viewer

// Define variables to store scene elements
let scene, camera, renderer, controls;
let ambientLight, directionalLight;
let gridHelper;
let currentModel,
  loadedModels = {};
let loadingManager,
  modelLoaders = {};
let isLoading = false;
let autoRotate = false;

// Define supported file formats and their loaders
const supportedFormats = {
  glb: "GLTFLoader",
  gltf: "GLTFLoader",
  fbx: "FBXLoader",
  obj: "OBJLoader",
  stl: "STLLoader",
  dae: "ColladaLoader",
};

// Model catalog - easily add or remove models from this object
const modelCatalog = {
  "misc Models": {
    title: "360° Fishing Game Assets",
    models: [
      {
        id: "fishing-rod",
        name: "Fishing Rod",
        thumbnail: "./assets/models/thumbnails/profilePlaceholder.png",
        path: "./assets/models/WallOuterCorner.gltf",
        format: "gltf",
        description:
          "This 3D model was created for the 360° Fishing Game project using Autodesk Maya and textured with Substance Painter. The model features realistic materials and textures optimized for real-time rendering in VR. The fishing rod was designed with attention to detail while maintaining performance for the Oculus Quest platform.",
        tags: ["Maya", "Substance Painter", "VR"],
      },
      {
        id: "fishing-boat",
        name: "Fishing Boat",
        thumbnail: "./assets/models/thumbnails/profilePlaceholder.png",
        path: "./assets/models/Battery.obj",
        format: "obj",
        description:
          "A detailed boat model created for the 360° Fishing Game environment. This model was designed to be visible from multiple viewing angles in the 360° video space. Created in Maya with textures hand-painted in Substance Painter to achieve a stylized look while maintaining realistic proportions.",
        tags: ["Maya", "Substance Painter", "VR", "Environment Design"],
      },
      {
        id: "Macuahuitl",
        name: "Macuahuitl",
        thumbnail: "assets/models/thumbnails/profilePlaceholder.png",
        path: "./assets/models/Macuahuitl/Macuahuitl.gltf",
        format: "gltf",
        description:
          "I designed a futuristic Macuahuitl that merges traditional craftsmanship with modern materials. The body is textured with rich, natural wood, staying true to the weapon’s historical roots, while the iconic obsidian blades have been reimagined in sleek carbon fiber, giving it a high-tech edge. Glowing emissive accents pulse along the weapon, enhancing its futuristic feel, while intricate Mayan glyphs are engraved into the wood, preserving its cultural heritage.",
        tags: ["Maya", "Substance Painter"],
      },
    ],
  },

  // Project 2: Enigma VR Game
  "enigma-vr": {
    title: "Enigma VR Game Assets",
    models: [
      {
        id: "vr-controller",
        name: "VR Controller",
        thumbnail: "assets/models/thumbnails/profilePlaceholder.png",
        path: "assets/models/vr-controller.glb",
        format: "glb",
        description:
          "A high-fidelity replica of the Oculus Quest 2 controller created for the Enigma VR Game. This model includes detailed button layouts and ergonomic features of the actual device. The model was optimized for in-game representation while maintaining visual accuracy.",
        tags: ["Blender", "Unity", "VR Hardware"],
      },
      {
        id: "puzzle-box",
        name: "Puzzle Box",
        thumbnail: "assets/models/thumbnails/profilePlaceholder.png",
        path: "assets/models/puzzle-box.obj",
        format: "obj",
        description:
          "One of the central interactive elements from the Enigma VR Game. This model features intricate mechanical parts and detailed texturing to create visual interest. The puzzle box was designed to be manipulated in VR with realistic physics interactions.",
        tags: ["Maya", "C#", "Interactive Design", "VR"],
      },
      {
        id: "game-environment",
        name: "Game Environment",
        thumbnail: "assets/models/thumbnails/profilePlaceholder.png",
        path: "assets/models/environment.fbx",
        format: "fbx",
        description:
          "A portion of the main environment from Enigma VR Game, featuring architectural elements and environmental props. The environment was designed to create an immersive atmosphere while maintaining optimal performance for VR platforms.",
        tags: ["Blender", "Unity", "Environment Design", "Lighting"],
      },
    ],
  },

  // Project 3: NASA SUITS
  "nasa-suits": {
    title: "NASA SUITS Project Assets",
    models: [
      {
        id: "nasa-helmet",
        name: "NASA Helmet with AR Display",
        thumbnail: "assets/models/thumbnails/profilePlaceholder.png",
        path: "assets/models/nasa-helmet.glb",
        format: "glb",
        description:
          "This model was created for the NASA SUITS Challenge project to visualize the AR interface integration with standard NASA EVA equipment. The helmet includes detailed modeling of visor displays and connection points for the mixed reality interface.",
        tags: ["Blender", "AR/MR", "NASA SUITS", "MRTK"],
      },
      {
        id: "hud-element",
        name: "HUD Interface Element",
        thumbnail: "assets/models/thumbnails/profilePlaceholder.png",
        path: "assets/models/hud-element.gltf",
        format: "gltf",
        description:
          "A 3D interface element designed for the astronaut heads-up display system. This component visualizes atmospheric data and system status for EVA operations. Created to be lightweight and optimized for real-time rendering in AR headsets.",
        tags: ["AR/MR", "MRTK", "HoloLens", "UI/UX"],
      },
    ],
  },
};

// Initialize the scene when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Generate model categories and items
  buildModelCatalog();

  // Initialize the viewer
  initializeViewer();
});

function buildModelCatalog() {
  const sidebar = document.querySelector(".model-list");
  sidebar.innerHTML = ""; // Clear existing content

  // Create a category accordion for each project
  Object.keys(modelCatalog).forEach((categoryKey) => {
    const category = modelCatalog[categoryKey];

    // Create category container
    const categoryElement = document.createElement("div");
    categoryElement.className = "model-category";

    // Create category header
    const categoryHeader = document.createElement("div");
    categoryHeader.className = "category-header";
    categoryHeader.innerHTML = `
            <h4>${category.title}</h4>
            <span class="toggle-icon"><i class="fas fa-chevron-down"></i></span>
        `;
    categoryElement.appendChild(categoryHeader);

    // Create models container
    const modelsContainer = document.createElement("div");
    modelsContainer.className = "category-models";

    // Add models to the category
    category.models.forEach((model) => {
      const modelItem = document.createElement("div");
      modelItem.className = "model-item";
      modelItem.setAttribute("data-model-id", model.id);
      modelItem.setAttribute("data-model-path", model.path);
      modelItem.setAttribute("data-model-format", model.format);
      modelItem.innerHTML = `
                <img src="${model.thumbnail}" alt="${model.name}">
                <div class="model-info">
                    <h5>${model.name}</h5>
                    <span class="model-format">${model.format.toUpperCase()}</span>
                </div>
            `;
      modelsContainer.appendChild(modelItem);
    });

    // Add models container to category
    categoryElement.appendChild(modelsContainer);

    // Add to sidebar
    sidebar.appendChild(categoryElement);
  });

  // Add event listeners for category toggling
  document.querySelectorAll(".category-header").forEach((header) => {
    header.addEventListener("click", function () {
      this.parentElement.classList.toggle("expanded");
      const icon = this.querySelector(".toggle-icon i");
      icon.classList.toggle("fa-chevron-down");
      icon.classList.toggle("fa-chevron-up");
    });
  });

  // Expand first category by default
  const firstCategory = document.querySelector(".model-category");
  if (firstCategory) {
    firstCategory.classList.add("expanded");
    firstCategory
      .querySelector(".toggle-icon i")
      .classList.replace("fa-chevron-down", "fa-chevron-up");
  }

  // Add event listeners for model selection
  document.querySelectorAll(".model-item").forEach((item) => {
    item.addEventListener("click", function () {
      const modelId = this.getAttribute("data-model-id");
      const modelPath = this.getAttribute("data-model-path");
      const modelFormat = this.getAttribute("data-model-format");

      // Update active state in UI
      document.querySelectorAll(".model-item").forEach((el) => {
        el.classList.remove("active");
      });
      this.classList.add("active");

      // Load the selected model
      loadModel(modelId, modelPath, modelFormat);
    });
  });
}

function initializeViewer() {
  // Set up loading manager
  setupLoadingManager();

  // Initialize the scene, camera, and renderer
  initScene();

  // Add lights to the scene
  addLights();

  // Add grid and other helpers
  addHelpers();

  // Set up orbit controls
  setupControls();

  // Setup event listeners for controls
  setupControlEventListeners();

  // Initialize loaders for different formats
  initializeLoaders();

  // Load the first model (default) if available
  const firstModel = document.querySelector(".model-item");
  if (firstModel) {
    firstModel.classList.add("active");
    const modelId = firstModel.getAttribute("data-model-id");
    const modelPath = firstModel.getAttribute("data-model-path");
    const modelFormat = firstModel.getAttribute("data-model-format");
    loadModel(modelId, modelPath, modelFormat);
  }

  // Start the animation loop
  animate();

  // Set initial UI states
  updateUI();
}

function initializeLoaders() {
  // Check if the loaders are available
  console.log("THREE.GLTFLoader availability:", typeof THREE.GLTFLoader);
  console.log("THREE.OBJLoader availability:", typeof THREE.OBJLoader);
  console.log("THREE.MTLLoader availability:", typeof THREE.MTLLoader);

  // Initialize loaders manually
  try {
    modelLoaders["gltf"] = new THREE.GLTFLoader(loadingManager);
    modelLoaders["glb"] = modelLoaders["gltf"]; // Use the same loader for both formats
    console.log("GLTF/GLB loader initialized");
  } catch (e) {
    console.error("Failed to initialize GLTF loader:", e);
  }

  try {
    modelLoaders["obj"] = new THREE.OBJLoader(loadingManager);
    console.log("OBJ loader initialized");
  } catch (e) {
    console.error("Failed to initialize OBJ loader:", e);
  }

  try {
    modelLoaders["mtl"] = new THREE.MTLLoader(loadingManager);
    console.log("MTL loader initialized");
  } catch (e) {
    console.error("Failed to initialize MTL loader:", e);
  }

  try {
    modelLoaders["fbx"] = new THREE.FBXLoader(loadingManager);
    console.log("FBX loader initialized");
  } catch (e) {
    console.error("Failed to initialize FBX loader:", e);
  }

  try {
    modelLoaders["stl"] = new THREE.STLLoader(loadingManager);
    console.log("STL loader initialized");
  } catch (e) {
    console.error("Failed to initialize STL loader:", e);
  }

  try {
    modelLoaders["dae"] = new THREE.ColladaLoader(loadingManager);
    console.log("Collada loader initialized");
  } catch (e) {
    console.error("Failed to initialize Collada loader:", e);
  }

  console.log("Available loaders:", modelLoaders);
}

function setupLoadingManager() {
  // Create a loading manager to track progress
  loadingManager = new THREE.LoadingManager();

  // Loading started
  loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    isLoading = true;
    document.querySelector(".loading-indicator").style.display = "flex";
  };

  // Loading finished
  loadingManager.onLoad = function () {
    isLoading = false;
    document.querySelector(".loading-indicator").style.display = "none";
  };

  // Progress update
  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    // Update progress if needed
  };

  // Loading error
  loadingManager.onError = function (url) {
    console.error("Error loading " + url);
    showNotification("Failed to load model: " + url, "error");
    isLoading = false;
    document.querySelector(".loading-indicator").style.display = "none";
  };
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Add close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", function () {
      notification.remove();
    });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

function initScene() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#1a1a1a");

  // Create camera
  camera = new THREE.PerspectiveCamera(
    75, // Field of view
    document.getElementById("model-display").clientWidth /
      document.getElementById("model-display").clientHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
  );
  camera.position.set(0, 1.5, 3);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(
    document.getElementById("model-display").clientWidth,
    document.getElementById("model-display").clientHeight
  );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding; // For better color accuracy

  // Add renderer to DOM
  document.getElementById("model-display").appendChild(renderer.domElement);

  // Handle window resize
  window.addEventListener("resize", onWindowResize);
}

function addLights() {
  // Create ambient light
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Create directional light
  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;

  // Configure shadow properties
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;

  scene.add(directionalLight);

  // Add hemispheric light for natural ambient lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);
}

function addHelpers() {
  // Add grid helper
  gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444);
  scene.add(gridHelper);
}

function setupControls() {
  // Add orbit controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 0.5;
  controls.maxDistance = 10;
  controls.maxPolarAngle = Math.PI / 1.5; // Limit vertical rotation
}

function setupControlEventListeners() {
  // Light controls
  document
    .getElementById("ambient-intensity")
    .addEventListener("input", function () {
      ambientLight.intensity = parseFloat(this.value);
      this.nextElementSibling.textContent = this.value;
    });

  document
    .getElementById("directional-intensity")
    .addEventListener("input", function () {
      directionalLight.intensity = parseFloat(this.value);
      this.nextElementSibling.textContent = this.value;
    });

  document.getElementById("light-color").addEventListener("input", function () {
    const color = new THREE.Color(this.value);
    ambientLight.color.set(color);
    directionalLight.color.set(color);
  });

  // Environment controls
  document.getElementById("show-grid").addEventListener("change", function () {
    gridHelper.visible = this.checked;
  });

  document
    .getElementById("rotate-model")
    .addEventListener("change", function () {
      autoRotate = this.checked;
    });

  document
    .getElementById("background-color")
    .addEventListener("input", function () {
      scene.background = new THREE.Color(this.value);
    });

  // Camera controls
  document
    .getElementById("reset-camera")
    .addEventListener("click", function () {
      resetView();
    });

  // Screenshot functionality
  document.getElementById("screenshot").addEventListener("click", function () {
    takeScreenshot();
  });

  // Format filter
  if (document.getElementById("format-filter")) {
    document
      .getElementById("format-filter")
      .addEventListener("change", function () {
        const selectedFormat = this.value;
        filterModelsByFormat(selectedFormat);
      });
  }
}

function filterModelsByFormat(format) {
  const modelItems = document.querySelectorAll(".model-item");

  modelItems.forEach((item) => {
    if (format === "all" || item.getAttribute("data-model-format") === format) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function loadModel(modelId, modelPath, modelFormat) {
  if (isLoading) return; // Don't load if another model is currently loading

  console.log(`Starting to load model: ${modelPath} (format: ${modelFormat})`);

  // Determine format from file extension if not explicitly provided
  if (!modelFormat) {
    const extension = modelPath.split(".").pop().toLowerCase();
    modelFormat = extension;
    console.log(`Auto-detected format: ${modelFormat} for ${modelPath}`);
  }

  // Check if model was already loaded
  if (loadedModels[modelId]) {
    updateCurrentModel(loadedModels[modelId], modelId);
    return;
  }

  // Special handling for OBJ files
  if (modelFormat === "obj") {
    const mtlPath = modelPath.replace(".obj", ".mtl");
    console.log(`Looking for MTL file: ${mtlPath}`);

    // Get the base directory for texture loading
    const basePath = modelPath.substring(0, modelPath.lastIndexOf("/") + 1);
    console.log(`Base path for textures: ${basePath}`);

    try {
      // Try to load the MTL file
      if (modelLoaders["mtl"]) {
        // Set path for textures to load correctly
        modelLoaders["mtl"].setPath(basePath);
        const mtlFile = mtlPath.split("/").pop();
        console.log(`Loading MTL file: ${mtlFile} from path: ${basePath}`);

        modelLoaders["mtl"].load(
          mtlFile,
          function (materials) {
            console.log("Materials loaded successfully");

            // Set texture path and enable texture loading
            materials.preload();

            // Log material information for debugging
            if (materials.materialsInfo) {
              console.log("Material info available:");
              for (const matName in materials.materialsInfo) {
                const matInfo = materials.materialsInfo[matName];
                console.log(`Material: ${matName}`, matInfo);
                if (matInfo.map_Kd)
                  console.log(`  Diffuse texture: ${matInfo.map_Kd}`);
                if (matInfo.map_Ks)
                  console.log(`  Specular texture: ${matInfo.map_Ks}`);
                if (matInfo.map_Bump)
                  console.log(`  Normal/bump texture: ${matInfo.map_Bump}`);
              }
            }

            // Configure OBJ loader with materials
            if (modelLoaders["obj"]) {
              modelLoaders["obj"].setMaterials(materials);
              modelLoaders["obj"].setPath(basePath);
              const objFile = modelPath.split("/").pop();
              console.log(
                `Loading OBJ file: ${objFile} from path: ${basePath}`
              );

              // Now load the OBJ with materials
              modelLoaders["obj"].load(
                objFile,
                function (object) {
                  console.log("OBJ loaded with materials");

                  // Check for textures and make sure they're properly loaded
                  object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                      const mats = Array.isArray(child.material)
                        ? child.material
                        : [child.material];

                      mats.forEach(function (mat) {
                        // Enable better material rendering
                        if (mat) {
                          console.log(
                            `Material in mesh: ${mat.name || "unnamed"}`
                          );
                          mat.side = THREE.DoubleSide; // Show both sides
                          mat.needsUpdate = true;

                          // Enable better texture rendering
                          if (mat.map) {
                            console.log(
                              `Diffuse texture found: ${
                                mat.map.name || "unnamed"
                              }`
                            );
                            mat.map.anisotropy = 16;
                            mat.map.needsUpdate = true;
                          }
                          if (mat.specularMap) {
                            console.log(
                              `Specular texture found: ${
                                mat.specularMap.name || "unnamed"
                              }`
                            );
                            mat.specularMap.anisotropy = 16;
                            mat.specularMap.needsUpdate = true;
                          }
                          if (mat.normalMap) {
                            console.log(
                              `Normal texture found: ${
                                mat.normalMap.name || "unnamed"
                              }`
                            );
                            mat.normalMap.anisotropy = 16;
                            mat.normalMap.needsUpdate = true;
                          }
                        }
                      });
                    }
                  });

                  loadedModels[modelId] = object;
                  updateCurrentModel(object, modelId);
                },
                function (xhr) {
                  if (xhr.lengthComputable) {
                    console.log(
                      `OBJ loading: ${Math.round(
                        (xhr.loaded / xhr.total) * 100
                      )}%`
                    );
                  }
                },
                function (error) {
                  console.error("Error loading OBJ with materials:", error);
                  showNotification("Error loading model", "error");
                }
              );
            }
          },
          function (xhr) {
            if (xhr.lengthComputable) {
              console.log(
                `MTL loading: ${Math.round((xhr.loaded / xhr.total) * 100)}%`
              );
            }
          },
          function (error) {
            console.warn(
              "MTL file not found or error loading, loading OBJ without materials:",
              error
            );

            // Load OBJ without materials
            if (modelLoaders["obj"]) {
              modelLoaders["obj"].setPath(basePath);
              const objFile = modelPath.split("/").pop();

              modelLoaders["obj"].load(
                objFile,
                function (object) {
                  console.log("OBJ loaded without materials");
                  // Apply default material
                  object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                      child.material = new THREE.MeshStandardMaterial({
                        color: 0xcccccc,
                        metalness: 0.2,
                        roughness: 0.8,
                        side: THREE.DoubleSide,
                      });
                    }
                  });
                  loadedModels[modelId] = object;
                  updateCurrentModel(object, modelId);
                },
                function (xhr) {
                  if (xhr.lengthComputable) {
                    console.log(
                      `OBJ loading: ${Math.round(
                        (xhr.loaded / xhr.total) * 100
                      )}%`
                    );
                  }
                },
                function (error) {
                  console.error("Error loading OBJ without materials:", error);
                  showNotification("Error loading model", "error");
                }
              );
            }
          }
        );
      } else {
        console.error("MTL loader not available");
      }
    } catch (e) {
      console.error("Error in OBJ/MTL loading process:", e);
      showNotification("Error loading OBJ model", "error");
    }
    return;
  }

  // Special handling for GLTF files
  if (modelFormat === "gltf" || modelFormat === "glb") {
    try {
      if (modelLoaders["gltf"]) {
        console.log(`Original GLTF model path: ${modelPath}`);

        // IMPORTANT: For GLTF files, use the full path directly
        console.log(`Loading GLTF file directly with full path`);

        // Create a new instance of the loader for this specific load to avoid path issues
        const gltfLoader = new THREE.GLTFLoader(loadingManager);

        // Load the model with the full path
        gltfLoader.load(
          modelPath,
          function (gltf) {
            console.log("GLTF loaded successfully:", gltf);

            // Get the base path of the model
            const basePath = modelPath.substring(
              0,
              modelPath.lastIndexOf("/") + 1
            );
            console.log("Base path for textures:", basePath);

            gltf.scene.traverse(function (child) {
              if (child.isMesh) {
                if (child.material) {
                  const materials = Array.isArray(child.material)
                    ? child.material
                    : [child.material];

                  materials.forEach(function (material) {
                    const basePath = modelPath.substring(
                      0,
                      modelPath.lastIndexOf("/") + 1
                    );
                    const textureLoader = new THREE.TextureLoader();

                    // Texture loading function with enhanced settings
                    const loadTexture = (textureName, textureType) => {
                      try {
                        const texture = textureLoader.load(
                          `${basePath}${textureName}`,
                          (loadedTexture) => {
                            console.log(
                              `${textureType} texture loaded successfully`
                            );

                            // Specific handling for different texture types
                            switch (textureType) {
                              case "BaseColor":
                                loadedTexture.encoding = THREE.sRGBEncoding;
                                loadedTexture.colorSpace = THREE.SRGBColorSpace; // For newer Three.js versions
                                break;
                              case "Normal":
                                loadedTexture.colorSpace =
                                  THREE.LinearSRGBColorSpace;
                                break;
                              case "Metallic":
                              case "Roughness":
                                loadedTexture.colorSpace =
                                  THREE.LinearSRGBColorSpace;
                                break;
                              case "Emissive":
                                loadedTexture.encoding = THREE.sRGBEncoding;
                                loadedTexture.colorSpace = THREE.SRGBColorSpace;
                                break;
                            }

                            // Ensure texture is using nearest filtering to prevent color bleeding
                            loadedTexture.magFilter = THREE.NearestFilter;
                            loadedTexture.minFilter = THREE.NearestFilter;

                            // Enable mipmapping for better rendering
                            loadedTexture.generateMipmaps = true;

                            material.needsUpdate = true;
                          },
                          undefined,
                          (error) => {
                            console.error(
                              `Failed to load ${textureType} texture:`,
                              error
                            );
                          }
                        );

                        return texture;
                      } catch (e) {
                        console.error(
                          `Error loading ${textureType} texture:`,
                          e
                        );
                        return null;
                      }
                    };

                    // Detailed texture loading with color space and encoding corrections
                    if (!material.map) {
                      material.map = loadTexture("BaseColor.png", "BaseColor");
                    }

                    if (!material.normalMap) {
                      material.normalMap = loadTexture("Normal.png", "Normal");
                      if (material.normalMap) {
                        material.normalScale.set(1, 1);
                      }
                    }

                    if (!material.metalnessMap) {
                      material.metalnessMap = loadTexture(
                        "Metallic.png",
                        "Metallic"
                      );
                      material.metalness = 1.0;
                    }

                    if (!material.roughnessMap) {
                      material.roughnessMap = loadTexture(
                        "Roughness.png",
                        "Roughness"
                      );
                      material.roughness = 1.0;
                    }

                    if (!material.emissiveMap) {
                      material.emissiveMap = loadTexture(
                        "Emissive.png",
                        "Emissive"
                      );
                      if (material.emissiveMap) {
                        material.emissiveIntensity = 1.0;
                      }
                    }

                    // Additional material configuration
                    material.type = "MeshStandardMaterial";
                    material.metalness = 1.0;
                    material.roughness = 1.0;

                    // Comprehensive logging
                    console.log("Detailed Texture Diagnostics:", {
                      baseColorPath: `${basePath}BaseColor.png`,
                      normalPath: `${basePath}Normal.png`,
                      metallicPath: `${basePath}Metallic.png`,
                      roughnessPath: `${basePath}Roughness.png`,
                      emissivePath: `${basePath}Emissive.png`,
                      textureStatus: {
                        baseColor: !!material.map,
                        normal: !!material.normalMap,
                        metallic: !!material.metalnessMap,
                        roughness: !!material.roughnessMap,
                        emissive: !!material.emissiveMap,
                      },
                    });

                    // Ensure materials are double-sided and updates are applied
                    material.side = THREE.DoubleSide;
                    material.needsUpdate = true;
                  });
                }
              }
            });

            loadedModels[modelId] = gltf;
            updateCurrentModel(gltf, modelId);
          },
          // Progress callback
          function (xhr) {
            console.log(
              `GLTF loading progress: ${(xhr.loaded / xhr.total) * 100}%`
            );
          },
          // Error callback
          function (error) {
            console.error("GLTF Loading Error:", error);
          }
        );
      } else {
        console.error("GLTF loader not available - trying direct loader");

        // Try to create a loader directly
        try {
          const directLoader = new THREE.GLTFLoader();
          console.log("Created direct GLTF loader", directLoader);

          directLoader.load(
            modelPath,
            function (gltf) {
              console.log("GLTF loaded with direct loader");
              loadedModels[modelId] = gltf;
              updateCurrentModel(gltf, modelId);
            },
            function (xhr) {
              console.log(
                `Direct loader progress: ${Math.round(
                  (xhr.loaded / xhr.total) * 100
                )}%`
              );
            },
            function (error) {
              console.error("Error with direct loader:", error);
              showNotification(
                "Error loading GLTF with direct loader",
                "error"
              );
            }
          );
        } catch (e) {
          console.error("Failed to create direct loader:", e);
          showNotification("GLTF loader creation failed", "error");
        }
      }
    } catch (e) {
      console.error("Error in GLTF loading process:", e);
      showNotification("Error loading GLTF model: " + e.message, "error");
    }
    return;
  }

  // For other formats
  if (!modelLoaders[modelFormat]) {
    console.error(`No loader available for format: ${modelFormat}`);
    showNotification(`Unsupported model format: ${modelFormat}`, "error");
    return;
  }

  try {
    modelLoaders[modelFormat].load(
      modelPath,
      function (loadedModel) {
        console.log(`Successfully loaded model: ${modelPath}`);
        let processedModel = processLoadedModel(loadedModel, modelFormat);
        loadedModels[modelId] = processedModel;
        updateCurrentModel(processedModel, modelId);
      },
      function (xhr) {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      function (error) {
        console.error(`Error loading ${modelFormat} model:`, error);
        showNotification(`Error loading model: ${modelPath}`, "error");
      }
    );
  } catch (e) {
    console.error(`Error in ${modelFormat} loading process:`, e);
    showNotification(`Error loading ${modelFormat} model`, "error");
  }
}

function processLoadedModel(loadedModel, format) {
  switch (format) {
    case "glb":
    case "gltf":
      return loadedModel; // GLTF/GLB loader already returns scene
    case "obj":
      return loadedModel; // OBJ loader returns Object3D
    case "fbx":
      // FBX loader needs scale adjustment
      loadedModel.scale.setScalar(0.01); // Common scale adjustment for FBX
      return loadedModel;
    case "stl":
      // STL models need material
      const material = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.25,
        roughness: 0.6,
      });
      const mesh = new THREE.Mesh(loadedModel, material);
      const group = new THREE.Group();
      group.add(mesh);
      return group;
    case "dae":
      return loadedModel.scene; // Collada loader
    default:
      return loadedModel;
  }
}

function updateCurrentModel(loadedModel, modelId) {
  // Remove any existing model
  if (currentModel) {
    scene.remove(currentModel);
  }

  // Get model from the catalog to access metadata
  let modelData = findModelInCatalog(modelId);

  // Add the new model to the scene
  if (loadedModel.scene) {
    // GLTF models have a scene property
    currentModel = loadedModel.scene;
  } else {
    // Other formats like OBJ, FBX directly return the model
    currentModel = loadedModel;
  }

  // Prepare the model
  setupModel(currentModel);

  // Add to scene
  scene.add(currentModel);

  // Update model description if model data is found
  if (modelData) {
    updateModelDescription(modelData);
  }

  // Update model statistics
  updateModelStats(currentModel);

  // Reset camera and controls
  resetView();
}

function findModelInCatalog(modelId) {
  // Search through all categories
  for (const categoryKey in modelCatalog) {
    const category = modelCatalog[categoryKey];
    for (const model of category.models) {
      if (model.id === modelId) {
        return model;
      }
    }
  }
  return null;
}

function setupModel(model) {
  // Center the model
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  // Normalize and center
  model.position.x = -center.x;
  model.position.y = -center.y;
  model.position.z = -center.z;

  // Scale model to reasonable size if needed
  const maxDim = Math.max(size.x, size.y, size.z);
  if (maxDim > 5) {
    const scale = 5 / maxDim;
    model.scale.multiplyScalar(scale);
  } else if (maxDim < 0.5) {
    // Scale up very small models
    const scale = 0.5 / maxDim;
    model.scale.multiplyScalar(scale);
  }

  // Enable shadows
  model.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      // Ensure materials are properly configured
      if (child.material) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((material) => {
          material.shadowSide = THREE.FrontSide;
          material.needsUpdate = true;
        });
      }
    }
  });
}

function updateModelDescription(modelData) {
  const descriptionContainer = document.getElementById("model-description");
  if (!descriptionContainer) return;

  // Create tags HTML
  const tagsHTML = modelData.tags
    .map((tag) => {
      const className = tag.toLowerCase().replace(/[^a-z0-9]/g, "");
      return `<span class="tech-tag ${className}">${tag}</span>`;
    })
    .join("");

  // Update content
  descriptionContainer.innerHTML = `
        <h3>${modelData.name}</h3>
        <p>${modelData.description}</p>
        <div class="model-format-badge">
            <span class="format-icon"><i class="fas fa-file-code"></i></span>
            <span class="format-text">${modelData.format.toUpperCase()} Format</span>
        </div>
        <div class="tech-tags">
            ${tagsHTML}
        </div>
    `;
}

function updateModelStats(model) {
  let vertexCount = 0;
  let triangleCount = 0;
  let materialCount = 0;
  const materials = new Set();

  // Traverse the model to count vertices, triangles, and materials
  model.traverse(function (child) {
    if (child.isMesh) {
      if (child.geometry) {
        if (child.geometry.attributes && child.geometry.attributes.position) {
          vertexCount += child.geometry.attributes.position.count;
        }

        if (child.geometry.index) {
          triangleCount += child.geometry.index.count / 3;
        } else if (
          child.geometry.attributes &&
          child.geometry.attributes.position
        ) {
          triangleCount += child.geometry.attributes.position.count / 3;
        }
      }

      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => materials.add(mat));
        } else {
          materials.add(child.material);
        }
      }
    }
  });

  materialCount = materials.size;

  // Update the UI with the statistics
  const vertexElement = document.getElementById("vertex-count");
  const triangleElement = document.getElementById("triangle-count");
  const materialElement = document.getElementById("material-count");

  if (vertexElement) vertexElement.textContent = vertexCount.toLocaleString();
  if (triangleElement)
    triangleElement.textContent = Math.floor(triangleCount).toLocaleString();
  if (materialElement) materialElement.textContent = materialCount;
}

function resetView() {
  if (!currentModel) return;

  // Reset camera position
  const box = new THREE.Box3().setFromObject(currentModel);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));

  // Set reasonable minimum distance
  cameraZ = Math.max(cameraZ, 2);

  // Update camera and controls
  camera.position.set(0, center.y, cameraZ);
  controls.target.set(0, center.y, 0);
  controls.update();
}

function takeScreenshot() {
  if (!currentModel) return;

  renderer.render(scene, camera);
  const screenshot = renderer.domElement.toDataURL("image/png");

  // Create a temporary link and trigger download
  const link = document.createElement("a");
  link.href = screenshot;

  // Get current model name
  const activeModel = document.querySelector(".model-item.active");
  const modelName = activeModel
    ? activeModel.querySelector("h5").textContent
    : "model";

  link.download = `${modelName
    .replace(/\s+/g, "-")
    .toLowerCase()}_screenshot.png`;
  link.click();

  showNotification("Screenshot saved!", "success");
}

function updateUI() {
  // Initialize slider values
  const ambientSlider = document.getElementById("ambient-intensity");
  const directionalSlider = document.getElementById("directional-intensity");

  if (ambientSlider) {
    ambientSlider.nextElementSibling.textContent = ambientSlider.value;
  }

  if (directionalSlider) {
    directionalSlider.nextElementSibling.textContent = directionalSlider.value;
  }
}

function onWindowResize() {
  const container = document.getElementById("model-display");
  if (!container) return;

  // Update camera aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Update controls
  if (controls) controls.update();

  // Auto-rotate model if enabled
  if (autoRotate && currentModel) {
    currentModel.rotation.y += 0.005;
  }

  // Render the scene
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}
