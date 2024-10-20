const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const swaggerDocs = require('./swagger');
require('dotenv').config();
require('./passport-config')(passport);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(passport.initialize());

// Swagger documentation
swaggerDocs(app);

// Routes
app.use('/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Home route for testing
app.get('/', (req, res) => {
  res.send('API is running');
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
