const express = require('express');
const app = express();
const port = 5001;
const mongodb = require('./db');

// Initiate MongoDB connection and handle data fetch
mongodb((err, data) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    global.foodData = data.foodData;
    global.foodCategory = data.Catdata;
    console.log("Data fetched and stored in global variables.");
  }
});

// Middleware to allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Auth route
app.use('/api/auth', require('./Routes/Auth'));

// Start server after the data is ready
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});