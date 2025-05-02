const fetch = require('node-fetch').default;
const FormData = require('form-data');
const fs = require('fs');

async function submitInternship() {
  const form = new FormData();
  form.append('rollNo', 'testroll');
  form.append('name', 'testname');
  form.append('branch', 'testbranch');
  form.append('semester', 'testsemester');
  form.append('section', 'testsection');
  form.append('email', 'testemail@example.com');
  form.append('mobile', '1234567890');
  form.append('role', 'testrole');
  form.append('organization', 'testorg');
  form.append('hrEmail', 'hr@example.com');
  form.append('hrMobile', '0987654321');
  form.append('duration', '3 months');
  form.append('pay', '1000');
  form.append('startDate', '2025-01-01');
  form.append('endDate', '2025-03-31');

  // Add files if you have sample files, else comment these lines
  // form.append('offerLetter', fs.createReadStream('./sample_offer.pdf'));
  // form.append('approvalLetter', fs.createReadStream('./sample_approval.pdf'));
  // form.append('noc', fs.createReadStream('./sample_noc.pdf'));

  try {
    const response = await fetch('http://localhost:6001/api/internships/submit', {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error submitting internship:', error);
  }
}

submitInternship();
