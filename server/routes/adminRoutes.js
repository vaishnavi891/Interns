const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Internship = require('../models/Internship');
const Feedback = require('../models/Feedback');
const User = require('../models/User');

// Filtered internships by status + branch + semester + year
// Endpoint: /api/admin/internships/filter
router.get('/internships/filter', async (req, res) => {
  const { type, branch, year, semester } = req.query;

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

    const studentQuery = {};
    if (branch) studentQuery.branch = branch;
    if (year) studentQuery.year = year;
    if (semester) studentQuery.semester = semester;

    const students = await Student.find(studentQuery);
    const studentMap = {};
    students.forEach(s => {
      studentMap[s.rollNumber] = s;
    });

    const filteredInternships = internships
      .filter(i => studentMap[i.rollNumber])
      .map(i => {
        const start = new Date(i.startingDate);
        const end = new Date(i.endingDate);
        let status = "";

        if (today < start) status = "future";
        else if (today > end) status = "past";
        else status = "ongoing";

        return {
          ...i.toObject(),
          status,
          branch: studentMap[i.rollNumber]?.branch || null,
          semester: studentMap[i.rollNumber]?.semester || null,
          package: i.package || null
        };
      });

    res.json(filteredInternships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Internship Status
// Endpoint: /api/admin/internships/:id/status
router.patch('/internships/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Internship.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Filtered Students
// Endpoint: /api/admin/students
router.get('/students', async (req, res) => {
  try {
    const { year, semester, branch } = req.query;

    let query = {};

    if (year) query.academicYear = year;
    if (semester) query.semester = semester;
    if (branch) query.branch = branch;

    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard Stats
// Endpoint: /api/admin/dashboard-stats
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

// All Internships
// Endpoint: /api/admin/internships
router.get('/internships', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// All Feedbacks
// Endpoint: /api/admin/feedbacks
router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New route to get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'rollNo name email role'); // select fields to return
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// New route to create a student
router.post('/students', async (req, res) => {
  const { rollNo, name, email } = req.body;
  try {
    const existingStudent = await Student.findOne({ rollNumber: rollNo });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student already exists' });
    }
    const student = new Student({ rollNumber: rollNo, name, email });
    await student.save();
    res.status(201).json({ message: 'Student created successfully' });
  } catch (err) {
    console.error('Create student error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
