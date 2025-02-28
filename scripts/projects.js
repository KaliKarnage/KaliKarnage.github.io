const projects = [
  {
    title: "Accessible Arcade Project",
    position: "Programmer",
    description:
      "A custom-built, accessible gaming experience designed to make arcade-style gaming available to players with various disabilities. This project focuses on creating specialized controllers and adaptive interfaces.",
    role: "Led the development of custom hardware interfaces using Arduino to create accessible control schemes. Implemented game logic in Unreal Engine 5 with a focus on adaptable difficulty settings and alternative input methods.",
    technologies:
      "Created a modular control system with Arduino microcontrollers interfaced with Unreal Engine 5. Developed custom shaders for high-contrast visual feedback and integrated text-to-speech for audio cues. Designed adaptive difficulty systems that respond to player performance.",
    image: "assets/images/AArcade04.png",
    additionalImages: [
      "assets/images/AArcade01.jpg",
      "assets/images/AArcade02.jpg",
      "assets/images/AArcade03.jpg",
    ],
    techTags: ["Arduino", "Unreal Engine 5", "Blueprints", "Electronics"],
    startDate: "September 2024",
    endDate: "December 2024",
    organization: "Boise State University",
  },
  {
    title: "NASA SUITS Challenge",
    position: "UI Team Lead",
    description:
      "Led Boise State's UI team in the NASA SUITS (Spacesuit User Interface Technologies for Students) challenge, developing augmented reality interfaces for astronaut spacesuits. NASA SUITS is an initiative that engages students to design spacesuit information displays within an augmented reality environment, improving astronaut efficiency and safety during spacewalks and extravehicular activities.",
    role: "As UI team lead during the 2022-2023 school year, I guided our team through developing AR interfaces despite it being my first experience with MRTK, Meta Quest 2, and HoloLens 2. I managed project coordination to meet NASA's requirements, fostered a collaborative learning environment, and facilitated open discussions about our learning experiences. This leadership role involved setting clear goals, ensuring effective communication between sub-teams, and adapting quickly to new technologies.",
    technologies:
      "We utilized Unity with MRTK (Mixed Reality Toolkit) integration for AR development targeting Meta Quest 2 and HoloLens 2 platforms. Our development process involved continuous cycles of prototyping, testing, and refining our work as we became more familiar with these platforms. I documented our learning process, design decisions, and evolution of our understanding of these technologies, which served as a valuable knowledge base for the team.",
    image: "assets/images/SUITS_UI_Mockup01.png",
    additionalImages: [
      "assets/images/BootlegHouston01.jpg",
      "assets/images/BootlegHouston02.jpg",
    ],
    techTags: ["Unity", "MRTK", "C#", "AR/MR", "HoloLens 2", "Meta Quest 2"],
    startDate: "September 2022",
    endDate: "May 2023",
    organization: "Boise State University",
  },
  {
    title: "360 Video Fishing Game",
    position: "3D Modeler & UI Designer",
    description:
      "A collaborative project from my sophomore year creating an interactive 360-degree video fishing experience for Oculus Quest 2 and Quest Pro. This immersive experience combines panoramic video footage with interactive 3D elements, crafted using Unity.",
    role: "My primary contributions included creating 3D models, texturing, and designing the User Interface (UI). This project marked my first experience with both Autodesk Maya for modeling and Substance Painter for texturing. I embraced these challenging new tools as an opportunity to expand my technical skillset and enhance my proficiency in 3D design.",
    technologies:
      "We utilized Unity as our development engine for deployment to Meta Quest platforms. I created detailed 3D models in Autodesk Maya with realistic texturing in Substance Painter. Our team successfully integrated these assets with 360° video footage to create a seamless, immersive experience with interactive elements that respond to user input.",
    image: "assets/images/FishingGear.png",
    additionalImages: ["assets/images/Fish.png"],
    techTags: [
      "Unity",
      "C#",
      "Autodesk Maya",
      "Substance Painter",
      "VR",
      "Meta Quest",
    ],
    year: "Sophomore Year",
  },
  {
    title: "Individual Immersive Game (Enigma)",
    position: "Solo Developer",
    description:
      "A fully immersive VR game developed independently for the Oculus Quest 2 as part of my GIMM (Games, Interactive Media, and Mobile) program at Boise State University. This project features exclusively original assets and explores innovative interaction techniques and storytelling in virtual environments.",
    role: "As a solo developer, I handled all aspects of this multi-year project from concept to completion. Beginning with comprehensive Game Design Documents in my sophomore year, I started development in my junior year and concluded at the end of my senior year. This project allowed me to hone both my technical implementation skills and creative design abilities.",
    technologies:
      "The game was built in Unity using C# for the Meta Quest platform. I created all 3D assets using Maya, Substance Painter, and Blender, focusing on optimized models suitable for VR. The project incorporated custom interaction systems for object manipulation and environmental puzzles, all designed for an immersive VR experience.",
    image: "assets/images/EnigmaDevPic05.png",
    additionalImages: [
      "assets/images/EnigmaDevPic01.png",
      "assets/images/EnigmaDevPic02.png",
      "assets/images/EnigmaDevPic03.png",
      "assets/images/EnigmaDevPic04.png",
    ],
    techTags: [
      "Unity",
      "C#",
      "Maya",
      "Substance Painter",
      "Blender",
      "VR Development",
      "Meta Quest",
    ],
    timeline: "Sophomore to Senior Year",
  },
  {
    title: "Mobile Data Narrative",
    position: "Web Developer",
    description:
      "An individual assignment focused on web development and data visualization, showcasing the evolution of weapons in World of Warcraft from its original 2004 launch through the Legion expansion. This responsive website dynamically gathers and displays data through compelling visualizations.",
    role: "I independently developed this web application to demonstrate my proficiency in modern web technologies. I designed and implemented the entire user interface, data structures, and visualization components. The project challenged me to create a narrative-driven experience that presents complex data in an accessible, engaging format.",
    technologies:
      "Built with React and Node.js for a responsive, component-based architecture. I leveraged D3.js to create three insightful interactive graphs that tell a compelling story through data. The application demonstrates responsive design principles and modern JavaScript practices for an optimal user experience across devices.",
    image: "assets/images/DataNarrativeHome.jpg",
    additionalImages: [
      "assets/images/DataNarrativeDataTable.jpg",
      "assets/images/DataNarrativeDensity.jpg",
    ],
    techTags: ["HTML", "CSS", "JavaScript", "React", "Node.js", "D3.js"],
    focus: "World of Warcraft Weapons Evolution",
  },
  {
    title: "Brain Health Diagnostic Tool",
    position: "Project Manager",
    description:
      "A collaborative development project focused on creating a diagnostic test aimed at early Alzheimer's detection. This cross-disciplinary initiative combines game design principles with medical diagnostic requirements to create an engaging and effective cognitive assessment tool.",
    role: "As one of the Project Managers for a cross-disciplinary team of 7 professionals (including artists, programmers, and UX/UI designers), I co-led the development and maintenance of this innovative diagnostic tool. I facilitated team collaboration, managed agile workflows, and ensured timely delivery of project milestones.",
    technologies:
      "The project utilized game development technologies to create interactive cognitive tests that measure specific brain functions. Our prototype contributed to early-stage research efforts in medical diagnostics, demonstrating the potential of game-based cognitive assessment tools for healthcare applications.",
    image: "assets/images/BHAssembled.jpg",
    additionalImages: ["assets/images/BHScreenshot.png"],
    techTags: ["Unity", "C#", "UX/UI Design", "Medical", "Project Management"],
    startDate: "September 2024",
    endDate: "Present",
    organization: "Boise State University",
    isCurrent: true,
    currentInfo:
      "This is an ongoing research project at Boise State University. Our team is currently working on refining the diagnostic algorithms and improving the user experience based on initial testing feedback. The project demonstrates the potential for game-based tools to contribute to healthcare diagnostics, particularly in the early detection of cognitive decline.",
  },
  {
    title: "Survival Horror Game Prototype",
    position: "AI Programmer",
    description:
      "As lead AI programmer, I designed and implemented advanced AI systems for a client's survival horror game prototype. The project challenged me to develop sophisticated enemy behaviors using Unreal Engine's AI architecture. Through this experience, I created realistic enemy responses to environmental stimuli and player interactions, establishing the foundation for an immersive and tension-filled gameplay experience.",
    role: "As the AI Programmer, I mastered Unreal Engine's sophisticated behavior tree and blackboard systems to create dynamic enemy behaviors. I implemented advanced AI perception capabilities that allowed enemies to detect players through sight and sound, creating realistic responses to the player's presence. Additionally, I designed and coded comprehensive health and damage systems that provided the foundation for compelling combat mechanics. This project expanded my proficiency with both Blueprint visual scripting and C++ programming in a professional game development context.",
    technologies:
      "This project was developed using Unreal Engine 5, leveraging both Blueprint visual scripting and C++ programming for optimal performance. I implemented sophisticated AI systems using UE5's behavior trees, blackboards, and AIPerception components to create responsive enemy behaviors. The prototype demonstrated advanced pathfinding, sensory perception systems, and dynamic combat mechanics, all optimized for the survival horror genre's specific gameplay requirements.",
    image: "assets/Suits02.png",
    additionalImages: ["assets/suits1.png", "assets/suits3.png"],
    techTags: ["Unreal Engine 5", "Blueprints", "C++"],
    startDate: "September 2024",
    endDate: "Present",
    organization: "Torchfire Studios",
    isCurrent: true,
    currentInfo:
      "This is an ongoing project with Torchfire Studios. I am currently working on prototyping and implementing advanced AI behaviors. The project aims to create a unique survival horror experience with innovative AI systems and engaging gameplay mechanics.",
  },
];

// Load projects when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Generate project buttons
  generateProjectButtons();

  // Check if URL has a project parameter
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("project");

  let projectToLoad = 0;

  if (
    projectId !== null &&
    !isNaN(parseInt(projectId)) &&
    parseInt(projectId) < projects.length
  ) {
    // If there's a valid project ID in the URL, use that
    projectToLoad = parseInt(projectId);
  } else {
    // Otherwise, find the current project if any
    const currentProjectIndex = projects.findIndex(
      (project) => project.isCurrent === true
    );
    if (currentProjectIndex !== -1) {
      projectToLoad = currentProjectIndex;
    }
  }

  // Load the selected project
  loadProject(projectToLoad);

  // Set up button click handlers
  setupProjectButtons();

  // Set up modal functionality
  setupImageModal();
});

function generateProjectButtons() {
  const buttonContainer = document.getElementById("project-buttons");
  if (!buttonContainer) {
    console.error("Project buttons container not found!");
    return;
  }

  // Clear existing buttons
  buttonContainer.innerHTML = "";

  // First add current projects
  projects.forEach((project, index) => {
    if (project.isCurrent) {
      addProjectButton(buttonContainer, project, index);
    }
  });

  // Then add all other projects
  projects.forEach((project, index) => {
    if (!project.isCurrent) {
      addProjectButton(buttonContainer, project, index);
    }
  });
}

function addProjectButton(container, project, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-primary mb-2";
  button.setAttribute("data-project", index);

  let buttonHTML = project.title;

  // Add current badge if this is a current project
  if (project.isCurrent) {
    buttonHTML += ` <span class="project-status">Current</span>`;
  }

  button.innerHTML = buttonHTML;
  container.appendChild(button);
}

function setupProjectButtons() {
  const buttons = document.querySelectorAll("[data-project]");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Make sure the click was on the button itself, not a child element
      const button = e.target.closest("[data-project]");
      if (!button) return;

      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");
      // Load the project
      const projectIndex = parseInt(button.dataset.project);
      loadProject(projectIndex);

      // Update URL without refreshing the page
      const url = new URL(window.location);
      url.searchParams.set("project", projectIndex);
      window.history.pushState({}, "", url);
    });
  });

  // Set initial active button based on current project or URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("project");

  if (
    projectId !== null &&
    !isNaN(parseInt(projectId)) &&
    parseInt(projectId) < projects.length
  ) {
    // If valid project ID in URL, make that button active
    const activeButton = document.querySelector(
      `[data-project="${projectId}"]`
    );
    if (activeButton) activeButton.classList.add("active");
  } else {
    // Otherwise, make the button for current project active (if any has isCurrent flag)
    const currentProjectIndex = projects.findIndex(
      (project) => project.isCurrent === true
    );
    if (currentProjectIndex !== -1) {
      const activeButton = document.querySelector(
        `[data-project="${currentProjectIndex}"]`
      );
      if (activeButton) activeButton.classList.add("active");
    } else {
      // If no current project, make the first button active
      const firstButton = document.querySelector('[data-project="0"]');
      if (firstButton) firstButton.classList.add("active");
    }
  }
}

// Setup image modal functionality
function setupImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.querySelector(".close-modal");

  // Add click event listeners to enlargeable images after they're loaded in the DOM
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("enlargeable-image")) {
      modal.style.display = "block";
      modalImg.src = e.target.src;
    }
  });

  // Close modal when close button is clicked
  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal when clicking outside the image
  modal.onclick = function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  // Close modal with escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
}

function loadProject(index) {
  const project = projects[index];
  const projectDisplay = document.getElementById("project-display");

  if (!project || !projectDisplay) {
    console.error("Project or display element not found!");
    return;
  }

  // Add fade-out effect
  projectDisplay.classList.add("fade-out");

  // Update content after brief delay for animation
  setTimeout(() => {
    // Create class names for tech tags based on tech name
    const techTagsHTML = project.techTags
      .map((tag) => {
        const className = tag.toLowerCase().replace(/[^a-z0-9]/g, "");
        return `<span class="tech-tag ${className}">${tag}</span>`;
      })
      .join("");

    // Create gallery HTML if additional images exist
    let galleryHTML = "";
    if (project.additionalImages && project.additionalImages.length > 0) {
      const galleryItemsHTML = project.additionalImages
        .map(
          (img) => `
          <div class="gallery-item">
            <img src="${img}" alt="${project.title} image" class="enlargeable-image">
          </div>
        `
        )
        .join("");

      galleryHTML = `
        <div class="project-gallery">
          <h4>Gallery</h4>
          <div class="gallery-container">
            <div class="gallery-item">
              <img src="${project.image}" alt="${project.title} main image" class="enlargeable-image">
            </div>
            ${galleryItemsHTML}
          </div>
        </div>
      `;
    }

    // Special handling for NASA SUITS project (index 1)
    if (index === 1) {
      projectDisplay.innerHTML = `
        <div class="project-header mb-4">
          <h2 class="project-title">${project.title}</h2>
          <div class="d-flex align-items-center mb-2">
            <p class="project-position badge">${project.position}</p>
            ${
              project.startDate
                ? `
            <span class="project-date ms-3">
              <i class="far fa-calendar-alt"></i> ${project.startDate} - ${
                    project.endDate || "Present"
                  }
            </span>
            `
                : ""
            }
            ${
              project.isCurrent
                ? `
            <span class="current-project-badge ms-2">
              <i class="fas fa-circle"></i> Current
            </span>
            `
                : ""
            }
          </div>
          ${
            project.organization
              ? `
          <p class="organization mb-2">
            <i class="fas fa-university"></i> ${project.organization}
          </p>
          `
              : ""
          }
          <div class="tech-tags my-2">
            ${techTagsHTML}
          </div>
        </div>
        
        <div class="project-content">
          <div class="row mb-4">
            <div class="col-md-6">
              <img src="${project.image}" alt="${
        project.title
      }" class="img-fluid rounded mb-3 enlargeable-image">
            </div>
            <div class="col-md-6">
              <h4>Project Overview</h4>
              <p>Led Boise State's UI team in the NASA SUITS (Spacesuit User Interface Technologies for Students) challenge, developing augmented reality interfaces for astronaut spacesuits.</p>
              
              <div class="info-box mt-3">
                <h5>What is NASA SUITS?</h5>
                <p>The NASA SUITS program is an initiative designed to engage students by giving them the opportunity to design spacesuit information displays within an augmented reality environment. Selected teams are invited to NASA's Johnson Space Center to test their AR interfaces in simulated space environments. These solutions aim to improve astronauts' efficiency and safety by providing critical information through the helmet's display.</p>
              </div>
            </div>
          </div>
          
          <div class="row mb-4">
            <div class="col-md-6">
              <h4>My Role</h4>
              <p>As UI team lead during the 2022-2023 school year, I guided our team through developing AR interfaces despite it being my first experience with MRTK, Meta Quest 2, and HoloLens 2. My responsibilities included:</p>
              <ul class="role-list">
                <li><strong>Leadership:</strong> Setting clear goals and fostering a collaborative learning environment</li>
                <li><strong>Project Management:</strong> Ensuring our work met NASA's requirements while navigating new technologies</li>
                <li><strong>Technical Expertise:</strong> Quickly adapting to and learning MRTK and AR development platforms</li>
                <li><strong>Documentation:</strong> Creating comprehensive documentation of our learning process and design decisions</li>
              </ul>
            </div>
            <div class="col-md-6">
              <h4>Technologies Used</h4>
              <p>We utilized Unity with MRTK (Mixed Reality Toolkit) integration for AR development targeting Meta Quest 2 and HoloLens 2 platforms. Our development process involved continuous cycles of prototyping, testing, and refining our work as we became more familiar with these technologies.</p>
              <div class="tech-showcase mt-3">
                <div class="row">
                  <div class="col-6 mb-2">
                    <div class="tech-item">
                      <i class="fas fa-vr-cardboard"></i> Meta Quest 2
                    </div>
                  </div>
                  <div class="col-6 mb-2">
                    <div class="tech-item">
                      <i class="fas fa-glasses"></i> HoloLens 2
                    </div>
                  </div>
                  <div class="col-6 mb-2">
                    <div class="tech-item">
                      <i class="fas fa-cubes"></i> Unity
                    </div>
                  </div>
                  <div class="col-6 mb-2">
                    <div class="tech-item">
                      <i class="fas fa-code"></i> MRTK
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          ${galleryHTML}
          
          <div class="row mb-4">
            <div class="col-12">
              <h4>Project Outcome</h4>
              <p>Our work on the NASA SUITS challenge resulted in a published paper: "ARSIS 6.0: A Mixed Reality Application for Enhancing Astronaut Efficiency and Autonomy" in the Proceedings of the HCI International 2023. The experience of leading this team pushed me to quickly adapt and learn, enhancing both my technical skills and leadership capabilities, while contributing to innovative AR interfaces for space exploration.</p>
              <div class="publication-reference mt-3">
                <a href="publications.html" class="btn btn-sm btn-outline-primary">
                  <i class="fas fa-file-alt"></i> View Related Publication
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (project.isCurrent) {
      // Special handling for current projects
      projectDisplay.innerHTML = `
        <div class="project-header mb-4">
          <h2 class="project-title">${project.title}</h2>
          <div class="d-flex align-items-center mb-2">
            <p class="project-position badge">${project.position}</p>
            ${
              project.startDate
                ? `
            <span class="project-date ms-3">
              <i class="far fa-calendar-alt"></i> ${project.startDate} - ${
                    project.endDate || "Present"
                  }
            </span>
            `
                : ""
            }
            <span class="current-project-badge ms-2">
              <i class="fas fa-circle"></i> Current
            </span>
          </div>
          ${
            project.organization
              ? `
          <p class="organization mb-2">
            <i class="fas fa-university"></i> ${project.organization}
          </p>
          `
              : ""
          }
          <div class="tech-tags my-2">
            ${techTagsHTML}
          </div>
        </div>
        
        <div class="project-content">
          <div class="row mb-4">
            <div class="col-md-6">
              <img src="${project.image}" alt="${
        project.title
      }" class="img-fluid rounded mb-3 enlargeable-image">
            </div>
            <div class="col-md-6">
              <h4>Project Overview</h4>
              <p>${project.description}</p>
            </div>
          </div>
          
          <div class="row mb-4">
            <div class="col-md-6">
              <h4>My Role</h4>
              <p>${project.role}</p>
              <div class="project-highlights mt-3">
                <h5>Key Responsibilities:</h5>
                <ul class="role-list">
                  <li><strong>Team Leadership:</strong> Co-leading a cross-disciplinary team of 7 professionals</li>
                  <li><strong>Agile Management:</strong> Implementing agile workflows and methodologies</li>
                  <li><strong>Stakeholder Coordination:</strong> Facilitating communication between medical and technical teams</li>
                  <li><strong>Milestone Tracking:</strong> Ensuring timely delivery of project deliverables</li>
                </ul>
              </div>
            </div>
            <div class="col-md-6">
              <h4>Technologies Used</h4>
              <p>${project.technologies}</p>
              <div class="tech-showcase mt-3">
                <div class="row">
                  <div class="col-6 mb-2">
                    <div class="tech-item">
                      <i class="fas fa-gamepad"></i> Game Development
                    </div>
                  </div>
                  <div class="col-6 mb-2">
                    <div class="tech-item">
                      <i class="fas fa-brain"></i> Cognitive Science
                    </div>
                  </div>
                  <div class="col-6 mb-2">
                    <div class="tech-item">
                      <i class="fas fa-tasks"></i> Agile Methods
                    </div>
                  </div>
                  <div class="col-6 mb-2">
                    <div class="tech-item">
                      <i class="fas fa-users"></i> Team Leadership
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          ${galleryHTML}
          
          <div class="row mb-4">
            <div class="col-12">
              <div class="current-project-info">
                <h4>Project Status</h4>
                <p>${project.currentInfo}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Standard project display for other projects
      projectDisplay.innerHTML = `
        <div class="project-header mb-4">
          <h2 class="project-title">${project.title}</h2>
          <div class="d-flex align-items-center mb-2">
            <p class="project-position badge">${project.position}</p>
            ${
              project.startDate
                ? `
            <span class="project-date ms-3">
              <i class="far fa-calendar-alt"></i> ${project.startDate} - ${
                    project.endDate || "Present"
                  }
            </span>
            `
                : ""
            }
          </div>
          ${
            project.organization
              ? `
          <p class="organization mb-2">
            <i class="fas fa-university"></i> ${project.organization}
          </p>
          `
              : ""
          }
          <div class="tech-tags my-2">
            ${techTagsHTML}
          </div>
        </div>
        
        <div class="project-content">
          <div class="row mb-4">
            <div class="col-md-6">
              <img src="${project.image}" alt="${
        project.title
      }" class="img-fluid rounded mb-3 enlargeable-image">
            </div>
            <div class="col-md-6">
              <h4>Project Overview</h4>
              <p>${project.description}</p>
            </div>
          </div>
          
          <div class="row mb-4">
            <div class="col-md-6">
              <h4>My Role</h4>
              <p>${project.role}</p>
            </div>
            <div class="col-md-6">
              <h4>Technologies Used</h4>
              <p>${project.technologies}</p>
            </div>
          </div>
          
          ${galleryHTML}
        </div>
      `;
    }

    // Remove fade-out and add fade-in
    projectDisplay.classList.remove("fade-out");
    projectDisplay.classList.add("fade-in");

    // Clear fade-in class after animation completes
    setTimeout(() => {
      projectDisplay.classList.remove("fade-in");
    }, 500);
  }, 300);
}
