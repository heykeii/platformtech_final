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

const myName = "Kurt N. Dorado";
const mySection = "BSIT SM 4102";
const myQuote = "No matter what happens, don’t be sorry for who you are.";

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
        <link href="https://fonts.googleapis.com/css2?family=Rye&family=Calistoga&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <style>
            body {
                background-color: #2c3e50;
                background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
                font-family: 'Roboto', sans-serif;
                color: #333;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
                text-align: center;
            }

            h1.main-title {
                font-family: 'Rye', serif;
                color: #fff;
                font-size: 3.5rem;
                text-shadow: 3px 3px 0px #000;
                margin-bottom: 40px;
                letter-spacing: 2px;
            }

            .container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 60px;
                max-width: 1200px;
                align-items: flex-start;
            }

            .wanted-poster {
                background-color: #fdf6e3;
                background-image: linear-gradient(to bottom right, #f4e4bc, #e6d2a0);
                width: 320px;
                height: 550px; /* Adjusted to Original Poster Aspect Ratio */
                padding: 20px 20px 30px 20px;
                box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
                transform: rotate(-2deg);
                border: 1px solid #bfa77a;
                position: relative;
                transition: transform 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .wanted-poster:hover {
                transform: rotate(0deg) scale(1.05);
                z-index: 10;
            }

            .wanted-title {
                font-family: 'Rye', serif;
                font-size: 3.8rem;
                color: #4a3b2a;
                margin: 0 0 5px 0;
                line-height: 1;
                letter-spacing: 2px;
                text-align: center;
                width: 100%;
            }

            .image-frame {
                width: 90%;
                height: 210px;
                background: #ddd;
                border: 6px solid #4a3b2a;
                margin-bottom: 5px;
                position: relative;
                overflow: hidden;
            }

            .wanted-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .dead-or-alive-container {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin-bottom: 0;
            }

            .dead-or-alive {
                font-family: 'Calistoga', serif;
                font-size: 1.4rem;
                color: #4a3b2a;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-top: 5px;
            }

            .wanted-name {
                font-family: 'Calistoga', serif;
                font-size: 2.2rem;
                color: #2c2c2c;
                text-transform: uppercase;
                margin: 5px 0 0 0;
                line-height: 1;
                word-break: break-word;
                width: 100%;
            }

            .bounty-container {
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Calistoga', serif;
                color: #2c2c2c;
                margin: 10px 0 15px 0;
                width: 100%;
                position: relative;
            }

            .berry-symbol {
                font-size: 1.2rem;
                margin-right: 8px;
                font-weight: bold;
            }

            .bounty-amount {
                font-size: 1.8rem;
                letter-spacing: 1px;
            }

            .marine-footer {
                position: absolute;
                bottom: 15px;
                width: 100%;
                text-align: center;
                font-family: 'Calistoga', serif;
                font-size: 2rem;
                color: #2c2c2c;
                text-transform: uppercase;
                letter-spacing: 3px;
                opacity: 0.2;
                pointer-events: none;
                z-index: 0;
                left: 0;
            }
            
            .section-stamp {
                margin-top: 5px;
                margin-bottom: 5px;
                color: #e74c3c;
                border: 3px solid #e74c3c;
                padding: 2px 8px;
                transform: rotate(-4deg);
                font-size: 1.3rem;
                font-weight: bold;
                font-family: 'Courier New', Courier, monospace;
                opacity: 0.85;
                z-index: 2;
                display: inline-block;
            }

            .quote-card {
                background: #111;
                width: 320px;
                height: 550px; /* Matched Height */
                padding: 30px 20px;
                border-radius: 8px;
                color: #fff;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between; /* Even distribution */
                box-shadow: 0 0 30px rgba(255, 100, 0, 0.2);
                transform: rotate(2deg);
                border: 1px solid #333;
            }

            .quote-card::before {
                content: '';
                position: absolute;
                top: -3px; left: -3px; right: -3px; bottom: -3px;
                background: linear-gradient(45deg, #ff0000, #ff9100, #ffea00, #ff0000);
                background-size: 400%;
                z-index: -1;
                filter: blur(15px);
                border-radius: 12px;
                animation: glowing 20s linear infinite;
                opacity: 0.8;
            }

            @keyframes glowing {
                0% { background-position: 0 0; }
                50% { background-position: 400% 0; }
                100% { background-position: 0 0; }
            }

            .ace-profile-image {
                width: 100%;
                height: 210px;
                border: 3px solid #ff7300;
                object-fit: cover;
            }

            .ace-icons {
                font-size: 2rem;
            }

            blockquote {
                font-size: 1.3rem;
                font-style: italic;
                line-height: 1.4;
                margin: 0;
                padding: 0 10px;
                color: #eee;
            }

            .quote-author {
                font-size: 0.9rem;
                color: #ffad5a;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 2px;
            }

        </style>
    </head>
    <body>

        <h1 class="main-title">THE GRAND LINE<br><span style="font-size: 0.5em; color: #f1c40f;">(Of Cloud Computing)</span></h1>

        <div class="container">
            
            <div class="wanted-poster">
                <div class="wanted-title">WANTED</div>
                
                <div class="image-frame">
                    <img src="${myImage}" alt="Target" class="wanted-image">
                </div>

                <div class="dead-or-alive-container">
                    <span class="dead-or-alive">DEAD OR ALIVE</span>
                </div>

                <div class="wanted-name">${myName}</div>

                <!-- Section Stamp -->
                <div class="section-stamp">${mySection}</div>

                <div class="bounty-container">
                    <span class="berry-symbol">฿</span>
                    <span class="bounty-amount">5,000,000,000-</span>
                </div>

                <div class="marine-footer">MARINE</div>
            </div>

            <div class="quote-card">
                <img src="${aceImage}" alt="Ace" class="ace-profile-image">
                <div class="ace-icons">🔥🍩💔</div>
                <blockquote>
                    "${myQuote}"
                </blockquote>
                <div class="quote-author">- Portgas D. Ace</div>
            </div>

        </div>

    </body>
    </html>
  `;

  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`🏴‍☠️ Setting sail on port ${port}`);
});