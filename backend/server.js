const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const loginRoutes = require('./routes/routes');
const connectDB = require('./db');
const Listing = require('./models/Listing'); // Listing schema

const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());
// Routes
app.use('/api/auth', loginRoutes);

// Connect to the database
connectDB();

app.get('/test-db', async (req, res) => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  res.json(collections);
});
// 1. Get all listings
app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
    // console.log("Listings: ",listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
    // console.log("Error: ",err.message);
  }
});


app.get('/api/listings/user/:userId', async (req, res) => {
  // console.log("User ID: ",req.params.userId);
  try {
    const listings = await Listing.find({ userId: req.params.userId }).populate('_id');
    // console.log("Listings: ",listings);
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to edit a listing
app.put('/api/admin/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.status(200).json({ message: 'Listing updated successfully', listing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Admin route to create a new listing
app.post('/api/admin/listings', async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json({ message: 'Listing created successfully', listing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Admin route to delete a listing
app.delete('/api/admin/listings/:id', async (req, res) => {
  try {
    const temp = await Listing.findById(req.params.id);
    console.log("Temp: ",temp);
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
