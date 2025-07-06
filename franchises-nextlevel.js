// Next Level Franchises JavaScript with Advanced Animations
// Using GSAP, ScrollTrigger, and Shery.js

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Enhanced franchise data with more details
const franchiseData = [
    {
        title: "Modern Warfare",
        subtitle: "Tactical Combat Redefined",
        description: "Experience the most realistic and intense warfare with cutting-edge graphics, advanced AI systems, and immersive gameplay that pushes the boundaries of modern combat simulation.",
        image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
        year: "2019",
        status: "Active",
        players: "75M+",
        rating: "9.4",
        category: "Tactical Shooter",
        features: ["4K Graphics", "Ray Tracing", "Cross-Platform", "AI Combat"]
    },
    {
        title: "Black Ops",
        subtitle: "Covert Operations",
        description: "Dive into the shadows of classified missions and uncover the truth behind global conspiracies in this thrilling espionage-focused franchise with deep storylines.",
        image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
        year: "2020",
        status: "Active",
        players: "60M+",
        rating: "9.2",
        category: "Action Thriller",
        features: ["Zombies Mode", "Campaign", "Multiplayer", "Storyline"]
    },
    {
        title: "Warzone",
        subtitle: "Battle Royale Evolution",
        description: "Drop into the ultimate battle royale experience with up to 150 players in massive combat zones featuring dynamic weather, destructible environments, and tactical gameplay.",
        image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg",
        year: "2020",
        status: "Live",
        players: "120M+",
        rating: "9.0",
        category: "Battle Royale",
        features: ["150 Players", "Free-to-Play", "Cross-Platform", "Live Events"]
    },
    {
        title: "Vanguard",
        subtitle: "WWII Reimagined",
        description: "Fight across multiple fronts in the most ambitious WWII Call of Duty experience ever created, featuring authentic historical campaigns and revolutionary destruction.",
        image: "https://images.pexels.com/photos/163064/pexels-photo-163064.jpeg",
        year: "2021",
        status: "Active",
        players: "45M+",
        rating: "8.8",
        category: "Historical Warfare",
        features: ["WWII Setting", "Destruction", "Champion Hill", "Historical"]
    },
    {
        title: "Mobile",
        subtitle: "Warfare On-The-Go",
        description: "Take the Call of Duty experience anywhere with console-quality gameplay optimized for mobile devices, featuring touch controls and mobile-specific features.",
        image: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg",
        year: "2019",
        status: "Live",
        players: "650M+",
        rating: "9.3",
        category: "Mobile Gaming",
        features: ["Mobile Optimized", "Touch Controls", "Battle Royale", "Events"]
    },
    {
        title: "Zombies",
        subtitle: "Undead Survival",
        description: "Survive waves of the undead in the most terrifying and challenging zombie experience with cooperative gameplay, mysterious storylines, and easter eggs.",
        image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg",
        year: "2008",
        status: "Legacy",
        players: "300M+",
        rating: "9.5",
        category: "Survival Horror",
        features: ["Co-op Mode", "Easter Eggs", "Storyline", "Survival"]
    },
    {
        title: "Warzone 2.0",
        subtitle: "Next-Gen Battle Royale",
        description: "The evolution of battle royale gaming with enhanced graphics, new mechanics, and revolutionary gameplay systems that redefine competitive gaming.",
        image: "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg",
        year: "2022",
        status: "Active",
        players: "80M+",
        rating: "9.1",
        category: "Battle Royale",
        features: ["Next-Gen", "Enhanced Graphics", "New Mechanics", "Competitive"]
    },
    {
        title: "MW2 Remastered",
        subtitle: "Classic Reimagined",
        description: "Experience the legendary campaign with stunning 4K visuals, enhanced textures, and improved lighting while maintaining the original's iconic gameplay.",
        image: "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg",
        year: "2020",
        status: "Legacy",
        players: "25M+",
        rating: "9.0",
        category: "Remaster",
        features: ["4K Visuals", "Enhanced Textures", "Classic Campaign", "Nostalgia"]
    }
];

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeLoading();
    initializeCursor();
    initializeSheryEffects();
    generateContent();
    initializeAnimations();
    initializeInteractions();
    initializeParticles();
});

// Loading screen with progress
function initializeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.loading-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                        startMainAnimations();
                    }
                });
            }, 500);
        }
        
        gsap.to(progressBar, {
            width: `${progress}%`,
            duration: 0.3,
            ease: "power2.out"
        });
    }, 100);
}

// Custom cursor with advanced effects
function initializeCursor() {
    const cursor = document.getElementById('customCursor');
    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorOutline = cursor.querySelector('.cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        gsap.to(cursorDot, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
    
    // Smooth follow for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        gsap.set(cursorOutline, {
            x: outlineX,
            y: outlineY
        });
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Cursor interactions
    document.addEventListener('mouseenter', () => {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
    });
    
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0, duration: 0.3 });
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, .franchise-card, .stat-card, .filter-tab');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, {
                scale: 1.5,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
    });
}

// Initialize Shery.js effects
function initializeSheryEffects() {
    // Initialize Shery
    Shery.imageEffect(".visual-container", {
        style: 5,
        config: {
            "a": {"value": 2, "range": [0, 30]},
            "b": {"value": 0.75, "range": [-1, 1]},
            "zindex": {"value": -9996999, "range": [-9999999, 9999999]},
            "aspect": {"value": 1},
            "ignoreShapeAspect": {"value": true},
            "shapePosition": {"value": {"x": 0, "y": 0}},
            "shapeScale": {"value": {"x": 0.5, "y": 0.5}},
            "shapeEdgeSoftness": {"value": 0, "range": [0, 0.5]},
            "shapeRadius": {"value": 0, "range": [0, 2]},
            "currentScroll": {"value": 0},
            "scrollLerp": {"value": 0.07},
            "gooey": {"value": true},
            "infiniteGooey": {"value": false},
            "growSize": {"value": 4, "range": [1, 15]},
            "durationOut": {"value": 1, "range": [0.1, 5]},
            "durationIn": {"value": 1.5, "range": [0.1, 5]},
            "displaceAmount": {"value": 0.5},
            "masker": {"value": true},
            "maskVal": {"value": 1.18, "range": [1, 5]},
            "scrollType": {"value": 0},
            "geoVertex": {"range": [1, 64], "value": 1},
            "noEffectGooey": {"value": true},
            "onMouse": {"value": 1},
            "noise_speed": {"value": 0.2, "range": [0, 10]},
            "metaball": {"value": 0.44, "range": [0, 2]},
            "discard_threshold": {"value": 0.5, "range": [0, 1]},
            "antialias_threshold": {"value": 0, "range": [0, 0.1]},
            "noise_height": {"value": 0.5, "range": [0, 2]},
            "noise_scale": {"value": 10, "range": [0, 100]}
        },
        gooey: true
    });

    // Text effects
    Shery.textAnimate(".hero-title .title-word", {
        style: 2,
        y: 80,
        delay: 0.1,
        duration: 2,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        multiplier: 0.1,
    });

    // Mouse follower for cards
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });

    // Magnetic effect for buttons
    Shery.makeMagnet(".btn-primary, .btn-secondary", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });
}

// Generate dynamic content
function generateContent() {
    generateFranchiseCards();
    generateTimelineItems();
}

// Generate franchise cards with advanced structure
function generateFranchiseCards() {
    const container = document.getElementById('cardsGrid');
    
    const cardsHTML = franchiseData.map((franchise, index) => `
        <div class="franchise-card" data-index="${index}" data-status="${franchise.status.toLowerCase()}" data-category="${franchise.category.toLowerCase().replace(' ', '-')}" data-shery="card">
            <div class="card-image">
                <img src="${franchise.image}" alt="${franchise.title}" loading="lazy">
                <div class="card-overlay"></div>
            </div>
            
            <div class="card-content">
                <div class="card-header">
                    <div class="card-status ${franchise.status.toLowerCase()}">${franchise.status}</div>
                    <div class="card-rating">
                        <span class="rating-star">★</span>
                        <span class="rating-value">${franchise.rating}</span>
                    </div>
                </div>
                
                <h3 class="card-title">${franchise.title}</h3>
                <h4 class="card-subtitle">${franchise.subtitle}</h4>
                <p class="card-description">${franchise.description}</p>
                
                <div class="card-stats">
                    <div class="card-stat">
                        <div class="card-stat-label">Players</div>
                        <div class="card-stat-value">${franchise.players}</div>
                    </div>
                    <div class="card-stat">
                        <div class="card-stat-label">Released</div>
                        <div class="card-stat-value">${franchise.year}</div>
                    </div>
                    <div class="card-stat">
                        <div class="card-stat-label">Rating</div>
                        <div class="card-stat-value">${franchise.rating}</div>
                    </div>
                </div>
                
                <div class="card-features">
                    ${franchise.features.map(feature => `
                        <span class="feature-tag">${feature}</span>
                    `).join('')}
                </div>
                
                <div class="card-actions">
                    <button class="card-btn card-btn-primary">Play Now</button>
                    <button class="card-btn card-btn-secondary">Learn More</button>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = cardsHTML;
}

// Generate timeline items
function generateTimelineItems() {
    const container = document.getElementById('timelineItems');
    
    const timelineHTML = franchiseData.map((franchise, index) => `
        <div class="timeline-item" data-year="${franchise.year}">
            <div class="timeline-marker"></div>
            <div class="timeline-card">
                <div class="timeline-year">${franchise.year}</div>
                <h3>${franchise.title}</h3>
                <p>${franchise.subtitle}</p>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = timelineHTML;
}

// Start main animations after loading
function startMainAnimations() {
    initializeHeroAnimations();
    initializeScrollAnimations();
    initializeStatsAnimations();
    initializeCardsAnimations();
    initializeFeaturedAnimations();
    initializeTimelineAnimations();
}

// Hero section animations
function initializeHeroAnimations() {
    const tl = gsap.timeline();
    
    // Hero badge animation
    tl.from(".hero-badge", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    })
    
    // Title words animation
    .from(".title-word", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.5")
    
    // Description animation
    .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    
    // Buttons animation
    .from(".hero-actions .btn-primary, .hero-actions .btn-secondary", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.6")
    
    // Visual container animation
    .from(".visual-container", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)"
    }, "-=1.2")
    
    // Scroll indicator
    .from(".scroll-indicator", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5");
    
    // Continuous animations
    gsap.to(".visual-layer", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: {
            each: 2,
            repeat: -1
        }
    });
}

// Initialize scroll-triggered animations
function initializeScrollAnimations() {
    // Parallax effect for floating elements
    gsap.utils.toArray(".floating-element").forEach((element, index) => {
        const speed = element.dataset.speed || 0.5;
        
        gsap.to(element, {
            y: -100 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    // Section reveal animations
    gsap.utils.toArray(".section").forEach((section, index) => {
        gsap.from(section.children, {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Stats section animations
function initializeStatsAnimations() {
    // Animate stat cards
    gsap.from(".stat-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: "#statsSection",
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
            duration: 2.5,
            delay: index * 0.3,
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
    });
}

// Cards section animations
function initializeCardsAnimations() {
    // Staggered card animations
    gsap.from(".franchise-card", {
        y: 100,
        opacity: 0,
        rotation: 5,
        duration: 1.2,
        stagger: {
            amount: 1.5,
            grid: "auto",
            from: "start"
        },
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: "#cardsSection",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Card hover animations
    document.querySelectorAll('.franchise-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                rotationX: 5,
                rotationY: 5,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(card.querySelector('.card-overlay'), {
                opacity: 1,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                rotationX: 0,
                rotationY: 0,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(card.querySelector('.card-overlay'), {
                opacity: 0,
                duration: 0.3
            });
        });
    });
}

// Featured section animations
function initializeFeaturedAnimations() {
    // Content animations
    gsap.from(".featured-content > *", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#featuredSection",
            start: "top 70%",
        }
    });
    
    // Visual animations
    gsap.from(".featured-visual", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#featuredSection",
            start: "top 70%",
        }
    });
    
    // Spec items hover effects
    document.querySelectorAll('.spec-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                x: 15,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Timeline animations
function initializeTimelineAnimations() {
    // Timeline items
    gsap.from(".timeline-item", {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#timelineSection",
            start: "top 80%",
        }
    });
    
    // Timeline markers
    document.querySelectorAll('.timeline-marker').forEach(marker => {
        ScrollTrigger.create({
            trigger: marker,
            start: "top 80%",
            onEnter: () => {
                gsap.to(marker, {
                    scale: 1.5,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    yoyo: true,
                    repeat: 1
                });
            }
        });
    });
}

// Initialize all animations
function initializeAnimations() {
    // Continuous background animations
    gsap.to(".hero-mesh", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none"
    });
    
    // Floating particles
    gsap.to(".effect-orb", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
    });
    
    gsap.to(".effect-rays", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });
    
    // Scroll line animation
    gsap.to(".scroll-line", {
        height: "80px",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
    });
}

// Initialize interactions
function initializeInteractions() {
    initializeFilterSystem();
    initializeButtonEffects();
    initializeCardInteractions();
}

// Filter system with advanced animations
function initializeFilterSystem() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.franchise-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter cards with advanced animations
            cards.forEach((card, index) => {
                const shouldShow = filter === 'all' || card.dataset.status === filter;
                
                if (shouldShow) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: "back.out(1.7)"
                    });
                    card.style.display = 'block';
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        y: 50,
                        duration: 0.4,
                        ease: "power2.in",
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Advanced button effects
function initializeButtonEffects() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        button.addEventListener('click', () => {
            // Ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Card interactions
function initializeCardInteractions() {
    document.querySelectorAll('.franchise-card').forEach(card => {
        // Tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}

// Initialize particle system
function initializeParticles() {
    const particleContainer = document.getElementById('particleBackground');
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(255, 107, 53, ${Math.random() * 0.5 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particleContainer.appendChild(particle);
        
        // Animate particles
        gsap.to(particle, {
            y: -100,
            x: Math.random() * 100 - 50,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 5
        });
        
        gsap.to(particle, {
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    }
}

// Performance optimization
function optimizePerformance() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0.1);
    }
}

// Initialize performance optimizations
optimizePerformance();

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Resize handler
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Export for external use
window.FranchisesApp = {
    franchiseData,
    initializeSheryEffects,
    initializeAnimations,
    initializeInteractions
};