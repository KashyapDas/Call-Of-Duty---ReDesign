// register the scrollTrigger
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  scroller: "#contentPage",
});

// global fecthing
const links = document.querySelectorAll(".link");
const mainContent = document.querySelector("#contentPage");
const Renderimages = [
  {
    imgSrc: "./images/pic1.jpg",
    action: false,
    top: "10%",
    left: "10%",
    rotate: "-25deg",
  },
  {
    imgSrc: "./images/pic2.jpg",
    action: false,
    top: "10%",
    left: "80%",
    rotate: "25deg",
  },
];
// default content loaded when the html render
document.addEventListener("DOMContentLoaded", () => {
  mainContent.innerHTML = getHomeHTML();
  // Defer init to next frame to avoid layout shift
  requestAnimationFrame(() => initializeScrollAnimation());
});

// page transition with the dynamic content pushing based on the navbar links
links.forEach((tab) => {
  tab.addEventListener("click", async (e) => {
    e.preventDefault();
    await animatePages();

    if (tab.textContent === "Home") {
      mainContent.innerHTML = getHomeHTML();
      requestAnimationFrame(() => initializeScrollAnimation());
      gsap.to(".pic1",{
        opacity : 1,
        top : "8%",
        duration : 0.4,
        delay : 0.2,
        scrollTrigger : {
          trigger : "#contentPage",
          start : "top 80%",
          end : "top 20%",
          markers : true
        }
      })
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
// Page transition in aniamtion
async function animatePages() {
  return Promise.all([
    gsap.to("#animate1 div", {
      height: "100%",
      duration: 0.3,
      stagger: 0.1,
      onStart: () => (document.body.style.overflowY = "hidden"),
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
  const canvas = document.getElementById("canvasImage");
  if (!canvas) return;

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
        if (i === 1) drawImage(1); // draw immediately
        if (++loadedImages === framesValues.maxIndex) {
          requestAnimationFrame(() => {
            setupScrollTrigger();
            ScrollTrigger.refresh();
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
      <h1>LET’S GO</h1>
    </div>
    <div id="subheading">
      <h1 id="homeBtn"><u>Fresh Loadouts</u></h1>
      <h1 id="allMission">All Missions</h1>
    </div>
    <div class="scroll">
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
    </div>
  `;
}


function triggerPicAnimation() {
  gsap.to(".pic1", {
    opacity: 1,
    top: "2%",
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger : {
      trigger : ".pic1",
      scroller : "#page1",
      start : "top 40%",
      end : "top 10%",
    }
  });

  gsap.to(".pic2", {
    opacity: 1,
    top: "8%",
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger : {
      trigger : ".pic2",
      scroller : "#page1",
      start : "top 40%",
      end : "top 10%",
    }
  });
}
