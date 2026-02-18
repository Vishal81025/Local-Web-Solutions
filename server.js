const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ─── ROUTE: RECEIVE FORM DATA ────────────────────────────
app.post('/submit-form', (req, res) => {
    const { name, businessName, whatsapp, service, message } = req.body;

    console.log("New Lead Received:");
    console.log(`Name: ${name}`);
    console.log(`Business: ${businessName}`);
    console.log(`WhatsApp: ${whatsapp}`);
    console.log(`Service: ${service}`);
    console.log(`Message: ${message}`);

    // In a real app, you would save this to a database (like MongoDB) here.
    
    res.status(200).json({ 
        success: true, 
        message: "Thank you, Vishal! Your lead has been captured." 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});