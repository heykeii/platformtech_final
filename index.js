import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname));

// --- USER DATA ---
const userData = {
    name: "Kurt Dorado",
    role: "Student / Developer",
    section: "BSIT SM 4102",
    bounty: 450000000,
    quote: "No matter what happens, don’t be sorry for who you are.",
    author: "Portgas D. Ace"
};

// --- IMAGES ---
const myImage = "/profile.jpeg";
const aceImage = "/ace.jpg";

app.get('/', (req, res) => {
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fire Fist: ${userData.name}</title>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Montserrat:wght@300;400;600&family=Italiana&display=swap" rel="stylesheet">
        
        <style>
            :root {
                /* PALETTE */
                --c-fire: #ff4500;       /* Vibrant Orange */
                --c-ember: #ffae00;      /* Gold/Yellow */
                --c-void: #050202;       /* Deep Black */
                --c-border: rgba(255, 69, 0, 0.4); /* Fire Border */
                --c-text: #ffffff;
                --c-text-muted: #a0a0a0;
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
                background-color: var(--c-void);
                color: var(--c-text);
                font-family: 'Montserrat', sans-serif;
                min-height: 100vh; /* Changed to min-height for scrolling */
                overflow-x: hidden; /* Prevent horizontal scroll */
                display: flex;
                justify-content: center;
                align-items: center;
                /* Deep Magma Gradient */
                background-image: radial-gradient(circle at 50% 100%, #300500 0%, #000000 90%);
                padding: 20px 0; /* Padding for mobile spacing */
            }

            /* --- LOADING SCREEN --- */
            #loader {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: #000;
                z-index: 2000;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .loader-text {
                font-family: 'Cinzel', serif;
                color: var(--c-fire);
                font-size: 1.2rem;
                letter-spacing: 6px;
                text-transform: uppercase;
                margin-bottom: 20px;
                animation: pulse 1.5s infinite alternate;
                text-align: center;
                padding: 0 20px;
            }
            .loader-line-wrapper {
                width: 200px; height: 2px;
                background: #222;
                position: relative;
                overflow: hidden;
            }
            .loader-line {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(90deg, var(--c-fire), var(--c-ember));
                transform: translateX(-100%);
                box-shadow: 0 0 10px var(--c-fire);
            }

            /* --- CUSTOM CURSOR (Hidden on Mobile) --- */
            .cursor-follower, .cursor-dot {
                pointer-events: none;
                z-index: 9999;
                position: fixed;
            }
            .cursor-follower {
                top: 0; left: 0; width: 40px; height: 40px;
                border: 1px solid rgba(255, 69, 0, 0.6);
                border-radius: 50%;
                transition: width 0.3s, height 0.3s, background-color 0.3s;
                mix-blend-mode: screen;
                transform: translate(-50%, -50%);
            }
            .cursor-dot {
                top: 0; left: 0; width: 6px; height: 6px;
                background: var(--c-ember);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 10px var(--c-fire);
            }
            @media (hover: none) {
                .cursor-follower, .cursor-dot { display: none; } /* Hide on touch devices */
            }

            /* --- BACKGROUND CANVAS --- */
            #webgl-canvas {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                z-index: 0;
                opacity: 0.8; 
                pointer-events: none;
            }

            /* --- THE MONOLITH CARD --- */
            .monolith {
                position: relative;
                width: 90%; /* Fluid Width */
                max-width: 1100px; /* Max Cap */
                height: 650px;
                
                /* Refined Obsidian Look */
                background: linear-gradient(145deg, rgba(25, 15, 10, 0.96), rgba(5, 2, 2, 0.98));
                backdrop-filter: blur(40px);
                -webkit-backdrop-filter: blur(40px);
                
                border: 1px solid var(--c-border);
                border-radius: 8px;
                
                box-shadow: 
                    0 50px 100px -20px rgba(0,0,0,0.9),
                    0 0 30px rgba(255, 69, 0, 0.15),
                    inset 0 0 100px rgba(0,0,0,0.8);
                
                display: grid;
                grid-template-columns: 1.1fr 1fr; /* Desktop Grid */
                z-index: 10;
                overflow: hidden;
            }

            /* Top Fire Accent Line */
            .monolith::before {
                content: "";
                position: absolute;
                top: 0; left: 0; width: 100%; height: 3px;
                background: linear-gradient(90deg, transparent, var(--c-fire), var(--c-ember), transparent);
                z-index: 20;
                box-shadow: 0 2px 15px var(--c-fire);
            }

            /* --- LEFT SIDE: PROFILE DATA --- */
            .data-col {
                padding: 70px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: relative;
                z-index: 5;
                border-right: 1px solid rgba(255, 255, 255, 0.05);
            }

            /* Identity Block */
            .identity-block { margin-bottom: 45px; }
            
            .identity-block h1 {
                font-family: 'Cinzel', serif;
                font-size: clamp(2.5rem, 5vw, 3.5rem); /* Responsive Font */
                line-height: 1;
                margin-bottom: 10px;
                background: linear-gradient(to right, #ffffff, #ffccaa);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0 0 15px rgba(255, 69, 0, 0.2));
            }

            .identity-block h2 {
                font-family: 'Montserrat', sans-serif;
                font-size: 1.1rem;
                color: var(--c-fire);
                letter-spacing: 6px;
                text-transform: uppercase;
                font-weight: 600;
            }

            /* Stats Grid */
            .stats-grid {
                display: flex;
                align-items: center;
                gap: 30px;
                margin-bottom: 45px;
                background: rgba(255,255,255,0.03);
                padding: 20px;
                border-radius: 6px;
                border: 1px solid rgba(255,255,255,0.05);
            }

            /* Avatar */
            .avatar-container {
                width: 90px; height: 90px;
                border-radius: 50%;
                padding: 3px;
                background: linear-gradient(135deg, var(--c-fire), #000);
                flex-shrink: 0; /* Prevent shrinking */
                box-shadow: 0 0 20px rgba(255, 69, 0, 0.3);
            }
            
            .avatar-img {
                width: 100%; height: 100%;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #1a1a1a;
                filter: grayscale(0.2) contrast(1.1);
            }

            .details { display: flex; flex-direction: column; gap: 8px; }
            .detail-row { display: flex; flex-direction: column; }
            .detail-label { font-size: 0.65rem; color: var(--c-text-muted); text-transform: uppercase; letter-spacing: 1px; }
            .detail-value { font-size: 1rem; font-weight: 600; letter-spacing: 1px; color: #f0f0f0; }

            /* Bounty Section */
            .bounty-section {
                position: relative;
                padding-left: 25px;
                border-left: 4px solid var(--c-ember);
            }
            .bounty-label {
                font-family: 'Cinzel', serif;
                font-size: 0.8rem;
                color: var(--c-text-muted);
                margin-bottom: 5px;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            .bounty-val {
                font-family: 'Cinzel', serif;
                font-size: clamp(2rem, 4vw, 3rem); /* Responsive Font */
                color: var(--c-ember);
                font-weight: 700;
                letter-spacing: 2px;
                text-shadow: 0 0 30px rgba(255, 174, 0, 0.3);
                word-break: break-word;
            }

            /* --- RIGHT SIDE: ACE VISUAL --- */
            .visual-col {
                position: relative;
                overflow: hidden;
                background: #000;
                mask-image: linear-gradient(to right, transparent 0%, black 20%);
                -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%);
            }

            .hero-img-container {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
            }

            .hero-img {
                width: 100%; height: 100%;
                object-fit: cover;
                object-position: center top;
                opacity: 0.8;
                transition: transform 0.5s ease;
                filter: saturate(1.1) contrast(1.1);
            }
            .monolith:hover .hero-img { transform: scale(1.03); }

            /* Quote Overlay */
            .quote-container {
                position: absolute;
                bottom: 0; left: 0; width: 100%;
                padding: 50px;
                background: linear-gradient(to top, rgba(10, 2, 0, 0.95), transparent);
                z-index: 10;
            }
            .quote-text {
                font-family: 'Italiana', serif;
                font-size: clamp(1.1rem, 2.5vw, 1.6rem);
                line-height: 1.4;
                color: #e0e0e0;
                margin-bottom: 15px;
                font-style: italic;
                text-shadow: 0 2px 4px rgba(0,0,0,0.8);
            }
            .quote-author {
                font-family: 'Cinzel', serif;
                font-size: 0.9rem;
                color: var(--c-fire);
                letter-spacing: 4px;
                text-transform: uppercase;
                font-weight: 700;
                display: flex;
                align-items: center;
            }
            .quote-author::before {
                content: '';
                display: inline-block;
                width: 40px; height: 2px;
                background: var(--c-fire);
                margin-right: 15px;
                box-shadow: 0 0 8px var(--c-fire);
            }

            @keyframes pulse { 0%, 100% { opacity: 0.6; text-shadow: 0 0 10px var(--c-fire); } 50% { opacity: 1; text-shadow: 0 0 20px var(--c-fire); } }

            /* --- RESPONSIVE MEDIA QUERIES --- */
            
            /* Tablet & Mobile (< 1024px) */
            @media (max-width: 1024px) {
                .monolith { 
                    width: 95%;
                    height: auto; /* Auto height for stacking */
                    grid-template-columns: 1fr; /* Single Column */
                    margin: 20px 0;
                }
                
                /* Reorder: Visual Top, Data Bottom */
                .visual-col {
                    height: 350px; /* Fixed height for banner */
                    order: 1;
                    border-bottom: 1px solid rgba(255,69,0,0.3);
                    mask-image: none; 
                    -webkit-mask-image: none;
                }
                
                .data-col {
                    order: 2;
                    padding: 40px;
                    border-right: none;
                }

                .hero-img {
                    /* Fade out bottom instead of left */
                    mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
                }

                /* Adjust layout of components inside data-col */
                .stats-grid {
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 20px;
                }
                
                .details { align-items: center; }
                
                .bounty-section {
                    text-align: center;
                    padding-left: 0;
                    border-left: none;
                    border-top: 4px solid var(--c-ember);
                    padding-top: 20px;
                }
                
                .identity-block { text-align: center; }
            }

            /* Small Mobile (< 600px) */
            @media (max-width: 600px) {
                .visual-col { height: 280px; }
                .quote-container { padding: 30px; }
                .data-col { padding: 30px 20px; }
                .identity-block h1 { font-size: 2.2rem; }
                .bounty-val { font-size: 2rem; }
            }

        </style>
    </head>
    <body>

        <div id="loader">
            <div class="loader-text">Igniting Will of Fire...</div>
            <div class="loader-line-wrapper">
                <div class="loader-line"></div>
            </div>
        </div>

        <div class="cursor-follower"></div>
        <div class="cursor-dot"></div>

        <canvas id="webgl-canvas"></canvas>

        <div class="monolith" id="card">
            
            <div class="data-col">
                <div class="identity-block">
                    <h1 class="glitch-reveal">${userData.name}</h1>
                    <h2>${userData.role}</h2>
                </div>

                <div class="stats-grid">
                    <div class="avatar-container">
                        <img src="${myImage}" class="avatar-img" alt="Profile">
                    </div>
                    <div class="details">
                        <div class="detail-row">
                            <span class="detail-label">Section</span>
                            <span class="detail-value">BSIT Service Management 4102</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Status</span>
                            <span class="detail-value" style="color: var(--c-fire)">WANTED DEAD OR ALIVE</span>
                        </div>
                    </div>
                </div>

                <div class="bounty-section">
                    <div class="bounty-label">Total Bounty</div>
                    <div class="bounty-val" id="bounty-display">0</div>
                </div>
            </div>

            <div class="visual-col">
                <div class="hero-img-container">
                    <img src="${aceImage}" class="hero-img" alt="Portgas D. Ace">
                </div>
                
                <div class="quote-container">
                    <p class="quote-text">"${userData.quote}"</p>
                    <div class="quote-author">${userData.author}</div>
                </div>
            </div>

        </div>

        <script>
            // --- VARIABLES ---
            const cursorFollower = document.querySelector('.cursor-follower');
            const cursorDot = document.querySelector('.cursor-dot');
            const monolith = document.getElementById('card');

            // --- 1. ENTRANCE LOGIC ---
            window.addEventListener('load', () => {
                const tl = gsap.timeline();

                // Loader Animation
                tl.to('.loader-line', { transform: 'translateX(0%)', duration: 1.5, ease: 'expo.inOut' })
                  .to('#loader', { opacity: 0, duration: 0.8, onComplete: () => document.getElementById('loader').remove() })
                  
                  // Text Stagger
                  .from('.identity-block h1', { x: -20, opacity: 0, duration: 0.8 }, "-=0.5")
                  .from('.identity-block h2', { x: -20, opacity: 0, duration: 0.8 }, "-=0.6")
                  
                  // Start Bounty Count
                  .call(startBountyCounter, null, "-=0.5");
            });

            // --- 2. BOUNTY COUNTER ---
            function startBountyCounter() {
                const obj = { val: 0 };
                const target = ${userData.bounty};
                const el = document.getElementById('bounty-display');
                
                gsap.to(obj, {
                    val: target,
                    duration: 2.5,
                    ease: 'power4.out',
                    onUpdate: () => {
                        el.innerText = "฿ " + Math.floor(obj.val).toLocaleString();
                    }
                });
            }

            // --- 3. CUSTOM CURSOR & TILT ---
            // Detect if device supports hover (mouse)
            const isDesktop = window.matchMedia("(hover: hover)").matches;

            if (isDesktop) {
                window.addEventListener('mousemove', (e) => {
                    const x = e.clientX;
                    const y = e.clientY;
                    
                    gsap.to(cursorDot, { x: x, y: y, duration: 0.1 });
                    gsap.to(cursorFollower, { x: x, y: y, duration: 0.5, ease: 'power2.out' });
                    
                    // Card Tilt Logic
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    const tiltX = (y - centerY) / 60;
                    const tiltY = (centerX - x) / 60;

                    gsap.to(monolith, { 
                        rotationX: tiltX, 
                        rotationY: tiltY, 
                        duration: 1, 
                        ease: 'power2.out' 
                    });
                });

                // Hover Expansion
                document.querySelectorAll('a, img').forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        gsap.to(cursorFollower, { scale: 1.5, borderColor: '#ffae00', mixBlendMode: 'normal' });
                    });
                    el.addEventListener('mouseleave', () => {
                        gsap.to(cursorFollower, { scale: 1, borderColor: 'rgba(255, 69, 0, 0.6)', mixBlendMode: 'screen' });
                    });
                });
            }

            // --- 4. THREE.JS BACKGROUND (RISING FIRE EMBERS) ---
            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x050202, 0.002);

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas'), alpha: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Fire Particles
            const particlesCount = 1500;
            const posArray = new Float32Array(particlesCount * 3);
            
            for(let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 30;
            }
            
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const material = new THREE.PointsMaterial({
                size: 0.03,
                color: 0xff4500,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            
            const particlesMesh = new THREE.Points(geometry, material);
            scene.add(particlesMesh);
            camera.position.z = 5;

            // Animation Variables
            let mouseX = 0;
            let mouseY = 0;
            
            if(isDesktop) {
                document.addEventListener('mousemove', (e) => {
                    mouseX = e.clientX / window.innerWidth - 0.5;
                    mouseY = e.clientY / window.innerHeight - 0.5;
                });
            }

            const clock = new THREE.Clock();

            function animate() {
                const elapsedTime = clock.getElapsedTime();
                
                // Gentle rotation
                particlesMesh.rotation.y = -0.05 * elapsedTime; 
                
                // Parallax
                if(isDesktop) {
                    particlesMesh.rotation.x += 0.05 * (mouseY - particlesMesh.rotation.x);
                    particlesMesh.rotation.y += 0.05 * (mouseX - particlesMesh.rotation.y);
                }
                
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }
            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

        </script>
    </body>
    </html>
  `;

  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`🏴‍☠️ Setting sail on port ${port}`);
});