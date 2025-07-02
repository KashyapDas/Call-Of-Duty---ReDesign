const links = document.querySelectorAll(".link");
const mainContent = document.querySelector("#contentPage");
// Default page loaded on the website load for the 1st time
document.addEventListener("DOMContentLoaded",()=>{
    // first time render the Home page
    mainContent.innerHTML = `<div id="hero">
        <h1>Home</h1>
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

function animateOutPages() {
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
            mainContent.innerHTML = `<div id="hero">
        <h1>Home</h1>
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
