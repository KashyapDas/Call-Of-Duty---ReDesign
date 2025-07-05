// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Enhanced Franchise data with more details
const franchiseData = [
  {
    title: "Modern Warfare",
    subtitle: "Tactical Combat Redefined",
    description: "Experience the most realistic and intense warfare with cutting-edge graphics and immersive gameplay that pushes the boundaries of modern combat simulation.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
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
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
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
    image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg",
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
    image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
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
    image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg",
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
    image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg",
    year: "2008",
    status: "Legacy",
    players: "200M+",
    rating: "9.3",
    category: "Survival Horror",
    features: ["Co-op Mode", "Easter Eggs", "Storyline"]
  }
];

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  generateFranchiseCards();
  generateTimeline();
  initializeFranchiseAnimations();
  initializeFranchiseInteractions();
});

// Generate franchise cards dynamically
function generateFranchiseCards() {
  const container = document.getElementById('franchiseCardsContainer');
  
  const cardsHTML = franchiseData.map((franchise, index) => `
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
  `).join('');
  
  container.innerHTML = cardsHTML;
}

// Generate timeline dynamically
function generateTimeline() {
  const container = document.getElementById('timelineContainer');
  const timelineHTML = franchiseData.map((franchise, index) => `
    <div class="timeline-item" data-year="${franchise.year}">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="timeline-year">${franchise.year}</div>
        <h3>${franchise.title}</h3>
        <p>${franchise.subtitle}</p>
      </div>
    </div>
  `).join('');
  
  // Insert timeline items after the timeline line
  container.innerHTML += timelineHTML;
}

// Initialize all animations
function initializeFranchiseAnimations() {
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

// Initialize interactive features
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

  // Button click handlers (you can customize these)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-hero-primary')) {
      console.log('Explore All Games clicked');
    }
    
    if (e.target.classList.contains('btn-hero-secondary')) {
      console.log('Watch Trailer clicked');
    }
    
    if (e.target.classList.contains('btn-card-primary')) {
      console.log('Play Now clicked');
    }
    
    if (e.target.classList.contains('btn-card-secondary')) {
      console.log('Learn More clicked');
    }
    
    if (e.target.classList.contains('btn-showcase-primary')) {
      console.log('Experience Now clicked');
    }
    
    if (e.target.classList.contains('btn-showcase-secondary')) {
      console.log('Watch Gameplay clicked');
    }
  });
}