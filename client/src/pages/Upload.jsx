import { useState } from 'react';
import { default as axios } from 'axios';

export default function UploadCertificate() {
  const [rollNo, setRollNo] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('rollNo', rollNo);
    formData.append('certificate', certificate);

    try {
      await axios.post('/internship/upload-certificate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Certificate uploaded');
    } catch (err) {
      alert('Error: ' + err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">Upload Internship Completion Certificate</h2>
        <input type="text" name="rollNo" placeholder="Roll No" value={rollNo} onChange={e => setRollNo(e.target.value)} className="input-style mb-4" required />
        <input type="file" accept="application/pdf" onChange={e => setCertificate(e.target.files[0])} className="input-style mb-4" required />
        <button className="bg-indigo-600 text-white w-full py-2 mt-2 rounded-xl">Upload</button>
      </form>
    </div>
  );
}
