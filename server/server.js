const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUser = process.env.MONGO_USER || ''; // Add your MongoDB username here if needed
const mongoPass = process.env.MONGO_PASS || ''; // Add your MongoDB password here if needed
const mongoAuth = mongoUser && mongoPass ? `${mongoUser}:${mongoPass}@` : '';
const mongoHost = '127.0.0.1';
const mongoPort = '27017';
const mongoDbName = 'internship';

const mongoUri = `mongodb://${mongoAuth}${mongoHost}:${mongoPort}/${mongoDbName}`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    if (err.name === 'MongoNetworkError') {
      console.error("Network error: Please check if MongoDB server is running and accessible.");
    }
  });

// Routes
app.use('/api/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});



const PORT = 6001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
