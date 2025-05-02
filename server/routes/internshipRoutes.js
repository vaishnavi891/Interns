const express = require('express');
const router = express.Router();
const multer = require('multer');
const Internship = require('../models/Internship');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists or create it
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST: Submit internship form with file uploads
router.post('/submit', upload.fields([
  { name: 'offerLetter', maxCount: 1 },
  { name: 'approvalLetter', maxCount: 1 },
  { name: 'noc', maxCount: 1 }
]), async (req, res) => {
  try {
    const internshipData = req.body;

    // Add file paths to internshipData if files uploaded
    if (req.files['offerLetter']) {
      internshipData.offerLetter = req.files['offerLetter'][0].path;
    }
    if (req.files['approvalLetter']) {
      internshipData.approvalLetter = req.files['approvalLetter'][0].path;
    }
    if (req.files['noc']) {
      internshipData.noc = req.files['noc'][0].path;
    }

    const newInternship = new Internship(internshipData);
    await newInternship.save();
    res.status(201).json({ message: 'Internship submitted successfully' });
  } catch (error) {
    console.error('Internship submission error:', error);
    res.status(500).json({ error: 'Failed to save internship data' });
  }
});

// GET: Fetch all submitted internships
router.get('/all', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

module.exports = router;
console.log(newInternship)