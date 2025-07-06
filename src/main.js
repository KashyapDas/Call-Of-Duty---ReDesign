// register the scrollTrigger
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  scroller: "#contentPage",
});

// global fecthing
const links = document.querySelectorAll(".link");
const mainContent = document.querySelector("#contentPage");
const navIcon = document.querySelector("#clickNav");
const mobileNav = document.querySelector("#mobileNav");

// Enhanced Franchise data with more details
const franchiseData = [
  {
    title: "Modern Warfare",
    subtitle: "Tactical Combat Redefined",
    description: "Experience the most realistic and intense warfare with cutting-edge graphics and immersive gameplay that pushes the boundaries of modern combat simulation.",
    image: "./images/image1.jpg",
    year: "2019",
    status: "Active",
    players: "50M+",
    rating: "9.2",
    category: "Tactical Shooter",
    features: ["4K Graphics", "Cross-Platform", "Ray Tracing"]
  },
  {
    title: "Black Ops",
    subtitle: "Covert Operations",
    description: "Dive into the shadows of classified missions and uncover the truth behind global conspiracies in this thrilling espionage-focused franchise.",
    image: "./images/image2.jpg",
    year: "2020",
    status: "Active",
    players: "45M+",
    rating: "9.0",
    category: "Action Thriller",
    features: ["Zombies Mode", "Campaign", "Multiplayer"]
  },
  {
    title: "Warzone",
    subtitle: "Battle Royale Evolution",
    description: "Drop into the ultimate battle royale experience with up to 150 players in massive combat zones featuring dynamic weather and destructible environments.",
    image: "./images/image3.jpg",
    year: "2020",
    status: "Live",
    players: "100M+",
    rating: "8.8",
    category: "Battle Royale",
    features: ["150 Players", "Free-to-Play", "Cross-Platform"]
  },
  {
    title: "Vanguard",
    subtitle: "WWII Reimagined",
    description: "Fight across multiple fronts in the most ambitious WWII Call of Duty experience ever created, featuring authentic historical campaigns.",
    image: "./images/image4.jpg",
    year: "2021",
    status: "Active",
    players: "30M+",
    rating: "8.5",
    category: "Historical Warfare",
    features: ["WWII Setting", "Destructible Environments", "Champion Hill"]
  },
  {
    title: "Mobile",
    subtitle: "Warfare On-The-Go",
    description: "Take the Call of Duty experience anywhere with console-quality gameplay optimized for mobile devices without compromising on quality.",
    image: "./images/image5.jpg",
    year: "2019",
    status: "Live",
    players: "650M+",
    rating: "9.1",
    category: "Mobile Gaming",
    features: ["Mobile Optimized", "Touch Controls", "Battle Royale"]
  },
  {
    title: "Zombies",
    subtitle: "Undead Survival",
    description: "Survive waves of the undead in the most terrifying and challenging zombie experience with cooperative gameplay and mysterious storylines.",
    image: "./images/image6.jpg",
    year: "2008",
    status: "Legacy",
    players: "200M+",
    rating: "9.3",
    category: "Survival Horror",
    features: ["Co-op Mode", "Easter Eggs", "Storyline"]
  }
];

// Scroll preventation effect in between the page transition
function disableScroll() {
  document.body.style.overflow = "hidden";
  document.addEventListener('wheel', preventScroll, { passive: false });
  document.addEventListener('touchmove', preventScroll, { passive: false });
  document.addEventListener('keydown', preventKeyScroll, false);
}

function enableScroll() {
  document.body.style.overflow = "visible";
  document.removeEventListener('wheel', preventScroll, { passive: false });
  document.removeEventListener('touchmove', preventScroll, { passive: false });
  document.removeEventListener('keydown', preventKeyScroll, false);
}

function preventScroll(e) {
  e.preventDefault();
}

function preventKeyScroll(e) {
  // Block arrow keys, space, page up/down, etc.
  const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
  if (keys.includes(e.keyCode)) {
    e.preventDefault();
  }
}

// default content loaded when the html render
document.addEventListener("DOMContentLoaded", () => {
  mainContent.innerHTML = getHomeHTML();
  disableScroll();
  // Defer init to next frame to avoid layout shift
  requestAnimationFrame(() => initializeScrollAnimation());
});

// page transition with the dynamic content pushing based on the navbar links
const pageTransition = async (tab)=>{
  // content change based on the link clicks
    if (tab.textContent === "Home") {
      mainContent.innerHTML = getHomeHTML();
      requestAnimationFrame(() => initializeScrollAnimation());
    } else if (tab.textContent === "Franchises") {
      mainContent.innerHTML = getFranchises();
      requestAnimationFrame(() => {
        getFranchisesAnimation();
        initializeFranchiseInteractions();
      });
    } else if (tab.textContent === "Updates") {
      mainContent.innerHTML = getUpdates();
      //requestAnimationFrame(() => {
        //getFranchisesAnimation()});
    } else if (tab.textContent === "Soldiers") {
      mainContent.innerHTML = `<div id="hero"><h1>Soldiers</h1></div>`;
    }
    // Page out transition
    await new Promise((r) => setTimeout(r, 500));
    await animateOutPages();
    enableScroll();
}
// do page transition and navbar transiton according to the mobile views
const mediaQuery = window.matchMedia("(max-width: 480px)");
if (mediaQuery.matches) {
  // This block runs if the screen width is 480px or less
    links.forEach((tab) => {
  tab.addEventListener("click", async (e) => {
    e.preventDefault();
    disableScroll();
    // Page in transition
    await animatePages();
    await gsap.to(mobileNav,{
    opacity : 0,
    duration : 0.2,
    ease : "power4.inOut",
    onStart : () =>{
      navIcon.classList.remove("ri-menu-2-fill"),
      navIcon.classList.add("ri-menu-3-fill")
      },
      onComplete : () => {
      // left : "100%",
      mobileNav.style.left = "100%"
    }
    })
    pageTransition(tab);
  });
});
} 
else {
  links.forEach((tab) => {
  tab.addEventListener("click", async (e) => {
    e.preventDefault();
    disableScroll();
    // Page in transition
    await animatePages();
    pageTransition(tab);
  });
});
}

// mobile navbar transition
navIcon.addEventListener("click",(dets)=>{
  // const tl = gsap.timeline();
  // check which class the icon has
  if(navIcon.classList.contains("ri-menu-3-fill"))
  {
    gsap.to(mobileNav,{
    left : "0%",
    duration : 0.2,
    ease : "power4.inOut",
    onStart : () =>{
      navIcon.classList.remove("ri-menu-3-fill"),
      navIcon.classList.add("ri-menu-2-fill")
      mobileNav.style.opacity = "100"  
    }
    })
  }
  if(navIcon.classList.contains("ri-menu-2-fill"))
  {
    gsap.to(mobileNav,{
    left : "100%",
    duration : 0.2,
    ease : "power4.inOut",
    onStart : () =>{
      navIcon.classList.remove("ri-menu-2-fill"),
      navIcon.classList.add("ri-menu-3-fill")
      mobileNav.style.opacity = "0"  
    }
    })
  }
})

// Page transition in aniamtion
async function animatePages() {
  return Promise.all([
    gsap.to("#animate1 div", {
      height: "100%",
      duration: 0.3,
      stagger: 0.1,
    }),
    gsap.to("#animate2 div", {
      height: "100%",
      duration: 0.3,
      stagger: 0.1,
    }),
  ]);
}

// Page transnition out animation
async function animateOutPages() {
  return Promise.all([
    gsap.to("#animate1 div", {
      height: "0%",
      duration: 0.3,
      stagger: 0.1,
    }),
    gsap.to("#animate2 div", {
      height: "0%",
      duration: 0.3,
      stagger: 0.1,
    }),
  ]);
}

function initializeScrollAnimation() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill()); //  cleanup

  const canvas = document.getElementById("canvasImage");
  if (!canvas) return;

  disableScroll(); // prevent scroll during image load

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Set canvas size once
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const framesValues = {
    currentIndex: 1,
    maxIndex: 1128,
  };

  const images = [];
  let lastFrame = -1;

  function drawImage(index) {
    const img = images[index - 1];
    if (!img) return;

    const scaleX = width / img.width;
    const scaleY = height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (width - newWidth) / 2;
    const offsetY = (height - newHeight) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  }

function preloadImages() {
  for (let i = 1; i <= framesValues.maxIndex; i++) {
    const img = new Image();
    img.src = `./frame/frame_${i.toString().padStart(4, "0")}.jpeg`;
    img.onload = () => {
      if (i === 1) drawImage(1);
      loadedImages++;
      if (loadedImages === framesValues.maxIndex) {
        requestAnimationFrame(() => {
          setupScrollTrigger();
          ScrollTrigger.refresh();
          enableScroll(); // ✅ only after everything is ready
        });
      }
    };
    images.push(img);
  }
}

  function setupScrollTrigger() {
  const scrollLength = framesValues.maxIndex * 4.5;

  gsap.to(framesValues, {
    currentIndex: framesValues.maxIndex,
    ease: "none",
    scrollTrigger: {
      trigger: "#storyWrapper",
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 0.5,
      pin: "#storyWrapper",
      pinSpacing: true,
      pinType: "transform",
      anticipatePin: 1,
      invalidateOnRefresh: true,

      // 👉 This is the key
      onLeave: () => triggerPicAnimation(),
    },
    onUpdate: () => {
      const frame = Math.floor(framesValues.currentIndex);
      if (frame !== lastFrame) {
        drawImage(frame);
        lastFrame = frame;
      }
    },
  });
}


  let loadedImages = 0;
  preloadImages();
}

// dynamic content of the home page should look like these
function getHomeHTML() {
  return `
    <div id="heading1">
      <h1>Call of duty</h1>
      <h1>SQUAD READY.</h1>
      <h1>LET'S GO</h1>
    </div>
    <div class="scroll" id="firstScroll">
      <div class="scroll-track1">
        ${[...Array(8)]
          .map((_, i) => `<img src="./images/image${i + 1}.jpg"/>`)
          .join("\n")}
        ${[...Array(8)]
          .map((_, i) => `<img src="./images/image${i + 1}.jpg"/>`)
          .join("\n")}
      </div>
    </div>
    <div class="scroll">
      <div class="scroll-track2">
        ${[...Array(8)]
          .map((_, i) => `<img src="./images/image${i + 1}.jpg"/>`)
          .join("\n")}
        ${[...Array(8)]
          .map((_, i) => `<img src="./images/image${i + 1}.jpg"/>`)
          .join("\n")}
      </div>
    </div>

    <div id="storyWrapper">
      <div id="storyTelling">
        <canvas id="canvasImage"></canvas>
      </div>
    </div>

    <div id="page1">
      <h1 id="page1Head" class="page1Heading">CALL OF DUTY</h1>
      <h2 class="page1Heading">WARZONE STRIKE</h2>
      <div class="pic1">
        <img src="./images/pic5.jpg" id="cards1">
      </div>
      <div class="pic2">
        <img src="./images/pic1.jpg" id="cards2">
      </div>
      <footer id="homeFooter">
        <div id="homeText">
            <h1>Legal</h1>
            <h1>Terms of use</h1>
            <h1>Privacy policy</h1>
            <h1>Carrers</h1>
            <h1>Cookie Policy</h1>
            <h1>Support</h1>
            <h1>Code of Contact</h1>
            <h1>Your privacy choises</h1>
        </div>
        <!-- <div id="hr"></div> -->
      </footer>
    </div>
    <div id="footerLogos"> 
        <div id="imgDiv">
            <img src="./logos/activision-logo.png" />
        </div>
        <div id="imgDiv">
            <img src="./logos/atvi-shanghai-logo.png" />
        </div>
        <div id="imgDiv">
            <img src="./logos/digital-legends-logo.png" />
        </div>
        <div id="imgDiv">
            <img src="./logos/high-moon-logo.png" />
        </div>
        <div id="imgDiv">
            <img src="./logos/raven-logo.png" />
        </div>
        <div id="imgDiv">
            <img src="./logos/infinity-ward-logo.png" />
        </div>
        <div id="imgDiv">
            <img src="./logos/solid-state-logo.png" />
        </div>
        <div id="imgDiv">
            <img src="./logos/treyarch-logo.png" />
        </div>
    </div>
    <div id="licence">
        <div id="licenceImage">
            <img src="./logos/esrb-privacy.jpg" />
           <img src="./logos/cod-hub-esrb-en.png" />
        </div>
        <p id="footerText">
            <span>© 2024-2025 Activision Publishing, Inc. ACTIVISION, CALL OF DUTY, CALL OF DUTY LEAGUE, MODERN WARFARE, CALL OF DUTY BLACK OPS, CALL OF DUTY WARZONE, and CALL OF DUTY VANGUARD are trademarks of Activision Publishing, Inc. All other trademarks and trade names are the property of their respective owners.</span>
        </p>
    </div>
  `;
}

function getFranchises() {
  return `
    <div id="franchisesPage">
      <!-- Animated Hero Section -->
      <div id="franchisesHero">
        <div class="hero-background">
          <div class="hero-particles"></div>
          <div class="hero-gradient"></div>
        </div>
        <div class="hero-content">
          <div class="hero-badge">LEGENDARY SERIES</div>
          <h1 class="hero-title">
            <span class="title-line">CALL OF DUTY</span>
            <span class="title-line title-accent">FRANCHISES</span>
          </h1>
          <p class="hero-description">Two decades of revolutionary warfare gaming that redefined an entire industry</p>
          <div class="hero-cta">
            <button class="btn-hero-primary">Explore All Games</button>
            <button class="btn-hero-secondary">Watch Trailer</button>
          </div>
        </div>
        <div class="hero-scroll-indicator">
          <div class="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </div>

      <!-- Interactive Stats Dashboard -->
      <div id="franchisesStats">
        <div class="stats-container">
          <div class="stat-item" data-stat="years">
            <div class="stat-icon">🏆</div>
            <span class="stat-number" data-target="20">0</span>
            <span class="stat-label">Years of Excellence</span>
            <div class="stat-progress"></div>
          </div>
          <div class="stat-item" data-stat="players">
            <div class="stat-icon">👥</div>
            <span class="stat-number" data-target="400">0</span>
            <span class="stat-suffix">M+</span>
            <span class="stat-label">Players Worldwide</span>
            <div class="stat-progress"></div>
          </div>
          <div class="stat-item" data-stat="franchises">
            <div class="stat-icon">🎮</div>
            <span class="stat-number" data-target="6">0</span>
            <span class="stat-label">Active Franchises</span>
            <div class="stat-progress"></div>
          </div>
          <div class="stat-item" data-stat="awards">
            <div class="stat-icon">🥇</div>
            <span class="stat-number" data-target="150">0</span>
            <span class="stat-suffix">+</span>
            <span class="stat-label">Industry Awards</span>
            <div class="stat-progress"></div>
          </div>
        </div>
      </div>

      <!-- Filter Navigation -->
      <div id="franchiseFilters">
        <div class="filter-container">
          <button class="filter-btn active" data-filter="all">All Franchises</button>
          <button class="filter-btn" data-filter="active">Active</button>
          <button class="filter-btn" data-filter="legacy">Legacy</button>
          <button class="filter-btn" data-filter="live">Live Service</button>
        </div>
      </div>

      <!-- Premium Franchise Cards Grid -->
      <div id="franchisesGrid">
        <div class="grid-container">
          ${franchiseData.map((franchise, index) => `
            <div class="franchise-card" data-index="${index}" data-status="${franchise.status.toLowerCase()}" data-category="${franchise.category.toLowerCase().replace(' ', '-')}">
              <div class="card-background">
                <img src="${franchise.image}" alt="${franchise.title}" class="card-bg-image">
                <div class="card-overlay"></div>
              </div>
              
              <div class="card-content">
                <div class="card-header">
                  <div class="card-status-badge ${franchise.status.toLowerCase()}">${franchise.status}</div>
                  <div class="card-rating">
                    <span class="rating-star">★</span>
                    <span class="rating-value">${franchise.rating}</span>
                  </div>
                </div>
                
                <div class="card-main">
                  <h3 class="card-title">${franchise.title}</h3>
                  <h4 class="card-subtitle">${franchise.subtitle}</h4>
                  <p class="card-description">${franchise.description}</p>
                  
                  <div class="card-stats">
                    <div class="stat">
                      <span class="stat-label">Players</span>
                      <span class="stat-value">${franchise.players}</span>
                    </div>
                    <div class="stat">
                      <span class="stat-label">Released</span>
                      <span class="stat-value">${franchise.year}</span>
                    </div>
                    <div class="stat">
                      <span class="stat-label">Category</span>
                      <span class="stat-value">${franchise.category}</span>
                    </div>
                  </div>
                  
                  <div class="card-features">
                    ${franchise.features.map(feature => `
                      <span class="feature-tag">${feature}</span>
                    `).join('')}
                  </div>
                </div>
                
                <div class="card-actions">
                  <button class="btn-card-primary">Play Now</button>
                  <button class="btn-card-secondary">Learn More</button>
                  <button class="btn-card-icon">
                    <span class="icon">❤️</span>
                  </button>
                </div>
              </div>
              
              <div class="card-hover-effect"></div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Featured Showcase -->
      <div id="featuredShowcase">
        <div class="showcase-container">
          <div class="showcase-content">
            <div class="showcase-badge">FEATURED EXPERIENCE</div>
            <h2 class="showcase-title">Modern Warfare III</h2>
            <h3 class="showcase-subtitle">The Future of Tactical Combat</h3>
            <p class="showcase-description">
              Experience the most advanced Call of Duty ever created. With cutting-edge AI, 
              photorealistic graphics, and revolutionary gameplay mechanics that blur the line 
              between gaming and reality.
            </p>
            
            <div class="showcase-features">
              <div class="feature-item">
                <div class="feature-icon">🎯</div>
                <div class="feature-content">
                  <h4>Advanced AI Combat</h4>
                  <p>Next-gen enemy intelligence</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🌍</div>
                <div class="feature-content">
                  <h4>Global Multiplayer</h4>
                  <p>Cross-platform warfare</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">⚡</div>
                <div class="feature-content">
                  <h4>Real-time Ray Tracing</h4>
                  <p>Photorealistic lighting</p>
                </div>
              </div>
            </div>
            
            <div class="showcase-cta">
              <button class="btn-showcase-primary">Experience Now</button>
              <button class="btn-showcase-secondary">Watch Gameplay</button>
            </div>
          </div>
          
          <div class="showcase-visual">
            <div class="visual-container">
              <img src="./images/image1.jpg" alt="Modern Warfare III" class="showcase-image">
              <div class="visual-effects">
                <div class="effect-particle"></div>
                <div class="effect-particle"></div>
                <div class="effect-particle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div id="franchiseTimeline">
        <div class="timeline-header">
          <h2>Franchise Evolution</h2>
          <p>Two decades of innovation and excellence</p>
        </div>
        <div class="timeline-container">
          <div class="timeline-line"></div>
          ${franchiseData.map((franchise, index) => `
            <div class="timeline-item" data-year="${franchise.year}">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="timeline-year">${franchise.year}</div>
                <h3>${franchise.title}</h3>
                <p>${franchise.subtitle}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>


    </div>
  `;
}

function getFranchisesAnimation() {
  // Clear any existing ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Hero section animations
  const heroTl = gsap.timeline();
  
  heroTl.from(".hero-badge", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .from(".title-line", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  }, "-=0.4")
  .from(".hero-description", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.3")
  .from(".hero-cta button", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.2")
  .from(".hero-scroll-indicator", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.1");

  // Animate hero particles
  gsap.to(".hero-particles", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none"
  });

  // Stats animation with enhanced effects
  gsap.from(".stat-item", {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#franchisesStats",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });

  // Animate stat numbers with counter effect
  document.querySelectorAll('.stat-number').forEach((stat, index) => {
    const target = parseInt(stat.dataset.target);
    
    gsap.from(stat, {
      textContent: 0,
      duration: 2,
      delay: index * 0.2,
      ease: "power2.out",
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: stat,
        start: "top 80%",
      },
      onUpdate: function() {
        stat.textContent = Math.floor(this.targets()[0].textContent);
      }
    });

    // Animate progress bars
    gsap.from(stat.parentElement.querySelector('.stat-progress'), {
      scaleX: 0,
      duration: 1.5,
      delay: index * 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: stat,
        start: "top 80%",
      }
    });
  });

  // Filter buttons animation
  gsap.from(".filter-btn", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#franchiseFilters",
      start: "top 90%",
    }
  });

  // Franchise cards with advanced stagger animation
  gsap.from(".franchise-card", {
    y: 100,
    opacity: 0,
    rotation: 5,
    duration: 1,
    stagger: {
      amount: 1.2,
      grid: "auto",
      from: "start"
    },
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#franchisesGrid",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });

  // Featured showcase animation
  gsap.from(".showcase-content > *", {
    x: -100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#featuredShowcase",
      start: "top 70%",
    }
  });

  gsap.from(".showcase-visual", {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#featuredShowcase",
      start: "top 70%",
    }
  });

  // Timeline animation
  gsap.from(".timeline-item", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#franchiseTimeline",
      start: "top 80%",
    }
  });

  // Continuous animations
  gsap.to(".effect-particle", {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    stagger: 0.3,
    ease: "power2.inOut"
  });

  gsap.to(".scroll-line", {
    height: "100%",
    duration: 1.5,
    repeat: -1,
    ease: "power2.inOut"
  });
}

function initializeFranchiseInteractions() {
  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.franchise-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter cards with animation
      cards.forEach(card => {
        const shouldShow = filter === 'all' || card.dataset.status === filter;
        
        if (shouldShow) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
          card.style.display = 'block';
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              card.style.display = 'none';
            }
          });
        }
      });
    });
  });

  // Card hover effects
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('.card-hover-effect'), {
        opacity: 1,
        duration: 0.3
      });
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.card-hover-effect'), {
        opacity: 0,
        duration: 0.3
      });
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}

function triggerPicAnimation() {
  gsap.to(".pic1", {
    opacity: 1,
    top: "10%",
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger : {
      trigger : ".pic1",
      scroller : "#page1",
      start : "top 40%",
      end : "top 10%",
      markers : false
    }
  });

  gsap.to(".pic2", {
    opacity: 1,
    top: "15%",
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger : {
      trigger : ".pic2",
      scroller : "#page1",
      start : "top 40%",
      end : "top 10%",
      markers : false
    }
  });
}