const links = document.querySelectorAll(".link");
const mainContent = document.querySelector("#contentPage");


document.addEventListener("DOMContentLoaded",()=>{
    // first time render the Home page
    mainContent.innerHTML = `<div id="hero">
        <h1>Home</h1>
      </div>`
})

links.forEach((tab)=>{
    tab.addEventListener("click",async (dets)=>{

        // Add the gsap animation start here and await it 

        if(tab.textContent === "Home"){
            mainContent.innerHTML = `<div id="hero">
        <h1>Home</h1>
      </div>`
        }
        else if(tab.textContent === "About"){
            mainContent.innerHTML = `<div id="hero">
        <h1>About</h1>
      </div>`
        }
        else if(tab.textContent === "Contact"){
            mainContent.innerHTML = `<div id="hero">
        <h1>Contact</h1>
      </div>`
        }
        else{
            // dynamic creation of not found page...and push to the html (not implemented yet)
        }

        // Add the gsap animation of end here and await it
        
    })
})
