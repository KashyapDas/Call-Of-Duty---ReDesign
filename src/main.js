const links = document.querySelectorAll(".link");
const mainContent = document.querySelector("#contentPage");
// Default page loaded on the website load for the 1st time
document.addEventListener("DOMContentLoaded",()=>{
    // first time render the Home page
    mainContent.innerHTML = `<div id="heading1">
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
    <img src="./images/image1.jpg" />
    <img src="./images/image2.jpg" />
    <img src="./images/image3.jpg" />
    <img src="./images/image4.jpg" />
    <img src="./images/image5.jpg" />
    <img src="./images/image6.jpg" />
    <img src="./images/image7.jpg" />
    <img src="./images/image8.jpg" />

    <!-- Duplicated for seamless loop -->
    <img src="./images/image1.jpg" />
    <img src="./images/image2.jpg" />
    <img src="./images/image3.jpg" />
    <img src="./images/image4.jpg" />
    <img src="./images/image5.jpg" />
    <img src="./images/image6.jpg" />
    <img src="./images/image7.jpg" />
    <img src="./images/image8.jpg" />
            </div>
         </div>
         <div class="scroll">
            <div class="scroll-track2">
    <img src="./images/image1.jpg" />
    <img src="./images/image2.jpg" />
    <img src="./images/image3.jpg" />
    <img src="./images/image4.jpg" />
    <img src="./images/image5.jpg" />
    <img src="./images/image6.jpg" />
    <img src="./images/image7.jpg" />
    <img src="./images/image8.jpg" />

    <!-- Duplicated for seamless loop -->
    <img src="./images/image1.jpg" />
    <img src="./images/image2.jpg" />
    <img src="./images/image3.jpg" />
    <img src="./images/image4.jpg" />
    <img src="./images/image5.jpg" />
    <img src="./images/image6.jpg" />
    <img src="./images/image7.jpg" />
    <img src="./images/image8.jpg" />
            </div>
         </div>`
})

async function animatePages() {
  return Promise.all([
    gsap.to("#animate1 div", {
      height: "100%",
      duration: 0.3,
      stagger: 0.1,
      onStart : ()=>{
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
      }
    }).then(),

    gsap.to("#animate2 div", {
      height: "100%",
      duration: 0.3,
      stagger: 0.1
    }).then()
  ]);
}

async function animateOutPages() {
  return Promise.all([
    gsap.to("#animate1 div", {
      height: "0%",
      duration: 0.3,
      stagger: 0.1
    }).then(),

    gsap.to("#animate2 div", {
      height: "0%",
      duration: 0.3,
      stagger: 0.1,
    }).then(),
  ]);
  
}


links.forEach((tab)=>{
    tab.addEventListener("click",async (dets)=>{
        dets.preventDefault();
        // Add the gsap animation start here and await it 
        await animatePages();
        // Content get chnaged according to the links
        if(tab.textContent === "Home"){
            mainContent.innerHTML = `<div id="heading1">
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
    <img src="./images/image1.jpg" />
    <img src="./images/image2.jpg" />
    <img src="./images/image3.jpg" />
    <img src="./images/image4.jpg" />
    <img src="./images/image5.jpg" />
    <img src="./images/image6.jpg" />
    <img src="./images/image7.jpg" />
    <img src="./images/image8.jpg" />

    <!-- Duplicated for seamless loop -->
    <img src="./images/image1.jpg" />
    <img src="./images/image2.jpg" />
    <img src="./images/image3.jpg" />
    <img src="./images/image4.jpg" />
    <img src="./images/image5.jpg" />
    <img src="./images/image6.jpg" />
    <img src="./images/image7.jpg" />
    <img src="./images/image8.jpg" />
            </div>
         </div>
         <div class="scroll">
            <div class="scroll-track2">
    <img src="./images/image1.jpg" />
    <img src="./images/image2.jpg" />
    <img src="./images/image3.jpg" />
    <img src="./images/image4.jpg" />
    <img src="./images/image5.jpg" />
    <img src="./images/image6.jpg" />
    <img src="./images/image7.jpg" />
    <img src="./images/image8.jpg" />

    <!-- Duplicated for seamless loop -->
    <img src="./images/image1.jpg" />
    <img src="./images/image2.jpg" />
    <img src="./images/image3.jpg" />
    <img src="./images/image4.jpg" />
    <img src="./images/image5.jpg" />
    <img src="./images/image6.jpg" />
    <img src="./images/image7.jpg" />
    <img src="./images/image8.jpg" />
            </div>
         </div>`
        }
        else if(tab.textContent === "Franchises"){
            mainContent.innerHTML = `<div id="hero">
        <h1>Franchises</h1>
      </div>`
        }
        else if(tab.textContent === "Updates"){
            mainContent.innerHTML = `<div id="hero">
        <h1>Updates</h1>
      </div>`
        }
        else if(tab.textContent === "Soldiers"){
            mainContent.innerHTML = `<div id="hero">
        <h1>Soldiers</h1>
      </div>`
        }
        else{
            // dynamic creation of not found page...and push to the html (not implemented yet)
        }
        await new Promise(r=>setTimeout(r,500));
        // Add the gsap animation of end here and await it
        await animateOutPages();
        document.getElementsByTagName("body")[0].style.overflowY = "visible"
    })
})
