// backend/models/Internship.js
const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  rollNo: String,
  name: String,
  branch: String,
  semester: String,
  section: String,
  email: String,
  mobile: String,
  role: String,
  organization: String,
  hrEmail: String,
  hrMobile: String,
  duration: String,
  pay: String,
  startDate: Date,
  endDate: Date,
  offerLetter: String,
  approvalLetter: String,
  noc: String
}, { timestamps: true });

module.exports = mongoose.model('Internship', InternshipSchema);