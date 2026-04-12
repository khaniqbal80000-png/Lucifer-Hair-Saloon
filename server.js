const express = require('express');
const cors = require('cors'); // ✅ Ab yeh sirf ek bar hai
const mongoose = require('mongoose');

// 1. Robot (App) banana FIRST kaam hai
const app = express(); 

// 2. Robot banne ke baad, use orders dena shuru karen
app.use(cors()); 
app.use(express.json()); 

// HTML फ़ाइल्स को सर्व करने के लिए (user's custom spelling: 'publice')
app.use(express.static('publice')); 

// 3. DATABASE SE CONNECTION
// Niche wale link ko delete karke apna asli link yahan paste karein aur password sahi se dalein
// Aisa hona chahiye
const dbLink = "mongodb+srv://akhtar:S1o2h3e4l5@datahair.eqfbozp.mongodb.net/?appName=datahair";

mongoose.connect(dbLink).then(() => {
    console.log("✅ Asli Database (MongoDB) se jud gaye hain!");
}).catch((err) => {
    console.log("❌ Connection Error: Password ya Link check karein", err);
});

// 4. DATABASE KA STRUCTURE
const reviewsSchema = new mongoose.Schema({
    name: String,
    text: String,
    rating: Number,
    date: { type: Date, default: Date.now } // Date apne aap save ho jayegi
});
const Review = mongoose.model('Review', reviewsSchema);

// 5. DATA LANE KA RASTA (GET)
app.get('/api/reviews', async (req, res) => {
    try {
        const allReviews = await Review.find().sort({ date: -1 }); // Naya data sabse upar dikhega
        res.json(allReviews);
    } catch (err) {
        res.status(500).json({ error: "Review mangane mein dikkat aayi" });
    }
});

// 6. DATA BHEJNE KA RASTA (POST)
app.post('/api/reviews', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).json({ message: "Review safe ho gaya!" });
    } catch (err) {
        res.status(500).json({ error: "Review save nahi ho paya" });
    }
});

// 7. SERVER CHALU KARNA
const port = process.env.PORT || 3000; // Render apne aap process.env.PORT de dega
app.listen(port, () => {
    console.log(`✅ Asli Server chalu ho gaya hai: http://localhost:${port}`);
});