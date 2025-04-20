const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Internship = require('../models/Internship');
const Feedback = require('../models/Feedback');

// Filtered internships by status + branch
router.get('/internships/filter', async (req, res) => {
  const { type, branch } = req.query; // type = ongoing | past | future

  try {
    const today = new Date();

    let dateQuery = {};
    if (type === 'ongoing') {
      dateQuery = { startingDate: { $lte: today }, endingDate: { $gte: today } };
    } else if (type === 'past') {
      dateQuery = { endingDate: { $lt: today } };
    } else if (type === 'future') {
      dateQuery = { startingDate: { $gt: today } };
    }

    const internships = await Internship.find(dateQuery);
    
    if (!branch) return res.json(internships);

    // Get roll numbers of students in that branch
    const students = await Student.find({ branch });
    const branchRollNumbers = students.map(std => std.rollNumber);

    const filteredInternships = internships.filter(intern =>
      branchRollNumbers.includes(intern.rollNumber)
    );

    res.json(filteredInternships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Dashboard Stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalInternships = await Internship.countDocuments();
    const totalFeedbacks = await Feedback.countDocuments();
    const pendingInternships = await Internship.countDocuments({ status: 'Pending' });

    res.json({
      totalStudents,
      totalInternships,
      totalFeedbacks,
      pendingInternships,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// All Students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// All Internships
router.get('/internships', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// All Feedbacks
router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve/Reject Internship
router.put('/internships/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await Internship.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: `Internship marked as ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
