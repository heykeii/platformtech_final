// 1. Import statements (ES6 Syntax)
import express from 'express';
import cors from 'cors';

// 2. Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// 3. Middleware (Optional but recommended)
app.use(cors());

// 4. Define your variables (Data)
const myName = "Kurt N. Dorado";
const mySection = "BSIT - SM4102";
const myQuote = "The cloud is about how you do computing, not where you do computing."

// 5. The Route
app.get('/', (req, res) => {
    // We use backticks (`) here to create a multi-line string and inject variables using ${}
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>My Node App</title>
            <style>
                body { font-family: sans-serif; text-align: center; padding: 50px; }
                h1 { color: #2c3e50; }
                .info { color: #7f8c8d; font-size: 1.2em; }
                blockquote { font-style: italic; color: #555; border-left: 5px solid #eee; padding-left: 15px; display: inline-block; }
            </style>
        </head>
        <body>
            <h1>Hello, I am ${myName}</h1>
            <p class="info">Section: ${mySection}</p>
            <br>
            <blockquote>"${myQuote}"</blockquote>
        </body>
        </html>
    `;

    res.send(htmlResponse);
});

// 6. Start the server
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});