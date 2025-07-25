// use imageLoaded lib to prevent the slow loading of the marque for the 1st the DOM content loaded
import imagesLoaded from "imagesloaded";
import { franchiseData } from './Data/franchiseData.js';
// global varaible 
let frameImages = [];
let framesLoaded = false;
let preloadPromise = null;
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

  // Wait until all images inside #contentPage are fully loaded
  imagesLoaded("#contentPage", { background: true }, () => {
    disableScroll();
    requestAnimationFrame(() => {
      initializeScrollAnimation();
      ScrollTrigger.refresh(); // force correct trigger positions
    });
  });

});
// page transition with the dynamic content pushing based on the navbar links
const pageTransition = async (tab) => {
  if (tab.textContent === "Home") {
    disableScroll(); // ⛔ Block scroll while loading frames
    mainContent.innerHTML = getHomeHTML();

    await new Promise((r) => setTimeout(r, 500));
    await animateOutPages();

    requestAnimationFrame(() => {
      initializeScrollAnimation(); // ✅ This will enable scroll only after preload completes
      ScrollTrigger.refresh();
    });

  }  else{
    // Trigger preload silently in the background
    preloadFrameImages(); // 🔥 Preload started if not done

    if (tab.textContent === "Franchises") {
    disableScroll(); // Disable scroll during transition
    mainContent.innerHTML = getFranchises();

    await new Promise((r) => setTimeout(r, 500));
    await animateOutPages();

    // Wait for images to load before enabling animations
    imagesLoaded("#franchisesPage", { background: true }, () => {
      requestAnimationFrame(() => {
        getFranchisesAnimation();
        initializeFranchiseInteractions();
        ScrollTrigger.refresh(); // ✅ important
        enableScroll(); // ✅ Scroll is safe after all GSAP/DOM are ready
      });
    });

  } else if (tab.textContent === "Updates") {
    disableScroll(); // Disable scroll during transition
    mainContent.innerHTML = getUpdates();

    await new Promise((r) => setTimeout(r, 500));
    await animateOutPages();
    
  // Wait for images to load before enabling animations

  imagesLoaded("#updates_page", { background: true }, () => {
    requestAnimationFrame(() => {
      getUpdatesAnimation();
      initializeUpdatesInteractions();
      ScrollTrigger.refresh(); // ✅ important
      enableScroll(); // ✅ Scroll is safe after all GSAP/DOM are ready
    });
  });

}else if (tab.textContent === "Soldiers") {
    mainContent.innerHTML = `<div id="hero"><h1>Soldiers</h1></div>`;

    await new Promise((r) => setTimeout(r, 500));
    await animateOutPages();
    enableScroll();
  }
  }
};
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
// Implementing the frame based animtion in the home page
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
  // Use already preloaded images if available
  if (framesLoaded && frameImages.length > 0) {
    images.push(...frameImages);
    drawImage(1);
    requestAnimationFrame(() => {
      setupScrollTrigger();
      ScrollTrigger.refresh();
      enableScroll(); // ✅ already ready
    });
    return;
  }

  // fallback to manual preload if not done
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
          enableScroll();
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
// Load the images for the first time and then cached it in the global variable array and store it
function preloadFrameImages() {
  if (framesLoaded || preloadPromise) return preloadPromise;

  const maxIndex = 1128;
  let loadedCount = 0;
  frameImages = [];
  
  preloadPromise = new Promise((resolve) => {
    for (let i = 1; i <= maxIndex; i++) {
      const img = new Image();
      img.src = `./frame/frame_${i.toString().padStart(4, "0")}.jpeg`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === maxIndex) {
          framesLoaded = true;
          resolve();
        }
      };

      frameImages.push(img);
    }
  });

  return preloadPromise;
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
// dynamic content of the franchies page should look like these
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
        
        <! -- Explore all games button functionality -->

       
                <! -- Watch trailer button functionality -->
                <!-- Backdrop Blur + Overlay -->
                <div id="backdrop-overlay" class="hidden"></div>

                <!-- Trailer Modal -->
                <div id="trailer-container" class="hidden">
                <iframe 
                id="youtube-player" 
                src="" 
                frameborder="0" 
                allowfullscreen 
                allow="autoplay; encrypted-media">
              </iframe>
              <button id="close-trailer" class="close-btn">×</button>
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
                <button class="btn-card-primary" data-play="${franchise.playUrl}">Play Now</button>
                <button class="btn-card-secondary" data-learn="${franchise.learnMoreUrl}">Learn More</button>
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
//animation fnc of the franchies page
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

  .fromTo(".hero-cta button",
  {
    y: 50,
    scale: 0.9,
    autoAlpha: 0
  },
  {
    y: 0,
    scale: 1,
    autoAlpha: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.7)"
  }, "-=0.2"
)

//   .from(".hero-cta button", {
//   y: 50,
//   scale: 0.9,
//   autoAlpha: 0,
//   duration: 0.8,
//   stagger: 0.15,
//   ease: "back.out(1.7)"
// }, "-=0.2")

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

  const exploreAllGamesBtn = document.querySelector('.btn-hero-primary');
  const watchTrailerBtn = document.querySelector('.btn-hero-secondary');
  const trailerContainer = document.getElementById('trailer-container');
  const backdropOverlay = document.getElementById('backdrop-overlay');
  const closeTrailerBtn = document.getElementById('close-trailer');
  const youtubePlayer = document.getElementById('youtube-player');

  exploreAllGamesBtn.addEventListener('click', () => {
    document.getElementById("franchisesGrid").scrollIntoView({
      behavior: "smooth"
    });
  });
    watchTrailerBtn.addEventListener('click', () => {
    youtubePlayer.src = "https://www.youtube.com/embed/uUo5gnaYB_w?autoplay=1";
    backdropOverlay.classList.remove('hidden');
    trailerContainer.classList.remove('hidden');
  });

  closeTrailerBtn.addEventListener('click', () => {
    youtubePlayer.src = ""; // Stop the video
    backdropOverlay.classList.add('hidden');
    trailerContainer.classList.add('hidden');
  });

// Stats animation with enhanced effects
document.querySelectorAll('.stat-number').forEach((stat, index) => {
const target = parseInt(stat.dataset.target);

// Animate number using a standalone object
  const counter = { val: 0 };
    gsap.to(counter, {
    val: target,
    duration: 2,
    delay: index * 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: stat,
      start: "top 80%",
    },
    onUpdate: () => {
      stat.textContent = Math.floor(counter.val);
    }
  });

// Animate the progress bar
  const progressBar = stat.parentElement.querySelector('.stat-progress');
  if (progressBar) {
    gsap.fromTo(progressBar, 
      { scaleX: 0 }, 
      {
        scaleX: 1,
        duration: 1.5,
        delay: index * 0.2,
        ease: "power2.out",
        transformOrigin: "left",
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
        }
      }
    );
  }
});

  // gsap.from(".stat-item", {
  //   y: 80,
  //   opacity: 0,
  //   duration: 1,
  //   stagger: 0.15,
  //   ease: "back.out(1.7)",
  //   scrollTrigger: {
  //     trigger: "#franchisesStats",
  //     start: "top 80%",
  //     end: "bottom 20%",
  //     toggleActions: "play none none reverse"
  //   }
  // });

  // // Animate stat numbers with counter effect
  // document.querySelectorAll('.stat-number').forEach((stat, index) => {
  //   const target = parseInt(stat.dataset.target);
    
  //   gsap.from(stat, {
  //     textContent: 0,
  //     duration: 2,
  //     delay: index * 0.2,
  //     ease: "power2.out",
  //     snap: { textContent: 1 },
  //     scrollTrigger: {
  //       trigger: stat,
  //       start: "top 80%",
  //     },
  //     onUpdate: function() {
  //       stat.textContent = Math.floor(this.targets()[0].textContent);
  //     }
  //   });

  //   // Animate progress bars
  //   const progressBar = stat.parentElement.querySelector('.stat-progress');
  //   if (progressBar) {
  //     gsap.from(progressBar, {
  //       scaleX: 0,
  //       duration: 1.5,
  //       delay: index * 0.2,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: stat,
  //         start: "top 80%",
  //       }
  //     });
  //   }
  // });


  // Filter buttons animation
  gsap.from(".filter-btn", {
    y: 30,
    opacity: 1,
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
    opacity: 1,
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

document.addEventListener("click", function (e) {
  if (e.target.matches(".btn-card-primary")) {
    const playUrl = e.target.getAttribute("data-play");
    if (playUrl) window.open(playUrl, "_blank");
  }

  if (e.target.matches(".btn-card-secondary")) {
    const learnUrl = e.target.getAttribute("data-learn");
    if (learnUrl) window.open(learnUrl, "_blank");
  }
});




// ad-on fnc of the animation page
// function initializeFranchiseInteractions() {
  // Filter functionality
//   const filterBtns = document.querySelectorAll('.filter-btn');
//   const cards = document.querySelectorAll('.franchise-card');

//   filterBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       const filter = btn.dataset.filter;
      
//       // Update active button
//       filterBtns.forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');
      
//       // Filter cards with animation
//       cards.forEach(card => {
//         const shouldShow = filter === 'all' || card.dataset.status === filter;
        
//         if (shouldShow) {
//           gsap.to(card, {
//              autoAlpha: 1,
//             scale: 1,
//             duration: 0.5,
//             ease: "back.out(1.7)",
//             onStart: () => gsap.set(card, { display: 'block' })
//           });
//           // card.style.display = 'block';
          

//         } else {
//           gsap.to(card, {
//             autoAlpha: 0,
//             scale: 0.8,
//             duration: 0.3,
//             ease: "power2.in",
//             onComplete: () => gsap.set(card, { display: 'none' })
//               // card.style.display = 'none';
//         });
//         }
//       });
//     });
//   });

//   // Card hover effects
//   cards.forEach(card => {
//     const hoverEffect = card.querySelector('.card-hover-effect');
    
//     card.addEventListener('mouseenter', () => {
//       if (hoverEffect) {
//         gsap.to(hoverEffect, {
//           opacity: 1,
//           duration: 0.3,
//         });
//       }
//       gsap.to(card, {
//         y: -10,
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     });

//     card.addEventListener('mouseleave', () => {
//       if (hoverEffect) {
//         gsap.to(hoverEffect, {
//           opacity: 0,
//           duration: 0.3
//         });
//       }
//       gsap.to(card, {
//         y: 0,
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     });
//   });
// }
// function initializeFranchiseInteractions() {
//   const filterBtns = document.querySelectorAll('.filter-btn');
//   const cards = document.querySelectorAll('.franchise-card');

//   const hoverSound = new Audio('hover.mp3'); // replace with correct path

//   // FILTER LOGIC
//   filterBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       const filter = btn.dataset.filter;

//       filterBtns.forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');

//       cards.forEach(card => {
//         const shouldShow = filter === 'all' || card.dataset.status === filter;

//         if (shouldShow) {
//           card.style.display = 'block';
//           gsap.fromTo(card, {
//             autoAlpha: 0,
//             scale: 0.8
//           }, {
//             autoAlpha: 1,
//             scale: 1,
//             duration: 0.4,
//             ease: "back.out(1.7)"
//           });
//         } else {
//           gsap.to(card, {
//             autoAlpha: 0,
//             scale: 0.8,
//             duration: 0.3,
//             ease: "power2.in",
//             onComplete: () => {
//               card.style.display = 'none';
//             }
//           });
//         }
//       });
//     });
//   });



// // Detect if the device supports hover
// // const canHover = window.matchMedia('(hover: hover)').matches;

// cards.forEach(card => {
//   const hoverEffect = card.querySelector('.card-hover-effect');
//   const image = card.querySelector('.card-bg-image');
//   const title = card.querySelector('.card-title');
//   const subtitle = card.querySelector('.card-subtitle');
//   const description = card.querySelector('.card-description');
//   const features = card.querySelectorAll('.feature-tag');
//   const revealElements = [title, subtitle, description, ...features];

//   // Desktop hover effects
//   card.addEventListener('mousemove', (e) => {
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;
//     const rotateY = (x - centerX) / 10;
//     const rotateX = -(y - centerY) / 10;
//     gsap.to(card, {
//       rotationY: rotateY,
//       rotationX: rotateX,
//       transformPerspective: 600,
//       transformOrigin: "center",
//       duration: 0.3
//     });
//   });

//   card.addEventListener('mouseenter', () => {
//     hoverSound.currentTime = 0;
//     hoverSound.play();

//     gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
//     card.classList.add('glow-border');

//     if (hoverEffect) {
//       gsap.to(hoverEffect, { opacity: 1, duration: 0.3 });
//     }

//     if (image) {
//       gsap.to(image, { scale: 1.08, duration: 0.3 });
//     }

//     gsap.fromTo(revealElements, {
//       y: 20,
//       opacity: 0
//     }, {
//       y: 0,
//       opacity: 1,
//       duration: 0.5,
//       stagger: 0.05,
//       ease: "power2.out"
//     });
//   });

//   card.addEventListener('mouseleave', () => {
//     gsap.to(card, {
//       y: 0,
//       rotationX: 0,
//       rotationY: 0,
//       duration: 0.3,
//       ease: "power2.out"
//     });

//     card.classList.remove('glow-border');

//     if (hoverEffect) {
//       gsap.to(hoverEffect, { opacity: 0, duration: 0.3 });
//     }

//     if (image) {
//       gsap.to(image, { scale: 1, duration: 0.3 });
//     }
//   });

//   // Mobile scroll-based animation using IntersectionObserver
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting && window.innerWidth < 1024)
//  {
//         hoverSound.currentTime = 0;
//         hoverSound.play();

//         gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
//         card.classList.add('glow-border');
//         if (hoverEffect) gsap.to(hoverEffect, { opacity: 1, duration: 0.3 });
//         if (image) gsap.to(image, { scale: 1.08, duration: 0.3 });

//         gsap.fromTo(revealElements, {
//           y: 20,
//           opacity: 0
//         }, {
//           y: 0,
//           opacity: 1,
//           duration: 0.5,
//           stagger: 0.05,
//           ease: "power2.out"
//         });
//       } else if (window.innerWidth < 1024)
//  {
//         gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
//         card.classList.remove('glow-border');
//         if (hoverEffect) gsap.to(hoverEffect, { opacity: 0, duration: 0.3 });
//         if (image) gsap.to(image, { scale: 1, duration: 0.3 });
//       }
//     });
//   }, { threshold: 0.3 });

//   observer.observe(card);
// });


// }

function initializeFranchiseInteractions() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.franchise-card');
  const hoverSound = new Audio('hover.mp3'); // Make sure the path is correct

  // FILTERING LOGIC
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const shouldShow = filter === 'all' || card.dataset.status === filter;

        if (shouldShow) {
          card.style.display = 'block';
          gsap.fromTo(card, {
            autoAlpha: 0,
            scale: 0.8
          }, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        } else {
          gsap.to(card, {
            autoAlpha: 0,
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

  // Detect if the device supports hover (like desktop) or not (like mobile/tablet)
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  cards.forEach(card => {
    const hoverEffect = card.querySelector('.card-hover-effect');
    const image = card.querySelector('.card-bg-image');
    const title = card.querySelector('.card-title');
    const subtitle = card.querySelector('.card-subtitle');
    const description = card.querySelector('.card-description');
    const features = card.querySelectorAll('.feature-tag');
    const revealElements = [title, subtitle, description, ...features];

    // DESKTOP: Hover interactions
    if (!isTouchDevice) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = (x - centerX) / 10;
        const rotateX = -(y - centerY) / 10;
        gsap.to(card, {
          rotationY: rotateY,
          rotationX: rotateX,
          transformPerspective: 600,
          transformOrigin: "center",
          duration: 0.3
        });
      });

      card.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();

        gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
        card.classList.add('glow-border');
        if (hoverEffect) gsap.to(hoverEffect, { opacity: 1, duration: 0.3 });
        if (image) gsap.to(image, { scale: 1.08, duration: 0.3 });

        gsap.fromTo(revealElements, {
          y: 20,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out"
        });

        card.classList.remove('glow-border');
        if (hoverEffect) gsap.to(hoverEffect, { opacity: 0, duration: 0.3 });
        if (image) gsap.to(image, { scale: 1, duration: 0.3 });
      });
    }
// MOBILE/TABLET: Scroll-based animation using IntersectionObserver
    if (isTouchDevice) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            hoverSound.currentTime = 0;
            hoverSound.play();

            gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
            card.classList.add('glow-border');
            if (hoverEffect) gsap.to(hoverEffect, { opacity: 1, duration: 0.3 });
            if (image) gsap.to(image, { scale: 1.08, duration: 0.3 });

            gsap.fromTo(revealElements, {
              y: 20,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out"
            });
          } else {
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
            card.classList.remove('glow-border');
            if (hoverEffect) gsap.to(hoverEffect, { opacity: 0, duration: 0.3 });
            if (image) gsap.to(image, { scale: 1, duration: 0.3 });
          }
        });
      }, { threshold: 0.3 });

      observer.observe(card);
    }
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

// Codes for Update Page.
function getUpdates() {
  return `
  
  <div id="updates_page">
    <div class="top_photo">
         <div class="top_image"> <img src="./images/Updates/BO6-S04-1.jpg" alt="top poster"></div>
         
    </div>

    <div class="top_para">
        <div class="tp">Black Ops 6 Season 04<br/>Patch Notes</div>
        <div class="t_button">BO6</div>
        <div class="days">12 DAYS AGO</div>

    </div>

    <div class="main_news_title">NEWS</div>

         
     <div class="news-cards">
  <div class="news-card">
    <div class="card-image-container">
      <img src="./images/Updates/WZ-PATCHNOTES.jpg" alt="nphoto" class="card-image" />
      <div class="card-overlay"></div>
    </div>
    <div class="card-content">
      <div class="news_title">Call of Duty: Warzone Season 04 Reloaded Patch Notes</div>
      <div class="category-btn">WZ</div>
      <div class="ndays">12 DAYS AGO</div>
    </div>
  </div>

  <div class="news-card">
    <div class="card-image-container">
      <img src="./images/Updates/ZM-GG.jpg" alt="nphoto" class="card-image" />
      <div class="card-overlay"></div>
    </div>
    <div class="card-content">
      <div class="news_title">Round Based Zombies — GobbleGums</div>
      <div class="category-btn">BO6</div>
      <div class="ndays">12 DAYS AGO</div>
    </div>
  </div>

  <div class="news-card">
    <div class="card-image-container">
      <img src="./images/Updates/MAPS-FRINGE.jpg" alt="nphoto" class="card-image" />
      <div class="card-overlay"></div>
    </div>
    <div class="card-content">
      <div class="news_title">Multiplayer Map Guide — Fringe</div>
      <div class="category-btn">BO6</div>
      <div class="ndays">12 DAYS AGO</div>
    </div>
  </div>

  <div class="news-card">
    <div class="card-image-container">
      <img src="./images/Updates/MAPS-ECLIPSE.jpg" alt="nphoto" class="card-image" />
      <div class="card-overlay"></div>
    </div>
    <div class="card-content">
      <div class="news_title">Multiplayer Map Guide — Eclipse</div>
      <div class="category-btn">BO6</div>
      <div class="ndays">12 DAYS AGO</div>
    </div>
  </div>

  <div class="news-card">
    <div class="card-image-container">
      <img src="./images/Updates/CODM-RAJ.jpg" alt="nphoto" class="card-image" />
      <div class="card-overlay"></div>
    </div>
    <div class="card-content">
      <div class="news_title">Call of Duty: Mobile x Ronald Acuña Jr.</div>
      <div class="category-btn">CODM</div>
      <div class="ndays">12 DAYS AGO</div>
    </div>
  </div>

  <div class="news-card">
    <div class="card-image-container">
      <img src="./images/Updates/CODM-S6-ANNOUNCE.jpg" alt="nphoto" class="card-image" />
      <div class="card-overlay"></div>
    </div>
    <div class="card-content">
      <div class="news_title">Introducing CODM: S6 — Gundams Arrive</div>
      <div class="category-btn">CODM</div>
      <div class="ndays">12 DAYS AGO</div>
    </div>
  </div>
</div>

<div class="more-news-container">
  <div class="more_news">GET MORE NEWS</div>
</div>



    <div class="game_pass">
        <div class="xbox_logo">
         <img src="./logos/Xbox-logo.png" alt="no image"> 
        <h1> xbox <br/> <span>game</span> pass</h1>
         </div>
        <div class="xbox_line">Play Call of Duty: Black Ops 6 on console, PC and cloud with Xbox Game Pass.</div>
      
        <div class="xbox_button"><h1>Join Now</h1></div>
    </div>

    <div class="game_title">GET THE GAME</div>

      <div class="game_cards">
         <div class="game_card1">
             <div class="game_image"><img src="./images/Updates/bo6-1.jpg" alt="404 not found"></div>
            <div class="small_font">CALL OF DUTY</div>
            <div class="big_font">BLACK OPS 6</div>
            <div class="glogo"> <img src="./logos/Xbox-logo.png" alt="404 not found"></div> 
            <div class="glogo"> <img src="./logos/Playstation-Logo.png" alt="404 not found"></div>
            <div class="glogo"> <img src="./logos/Steam-Logo.png" alt="404 not found"></div>
                    <!-- check for glogo if it causes conflicts or not, if u use same class name -->
        </div> 
        <div class="game_card2">
            <div class="game_image"><img src="./images/Updates/mw3-4.png" alt="404 not found"></div>
            <div class="small_font">CALL OF DUTY</div>
            <div class="big_font">MODERN WARFARE III</div>
            <div class="glogo"> <img src="./logos/Xbox-logo.png" alt="404 not found"></div> 
            <div class="glogo"> <img src="./logos/Playstation-Logo.png" alt="404 not found"></div>
            <div class="glogo"> <img src="./logos/Steam-Logo.png" alt="404 not found"></div>

       </div>
            <div class="game_card3">
            <div class="game_image"><img src="./images/Updates/cod-warzone.jpg" alt="404 not found"></div>
            <div class="small_font">CALL OF DUTY</div>
            <div class="big_font">Warzone</div>
            <div class="glogo"> <img src="./logos/Xbox-logo.png" alt="404 not found"></div> 
            <div class="glogo"> <img src="./logos/Playstation-Logo.png" alt="404 not found"></div>
            <div class="glogo"> <img src="./logos/Steam-Logo.png" alt="404 not found"></div>

       </div>
            <div class="game_card4">
            <div class="game_image"><img src="./images/Updates/CODM2.jpg" alt="404 not found"></div>
            <div class="small_font">CALL OF DUTY</div>
            <div class="big_font">MOBILE</div>
            <div class="glogo"> <img src="./logos/Xbox-logo.png" alt="404 not found"></div> 
            <div class="glogo"> <img src="./logos/Playstation-Logo.png" alt="404 not found"></div>
            <div class="glogo"> <img src="./logos/Steam-Logo.png" alt="404 not found"></div>

        </div>
         
    </div>

    <div class="more_games">SEE MORE IN THE STORE</div>
    
  
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
  

  `
}
// Function for animation for update page.
// Main animation function
function getUpdatesAnimation() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    // Hero image scale animation
    heroTimeline.from('.top_image img', {
        scale: 1.3,
        duration: 2.5,
        ease: 'power2.out'
    });

    // Hero content staggered animation
    heroTimeline.from('.top_para > div', {
        y: 100,
        opacity: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: 'power3.out'
    }, '-=2');
  

gsap.fromTo(
  ".main_news_title",
  {
    clipPath: "inset(100% 0 0 0)",
    y: 80,
    opacity: 0,
  },
  {
    clipPath: "inset(0% 0 0 0)",
    y: -10,
    opacity: 1,
    duration: 2.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".main_news_title",
      start: "top 90%",
      toggleActions: "play none none reverse",
    }
  }
);


  // Animate news cards on scroll into view
gsap.utils.toArray(".news-card").forEach((card, index) => {
  gsap.fromTo(
    card,
    { y: 50, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      delay: index * 0.15,
    }
  );
});

gsap.fromTo(
  ".game_pass",
  {
    opacity: 0,
    y: 80,
    scale: 0.95,
    rotateX: 8,
    filter: "blur(10px)",
    boxShadow: "0 30px 60px rgba(16,124,16,0.07)"
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    boxShadow: "0 18px 44px rgba(16,124,16,0.29)",
    duration: 1.5,
    ease: "expo.out",
    scrollTrigger: {
      trigger: ".game_pass",
      start: "top 85%",
      toggleActions: "play none none reverse",
      // markers: true, // Uncomment for debugging
    }
  }
);

  // gsap.from('.game_pass', {
  //   y: 50,
  //   opacity: 0,
  //   duration: 1.2,
  //   ease: 'power3.out',
  //   scrollTrigger: {
  //     trigger: '.game_pass',
  //     start: 'top 90%',
  //     toggleActions: 'play none none reverse'
  //   }
  // });

  // Animate game title reveal
  gsap.fromTo('.game_title', {
    clipPath: 'inset(100% 0 0 0)',
    opacity: 0
  }, {
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.game_title',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });

  // Animate each game card on scroll
  gsap.utils.toArray('.game_cards > div').forEach((card, i) => {
    gsap.fromTo(card, {
      y: 100,
      opacity: 0,
      scale: 0.95,
      rotateX: 10,
      rotateY: -10
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 1.5,
      ease: 'back.out(1.3)',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: i * 0.15
    });
  });

  // Parallax effect on game card images
  gsap.utils.toArray('.game_image img').forEach((img) => {
    gsap.fromTo(img, {
      yPercent: -20
    }, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('div[class^="game_card"]'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });

  // Animate "More Games" button/text on scroll
  gsap.fromTo(
  ".more-news-container",
  { y: 60, opacity: 0, scale: 0.95 },
  { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    duration: 1.4,
    ease: "back.out(1.7)",  // subtle bounce easing
    scrollTrigger: {
      trigger: ".more-news-container",
      start: "top 90%",
      toggleActions: "play none none reverse",
    }
  }
);


  gsap.from('.more_games', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.more_games',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });

}

function initializeUpdatesInteractions() {
    // Enhanced news card hover effects
    document.querySelectorAll('.news-card').forEach((card) => {
        const image = card.querySelector('.card-image');
        const overlay = card.querySelector('.card-overlay');
        const content = card.querySelector('.card-content');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(image, { 
                scale: 1.15, 
                rotation: 2,
                duration: 0.8, 
                ease: 'power2.out' 
            });
            gsap.to(overlay, { 
                opacity: 1, 
                duration: 0.5 
            });
            gsap.to(card, { 
                y: -20, 
                rotateX: 8,
                rotateY: 5,
                boxShadow: '0 30px 60px rgba(255, 87, 51, 0.4)',
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(content, {
                y: -5,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(image, { 
                scale: 1, 
                rotation: 0,
                duration: 0.8, 
                ease: 'power2.out' 
            });
            gsap.to(overlay, { 
                opacity: 0, 
                duration: 0.5 
            });
            gsap.to(card, { 
                y: 0, 
                rotateX: 0,
                rotateY: 0,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(content, {
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        // Click animation
        card.addEventListener('click', () => {
            gsap.to(card, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });

  
 // Animate Game Pass container
  gsap.from(".game_pass", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".game_pass",
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });

  // Animate game title reveal
  gsap.fromTo(
    ".game_title",
    { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    {
      clipPath: "inset(0% 0 0 0)",
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".game_title",
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Animate each game card
  gsap.utils.toArray(".game_cards > div").forEach((card, i) => {
    gsap.fromTo(
      card,
      { y: 100, opacity: 0, scale: 0.95, rotateX: 10, rotateY: -10 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 1.5,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        delay: i * 0.15
      }
    );
  });

  // Parallax for game card images
  gsap.utils.toArray(".game_image img").forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -20 },
      {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest("div[class^='game_card']"),
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      }
    );
  });

  // Animate "More Games" button/text
  gsap.from(".more_games", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".more_games",
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });
}