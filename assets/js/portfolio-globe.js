const username = "daffadevhosting"; // ganti username
const workerBase = "https://my-github.daffaadityadwiputra.workers.dev/api";

// --- Color Maps ---
const langColors = {
    JavaScript: "bg-yellow-400 text-black",
    TypeScript: "bg-blue-500 text-white",
    Python: "bg-green-500 text-white",
    Ruby: "bg-red-500 text-white",
    PHP: "bg-indigo-500 text-white",
    HTML: "bg-orange-500 text-white",
    CSS: "bg-blue-400 text-white",
    Vue: "bg-green-400 text-white",
    Java: "bg-red-600 text-white",
    'C++': "bg-blue-600 text-white",
    Go: "bg-cyan-400 text-black",
    Shell: "bg-gray-800 text-white",
    Swift: "bg-orange-400 text-white",
    Kotlin: "bg-purple-500 text-white",
    Default: "bg-gray-300 text-gray-800",
};

const langCardBgColors = {
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Ruby: '#701516',
    PHP: '#4F5D95',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#41b883',
    Java: '#b07219',
    'C++': '#f34b7d',
    Shell: '#4EAA25',
};


async function main() {
  // === Setup Three.js ===
  const canvas = document.getElementById("globe");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  // --- Space Background ---
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  // Load from local assets
  cubeTextureLoader.setPath('assets/images/');
  const cubeTexture = cubeTextureLoader.load([
      'dark-s_px.jpg', 'dark-s_nx.jpg',
      'dark-s_py.jpg', 'dark-s_ny.jpg',
      'dark-s_pz.jpg', 'dark-s_nz.jpg'
  ]);
  scene.background = cubeTexture;

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 0.1);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.autoRotate = false; // Disable initially to show the title
  controls.autoRotateSpeed = 0.7;

  // === Lighting ===
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // === 3D Text ===
  const fontLoader = new THREE.FontLoader();
  fontLoader.load(
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextGeometry('Repositories List', {
            font: font,
            size: 0.5,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(textMesh);

        // Center the text geometry
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        
        // Position it in front of the initial camera view, responsive for mobile
        let distance = 5; // Default distance for desktop
        if (window.innerWidth < 768) {
            distance = 8; // Move it further away on mobile
        }
        textMesh.position.set(-textWidth / 2, 0, -distance);

        // On first interaction, start animation and move text to final position
        renderer.domElement.addEventListener('mousedown', () => {
            controls.autoRotate = true;
            gsap.to(textMesh.position, { 
                duration: 2, 
                y: 12,
                z: 0,
                ease: 'power3.inOut' 
            });
        }, { once: true });
    }
  );

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener("mousemove", e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
  
  window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // === Fetch repo ===
  const repoRes = await fetch(`${workerBase}/users/${username}/repos?per_page=36`);
  const repos = await repoRes.json();

  const planes = [];
  repos.forEach((repo, i) => {
    const plane = createCardTexture(repo);
    placeOnGlobe(plane, i, repos.length);
    plane.userData.html_url = repo.html_url;
    scene.add(plane);
    planes.push(plane);

    const langs = repo.language ? [repo.language] : [];
    const langBadges = langs.length
        ? langs.map(lang => `<span class="px-2 py-1 rounded-full text-xs font-medium mr-2 ${langColors[lang] || langColors.Default}">${lang}</span>`).join("")
        : `<span class="px-2 py-1 rounded-full text-xs font-medium ${langColors.Default}">Unknown</span>`;

    document.getElementById("repo-swiper").innerHTML += `
      <div class="swiper-slide p-4 h-full flex-grow-1 flex flex-col max-h-[350px] bg-gray-800 text-white rounded-xl shadow-lg border border-gray-700">
        <h3 class="text-lg text-white font-semibold mb-2">${repo.name}</h3>
        <div class="mb-3">${langBadges}</div>
        <p class="text-gray-400 text-sm mb-3 flex-grow">${repo.description || "No description"}</p>
        <div class="flex text-sm text-gray-400 items-center">
            <div class="mr-4">⭐ ${repo.stargazers_count || 0}</div>
            <div><svg class="w-4 h-4 inline-block mr-1 text-gray-400" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zM10.5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path></svg> ${repo.forks_count || 0}</div>
            <a href="${repo.html_url}" target="_blank" class="ml-auto text-blue-400 text-sm hover:text-blue-300 font-semibold">View →</a>
        </div>
      </div>`;
  });

  function createCardTexture(repo) {
    const canvas = document.createElement("canvas");
    const width = 512, height = 362;
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Set background sesuai language.
    const lang = repo.language;
    const bgColor = lang ? langCardBgColors[lang] : null;

    if (bgColor) {
        ctx.fillStyle = bgColor;
        ctx.roundRect(0, 0, width, height, 20); 
        ctx.fill();
    } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#2d3748"); 
        gradient.addColorStop(1, "#1a202c");
        ctx.fillStyle = gradient;
        ctx.roundRect(0, 0, width, height, 20); 
        ctx.fill();
    }

    ctx.strokeStyle = "rgba(128, 128, 128, 0.3)"; 
    ctx.lineWidth = 2; 
    ctx.stroke();

    // Card Text (selalu light)
    ctx.fillStyle = "#ffffff"; 
    ctx.font = "bold 36px sans-serif";
    ctx.fillText(repo.name.substring(0, 20), 30, 60);

    ctx.fillStyle = "#E2E8F0"; // Light gray
    ctx.font = "24px sans-serif";
    const description = repo.description || "No description available.";
    ctx.fillText(description.substring(0, 45), 30, 110);
    if (description.length > 45) ctx.fillText(description.substring(45, 90) + "...", 30, 140);

    // Stats Text
    ctx.font = "bold 24px sans-serif"; 
    ctx.fillStyle = "#E2E8F0";
    ctx.fillText(`⭐ ${repo.stargazers_count || 0}`, 30, height - 40);

    const texture = new THREE.CanvasTexture(canvas);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.25), new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, opacity: 0.9 }));
    return plane;
  }

  function placeOnGlobe(plane, index, total) {
    const radius = 4 + Math.random() * 6; // Menyebar secara acak dari pusat
    const phi = Math.acos(2 * Math.random() - 1); // Distribusi vertikal merata
    const theta = Math.random() * 2 * Math.PI; // Distribusi horizontal merata

    plane.position.setFromSphericalCoords(radius, phi, theta);
    plane.lookAt(0,0,0);
  }

  let focusedCard = null;
  let isTransitioning = false;

  window.addEventListener("click", () => {
    if (isTransitioning) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planes);
    const clickedObject = intersects.length > 0 ? intersects[0].object : null;

    if (clickedObject) {
      if (focusedCard === clickedObject) {
        window.open(clickedObject.userData.html_url, "_blank");
      } else {
        isTransitioning = true;
        focusedCard = clickedObject;
        controls.autoRotate = false;

        // Hitung posisi agar jaraknya konsisten dari kartu, di antara pusat dan kartu
        // Dibuat responsif untuk mobile
        let focusDistance = 2.0; // Jarak default untuk desktop
        if (window.innerWidth < 768) {
            focusDistance = 4.5; // Lebih jauh di mobile agar tidak terlalu zoom
        }
        const offset = focusedCard.position.clone().normalize().multiplyScalar(focusDistance);
        const targetPos = focusedCard.position.clone().sub(offset);
        gsap.to(camera.position, { duration: 1, x: targetPos.x, y: targetPos.y, z: targetPos.z, ease: 'power3.inOut' });
        gsap.to(controls.target, { duration: 1, x: focusedCard.position.x, y: focusedCard.position.y, z: focusedCard.position.z, ease: 'power3.inOut', onComplete: () => { isTransitioning = false; } });

        planes.forEach(p => { gsap.to(p.material, { duration: 0.5, opacity: p === focusedCard ? 1.0 : 0.2 }); });
      }
    } else if (focusedCard) {
      isTransitioning = true;
      // Zoom out to a position that can see the whole cloud
      const zoomOutPos = focusedCard.position.clone().normalize().multiplyScalar(11.0);
      focusedCard = null;

      gsap.to(camera.position, { duration: 1, x: zoomOutPos.x, y: zoomOutPos.y, z: zoomOutPos.z, ease: 'power3.inOut' });
      gsap.to(controls.target, { duration: 1, x: 0, y: 0, z: 0, ease: 'power3.inOut', onComplete: () => { controls.autoRotate = true; isTransitioning = false; } });
      
      planes.forEach(p => { gsap.to(p.material, { duration: 0.5, opacity: 0.9 }); });
    }
  });

  function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  let swiper;
  function initSwiper() {
    if (swiper) return;
    swiper = new Swiper(".swiper", { slidesPerView: 1, spaceBetween: 20, breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } } });
  }

  const globeCanvas = document.getElementById("globe");
  const pageContent = document.getElementById("page-content");
  const globeButton = document.getElementById("globeMode");
  const listButton = document.getElementById("listMode");

  function setGlobeMode() { 
    pageContent.style.display = "none"; 
    globeCanvas.style.display = "block";
    globeButton.classList.add("active-mode");
    globeButton.classList.remove("inactive-mode");
    listButton.classList.add("inactive-mode");
    listButton.classList.remove("active-mode");
  }
  function setListMode() { 
    pageContent.style.display = "flex"; 
    globeCanvas.style.display = "none"; 
    initSwiper();
    listButton.classList.add("active-mode");
    listButton.classList.remove("inactive-mode");
    globeButton.classList.add("inactive-mode");
    globeButton.classList.remove("active-mode");
  }

  document.getElementById("globeMode").addEventListener("click", setGlobeMode);
  document.getElementById("listMode").addEventListener("click", setListMode);
  
  setGlobeMode();
}

main().catch(err => console.error(err));
