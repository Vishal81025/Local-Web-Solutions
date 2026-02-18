const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose

const app = express();
const PORT = 3000;

// ─── DATABASE CONNECTION ────────────────────────────────
const dbURI = 'mongodb+srv://vishalk81025_db_user:BmGLQPSRWwdx2wel@localwebsolutions.l9vvzvf.mongodb.net/LeadDatabase?retryWrites=true&w=majority&appName=LocalWebSolutions';

mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// ─── DEFINE LEAD SCHEMA ─────────────────────────────────
const leadSchema = new mongoose.Schema({
    userName: String,
    businessName: String,
    whatsapp: String,
    service: String,
    details: String,
    date: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// ─── MIDDLEWARE ─────────────────────────────────────────
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ─── ROUTE: RECEIVE AND SAVE FORM DATA ──────────────────
app.post('/submit-form', async (req, res) => {
    try {
        // Create a new lead from the request body
        // Note: I used the names from our updated HTML: userName and details
        const newLead = new Lead({
            userName: req.body.userName,
            businessName: req.body.businessName,
            whatsapp: req.body.whatsapp,
            service: req.body.service,
            details: req.body.details
        });

        // Save to MongoDB
        await newLead.save();

        console.log("✅ Lead saved to Database:", newLead.userName);

        res.status(200).json({ 
            success: true, 
            message: "Data saved successfully to MongoDB!" 
        });
    } catch (error) {
        console.error("❌ Error saving lead:", error);
        res.status(500).json({ success: false, message: "Failed to save data." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
