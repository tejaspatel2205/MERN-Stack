const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tuitionDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON data
app.use(express.static('public')); // Serve static files (CSS)
app.set('view engine', 'ejs'); // Set EJS as template engine

// Routes
app.use('/students', studentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});