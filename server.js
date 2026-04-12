const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Naya tool database ke liye

const app = express();
app.use(express.json());
app.use(cors());

// 1. YAHAN APNI CHABI (LINK) DAALEIN 🔑
// Niche wale link ko delete karke apna asli link paste karein aur password sahi se daalein
const dbLink = "mongodb+srv://akhtar:S1o2h3e4l5@datahair.eqfbozp.mongodb.net/?appName=datahair";

// Database se connection
mongoose.connect(dbLink)
    .then(() => console.log("✅ Asli Database (MongoDB) se jud gaye hain!"))
    .catch((err) => console.log("❌ Connection Error: Password ya Link check karein", err));

// 2. Godaam ka structure (Khata-book kaisa dikhega)
const reviewSchema = new mongoose.Schema({
    name: String,
    text: String,
    rating: Number,
    date: { type: Date, default: Date.now } // Date apne aap save ho jayegi
});

const Review = mongoose.model('Review', reviewSchema);

// 3. Frontend ko saare reviews bhejna (GET)
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 }); // Naye wale upar aayenge
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Reviews laane mein dikkat hui" });
    }
});

// 4. Frontend se naya review lekar Godaam mein save karna (POST)
app.post('/api/reviews', async (req, res) => {
    try {
        const newReview = new Review({
            name: req.body.name,
            text: req.body.text,
            rating: req.body.rating
        });
        await newReview.save(); // Data hamesha ke liye save!
        console.log("Naya review database mein save ho gaya:", req.body.name);
        res.status(201).json({ message: "Review hamesha ke liye save ho gaya!" });
    } catch (error) {
        res.status(500).json({ message: "Review save karne mein error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Asli Server chalu ho gaya hai: http://localhost:${PORT}`);
});