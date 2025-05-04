import React, { useState } from "react";
import "./InternshipForm.css";

function InternshipForm() {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    branch: "",
    semester: "",
    section: "",
    email: "",
    mobile: "",
    role: "",
    organization: "",
    hrEmail: "",
    hrMobile: "",
    duration: "",
    pay: "",
    startDate: "",
    endDate: ""
  });

  const [offerFile, setOfferFile] = useState(null);
  const [approvalFile, setApprovalFile] = useState(null);
  const [nocFile, setNocFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (offerFile) form.append("offerLetter", offerFile);
    if (approvalFile) form.append("approvalLetter", approvalFile);
    if (nocFile) form.append("noc", nocFile);

    try {
      const res = await fetch("http://localhost:6001/api/internships/submit", {
        method: "POST",
        body: form
      });

      if (res.ok) {
        alert("Internship details submitted successfully!");
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An error occurred.");
    }
  };

  return (
    <div className="form-container">
      <h1>UG/PG Internship Portal</h1>
      <form className="internship-form" onSubmit={handleSubmit}>
        {["rollNo", "name", "branch", "semester", "section", "email", "mobile", "role", "organization", "hrEmail", "hrMobile", "duration", "pay"].map((field) => (
          <div className="form-row" key={field}>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="form-row">
          <label>Start-Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>End-Date</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>
            Upload Offer Letter:
            <input type="file" accept=".pdf" onChange={(e) => setOfferFile(e.target.files[0])} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Upload Approval Letter:
            <input type="file" accept=".pdf" onChange={(e) => setApprovalFile(e.target.files[0])} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Upload NOC:
            <input type="file" accept=".pdf" onChange={(e) => setNocFile(e.target.files[0])} />
          </label>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default InternshipForm;
