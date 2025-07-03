gsap.registerPlugin(ScrollTrigger);

// 🔧 Set scroll container globally
ScrollTrigger.defaults({
  scroller: "#contentPage"
});

const links = document.querySelectorAll(".link");
const mainContent = document.querySelector("#contentPage");

// Load default Home page on first render
document.addEventListener("DOMContentLoaded", () => {
  mainContent.innerHTML = getHomeHTML();
  initializeScrollAnimation();
});

// Handle navigation clicks
links.forEach((tab) => {
  tab.addEventListener("click", async (e) => {
    e.preventDefault();
    await animatePages();

    if (tab.textContent === "Home") {
      mainContent.innerHTML = getHomeHTML();
      initializeScrollAnimation();
    } else if (tab.textContent === "Franchises") {
      mainContent.innerHTML = `<h1 id="franchises">Franchises</h1>`;
    } else if (tab.textContent === "Updates") {
      mainContent.innerHTML = `<div id="hero"><h1>Updates</h1></div>`;
    } else if (tab.textContent === "Soldiers") {
      mainContent.innerHTML = `<div id="hero"><h1>Soldiers</h1></div>`;
    }

    await new Promise((r) => setTimeout(r, 500));
    await animateOutPages();
    document.body.style.overflowY = "visible";
  });
});

// Animate page-in transition
async function animatePages() {
  return Promise.all([
    gsap.to("#animate1 div", {
      height: "100%",
      duration: 0.3,
      stagger: 0.1,
      onStart: () => (document.body.style.overflowY = "hidden")
    }),
    gsap.to("#animate2 div", {
      height: "100%",
      duration: 0.3,
      stagger: 0.1
    })
  ]);
}

// Animate page-out transition
async function animateOutPages() {
  return Promise.all([
    gsap.to("#animate1 div", {
      height: "0%",
      duration: 0.3,
      stagger: 0.1
    }),
    gsap.to("#animate2 div", {
      height: "0%",
      duration: 0.3,
      stagger: 0.1
    })
  ]);
}

// Frame-based scroll animation
function initializeScrollAnimation() {
  const canvas = document.getElementById("canvasImage");
  const contentPage = document.getElementById("contentPage");

  if (!canvas || !contentPage) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const framesValues = {
    currentIndex: 1,
    maxIndex: 1128
  };

  const images = [];
  let loadedImages = 0;

  function preloadImages() {
    for (let i = 1; i <= framesValues.maxIndex; i++) {
      const img = new Image();
      img.src = `./frame/frame_${i.toString().padStart(4, "0")}.jpeg`;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === framesValues.maxIndex) {
          drawImage(framesValues.currentIndex);
          setupScrollTrigger();
          ScrollTrigger.refresh();
        }
      };
      images.push(img);
    }
  }

  function drawImage(index) {
    const img = images[index - 1];
    if (!img) return;

    const scaleX = window.innerWidth / img.width;
    const scaleY = window.innerHeight / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (window.innerWidth - newWidth) / 2;
    const offsetY = (window.innerHeight - newHeight) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  }

  function setupScrollTrigger() {
    const scrollDuration = framesValues.maxIndex * 4.5; // Adjust per frame

    let lastFrame = -1;

    gsap.to(framesValues, {
      currentIndex: framesValues.maxIndex,
      ease: "none",
      scrollTrigger: {
        trigger: "#storyWrapper",
        start: "top top",
        end: `+=${scrollDuration}`,
        scrub: 0.5,
        pin: "#storyWrapper",
        pinType: "transform",
        anticipatePin: 1
      },
      onUpdate: () => {
        const frame = Math.floor(framesValues.currentIndex);
        if (frame !== lastFrame) {
          drawImage(frame);
          lastFrame = frame;
        }
      }
    });
  }

  preloadImages();
}

// Home page content with frame animation
function getHomeHTML() {
  return `
    <div id="heading1">
      <h1>Call of duty</h1>
      <h1>SQUAD READY.</h1>
      <h1>LET’S GO</h1>
    </div>
    <div id="subheading">
      <h1 id="homeBtn"><u>Fresh Loadouts</u></h1>
      <h1 id="allMission">All Missions</h1>
    </div>
    <div class="scroll">
      <div class="scroll-track1">
        ${[...Array(8)].map((_, i) => `<img src="./images/image${i + 1}.jpg"/>`).join("\n")}
        ${[...Array(8)].map((_, i) => `<img src="./images/image${i + 1}.jpg"/>`).join("\n")}
      </div>
    </div>
    <div class="scroll">
      <div class="scroll-track2">
        ${[...Array(8)].map((_, i) => `<img src="./images/image${i + 1}.jpg"/>`).join("\n")}
        ${[...Array(8)].map((_, i) => `<img src="./images/image${i + 1}.jpg"/>`).join("\n")}
      </div>
    </div>

    <!-- Frame animation pinned section -->
    <div id="storyWrapper">
      <div id="storyTelling">
        <canvas id="canvasImage"></canvas>
      </div>
    </div>

    <div id="page1">Page 1</div>
  `;
}
