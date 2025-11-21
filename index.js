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

// --- DATA ---
const myName = "Kurt N. Dorado";
const mySection = "BSIT SM 4102";
const myQuote = "No matter what happens, don’t be sorry for who you are.";

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
        <title>Wanted: Cloud Engineer</title>
        <link href="https://fonts.googleapis.com/css2?family=Rye&family=Cinzel:wght@700&family=Calistoga&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <style>
            :root {
                --poster-paper: #f4e4bc;
                --poster-ink: #4a3b2a;
                --ace-fire: #ff4500;
                --ace-gold: #ffd700;
                --card-bg: #1a1a1a;
            }

            * { box-sizing: border-box; }

            body {
                background-color: #050000;
                /* Deep red pulsing background */
                background-image: radial-gradient(circle at 50% 100%, #300000 0%, #000000 70%);
                font-family: 'Roboto', sans-serif;
                color: #333;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
                overflow-x: hidden;
                perspective: 1000px;
                animation: backgroundPulse 4s infinite alternate;
            }

            @keyframes backgroundPulse {
                0% { background-image: radial-gradient(circle at 50% 100%, #300000 0%, #000000 70%); }
                100% { background-image: radial-gradient(circle at 50% 100%, #4a0000 10%, #000000 70%); }
            }

            /* --- ULTIMATE LIQUID FIRE ENGINE --- */
            /* This filter trick merges particles into a 'liquid' */
            .fire-layer {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
                filter: contrast(1.5) brightness(1.2);
            }

            /* Particle Styles */
            .particle {
                position: absolute;
                border-radius: 50%;
                opacity: 0;
                mix-blend-mode: screen;
            }

            /* 1. Base Plasma (Thick, Slow) */
            .p-base {
                background: radial-gradient(circle, rgba(255,50,0,0.8) 0%, rgba(100,0,0,0) 70%);
                bottom: -50px;
                animation: floatBase linear infinite;
                filter: blur(20px);
            }

            /* 2. Rising Flames (Fast, Bright) */
            .p-flame {
                background: radial-gradient(circle, #ffae00 0%, rgba(255,69,0,0.5) 60%, transparent 100%);
                bottom: -20px;
                animation: riseWobble linear infinite;
                filter: blur(8px);
            }

            /* 3. Sparks (Tiny, White hot) */
            .p-spark {
                background: #fff;
                bottom: 0;
                animation: sparkFly linear infinite;
                box-shadow: 0 0 10px #ffaa00;
            }

            /* Keyframes for realistic fire movement */
            @keyframes floatBase {
                0% { transform: translateX(0) scale(1); opacity: 0; }
                20% { opacity: 0.6; }
                100% { transform: translateX(20px) translateY(-150px) scale(1.5); opacity: 0; }
            }

            @keyframes riseWobble {
                0% { transform: translateX(0) translateY(0) scale(1); opacity: 0; }
                10% { opacity: 1; }
                50% { transform: translateX(-15px) translateY(-40vh) scale(1.2); }
                100% { transform: translateX(15px) translateY(-80vh) scale(0); opacity: 0; }
            }

            @keyframes sparkFly {
                0% { transform: translateY(0) translateX(0); opacity: 1; }
                100% { transform: translateY(-100vh) translateX(calc(-50px + 100px * var(--rnd))); opacity: 0; }
            }

            /* --- TEXT EFFECTS --- */
            h1.main-title {
                font-family: 'Rye', serif;
                color: #fff;
                font-size: 4rem;
                /* Heat Haze Text Shadow */
                text-shadow: 
                    0 0 10px rgba(255, 69, 0, 0.8),
                    0 0 20px rgba(255, 0, 0, 0.6),
                    0 0 40px rgba(255, 69, 0, 0.4);
                margin-bottom: 50px;
                letter-spacing: 4px;
                z-index: 2;
                animation: heatHaze 3s infinite alternate, slideIn 1s ease-out;
            }

            @keyframes heatHaze {
                0% { text-shadow: 0 0 10px rgba(255,69,0,0.8), 0 0 20px rgba(255,0,0,0.6); transform: scale(1); }
                100% { text-shadow: 0 0 15px rgba(255,100,0,1), 0 0 30px rgba(255,0,0,0.8); transform: scale(1.02); }
            }

            .container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 80px;
                max-width: 1400px;
                align-items: center;
                z-index: 2;
            }

            .card-container { perspective: 1000px; }

            .card-3d {
                width: 340px;
                height: 560px;
                position: relative;
                transition: transform 0.05s linear; /* Faster response */
                transform-style: preserve-3d;
                animation: float 6s ease-in-out infinite;
            }

            /* --- WANTED POSTER --- */
            .wanted-poster {
                background-color: var(--poster-paper);
                background-image: url('https://www.transparenttextures.com/patterns/paper.png');
                width: 100%;
                height: 100%;
                padding: 25px 20px;
                border: 1px solid #bfa77a;
                display: flex;
                flex-direction: column;
                align-items: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.6);
                transform: translateZ(0);
            }

            /* Nail Effect */
            .wanted-poster::after {
                content: '';
                position: absolute;
                top: -12px; width: 16px; height: 16px;
                background: #222;
                border-radius: 50%;
                box-shadow: 0 2px 4px rgba(0,0,0,0.8);
                z-index: 5;
            }

            .wanted-title {
                font-family: 'Rye', serif;
                font-size: 4rem;
                color: var(--poster-ink);
                margin: 0 0 10px 0;
                line-height: 0.8;
                text-align: center;
                width: 100%;
            }

            .image-frame {
                width: 90%;
                height: 220px;
                background: #ddd;
                border: 5px solid var(--poster-ink);
                margin-bottom: 10px;
                overflow: hidden;
                transform: translateZ(20px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }

            .wanted-image { width: 100%; height: 100%; object-fit: cover; }

            .dead-or-alive {
                font-family: 'Calistoga', serif;
                font-size: 1.6rem;
                color: var(--poster-ink);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin: 10px 0;
            }

            .wanted-name {
                font-family: 'Calistoga', serif;
                font-size: 2.2rem; 
                color: #2c2c2c;
                text-transform: uppercase;
                margin: 0;
                line-height: 1;
                transform: translateZ(30px);
                text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
            }

            .section-stamp {
                margin: 15px 0;
                color: #c0392b;
                border: 3px solid #c0392b;
                padding: 2px 10px;
                transform: rotate(-8deg) translateZ(25px);
                font-size: 1.2rem;
                font-weight: bold;
                font-family: 'Courier New', Courier, monospace;
                opacity: 0.9;
            }

            .bounty-amount {
                font-family: 'Calistoga', serif;
                font-size: 2rem; 
                color: #2c2c2c;
                margin-top: auto;
                margin-bottom: 30px;
            }

            .marine-footer {
                position: absolute;
                bottom: 15px; width: 100%; text-align: center;
                font-family: 'Calistoga', serif; font-size: 2.2rem;
                color: var(--poster-ink); opacity: 0.2; letter-spacing: 4px;
            }

            /* --- ACE QUOTE CARD --- */
            .quote-card {
                background: rgba(20, 20, 20, 0.85);
                width: 100%;
                height: 100%;
                padding: 30px 20px;
                border-radius: 15px;
                color: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                border: 1px solid #333;
                box-shadow: 0 0 50px rgba(255, 69, 0, 0.3);
                overflow: hidden;
                backdrop-filter: blur(5px);
            }

            .quote-card::before {
                content: '';
                position: absolute;
                inset: -2px;
                background: linear-gradient(45deg, #ff0000, #ff4500, #ffd700, #ff0000);
                background-size: 400%;
                z-index: -1;
                border-radius: 16px;
                animation: borderGlow 2s linear infinite;
                opacity: 0.8;
            }

            /* Holographic Shine */
            .shine {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%);
                pointer-events: none; z-index: 10;
            }

            .ace-profile-image {
                width: 180px; height: 180px; border-radius: 50%;
                border: 4px solid var(--ace-fire); object-fit: cover;
                transform: translateZ(40px);
                box-shadow: 0 0 35px rgba(255, 69, 0, 0.6);
            }

            .ace-icons {
                font-size: 2.5rem; margin-top: 15px; transform: translateZ(20px);
                text-shadow: 0 0 10px rgba(255,69,0,0.8);
            }

            blockquote {
                font-family: 'Cinzel', serif; font-size: 1.5rem; line-height: 1.5;
                margin: 20px 0; color: #fff; text-align: center;
                transform: translateZ(50px);
                text-shadow: 0 2px 10px rgba(0,0,0,0.8);
            }

            .quote-author {
                font-family: 'Cinzel', serif; font-size: 1.1rem; color: #ff4500;
                font-weight: bold; letter-spacing: 3px; text-transform: uppercase;
                transform: translateZ(20px); border-top: 1px solid #555;
                padding-top: 15px; width: 80%;
            }

            /* ANIMATIONS */
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-15px); }
            }
            @keyframes borderGlow { 0% { background-position: 0 0; } 100% { background-position: 400% 0; } }
            @keyframes slideIn { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

            @media (max-width: 800px) {
                .main-title { font-size: 2.5rem; }
                .container { gap: 40px; }
            }
        </style>
    </head>
    <body>

        <!-- The Fire Layer -->
        <div class="fire-layer" id="fire"></div>

        <h1 class="main-title">THE NEW ERA</h1>

        <div class="container">
            
            <!-- CARD 1 -->
            <div class="card-container">
                <div class="card-3d" id="poster">
                    <div class="shine"></div>
                    <div class="wanted-poster">
                        <div class="wanted-title">WANTED</div>
                        <div class="image-frame">
                            <img src="${myImage}" alt="Target" class="wanted-image">
                        </div>
                        <div class="dead-or-alive">DEAD OR ALIVE</div>
                        <div class="wanted-name">${myName}</div>
                        <div class="section-stamp">${mySection}</div>
                        <div class="bounty-amount">
                            <span>฿</span> 5,000,000,000-
                        </div>
                        <div class="marine-footer">MARINE</div>
                    </div>
                </div>
            </div>

            <!-- CARD 2 -->
            <div class="card-container">
                <div class="card-3d" id="quote">
                    <div class="shine"></div>
                    <div class="quote-card">
                        <img src="${aceImage}" alt="Ace" class="ace-profile-image">
                        <div class="ace-icons">🔥🍩💔</div>
                        <blockquote>
                            "${myQuote}"
                        </blockquote>
                        <div class="quote-author">- Portgas D. Ace</div>
                    </div>
                </div>
            </div>

        </div>

        <script>
            // --- 1. ULTIMATE FIRE GENERATOR ---
            const fireContainer = document.getElementById('fire');
            
            function spawnParticle(type) {
                const p = document.createElement('div');
                p.classList.add('particle', type);
                
                // Random X start position
                p.style.left = Math.random() * 100 + 'vw';
                
                let size, dur;
                
                if(type === 'p-base') {
                    size = Math.random() * 100 + 100; // Huge base particles
                    dur = Math.random() * 3 + 4; // Slow
                } else if(type === 'p-flame') {
                    size = Math.random() * 50 + 20; // Medium flames
                    dur = Math.random() * 2 + 2; // Medium speed
                } else { // spark
                    size = Math.random() * 5 + 2; // Tiny sparks
                    dur = Math.random() * 1 + 0.5; // Very fast
                    p.style.setProperty('--rnd', Math.random()); // For variable spark drift
                }
                
                p.style.width = size + 'px';
                p.style.height = size + 'px';
                p.style.animationDuration = dur + 's';
                
                fireContainer.appendChild(p);
                
                setTimeout(() => { p.remove(); }, dur * 1000);
            }

            // Intense generation loop
            setInterval(() => spawnParticle('p-base'), 200);
            setInterval(() => spawnParticle('p-flame'), 50);
            setInterval(() => spawnParticle('p-spark'), 30);


            // --- 2. HIGH PERFORMANCE 3D TILT ---
            const cards = [document.getElementById('poster'), document.getElementById('quote')];

            document.addEventListener('mousemove', (e) => {
                const x = e.clientX;
                const y = e.clientY;
                const midX = window.innerWidth / 2;
                const midY = window.innerHeight / 2;

                // Increased tilt range for more drama
                const rotateX = ((y - midY) / midY) * -18;
                const rotateY = ((x - midX) / midX) * 18;

                cards.forEach(card => {
                    card.style.animation = 'none'; // Pause float
                    card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;

                    const shine = card.querySelector('.shine');
                    const moveX = ((x / window.innerWidth) * 100) - 50;
                    const moveY = ((y / window.innerHeight) * 100) - 50;
                    
                    // Reactive shine
                    shine.style.background = \`linear-gradient(
                        135deg, 
                        rgba(255,255,255,0) \${0 + moveX + moveY}%, 
                        rgba(255,255,255,0.25) \${50 + moveX + moveY}%, 
                        rgba(255,255,255,0) \${100 + moveX + moveY}%
                    )\`;
                });
            });

            document.addEventListener('mouseleave', () => {
                cards.forEach((card) => {
                    card.style.transform = 'rotateX(0) rotateY(0)';
                    card.querySelector('.shine').style.background = 'none';
                    card.style.animation = 'float 6s ease-in-out infinite';
                });
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