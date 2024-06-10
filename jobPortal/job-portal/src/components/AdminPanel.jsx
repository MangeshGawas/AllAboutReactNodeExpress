import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const postJob = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You need to be logged in as admin to post a job.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/jobs',
        job,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Job posted successfully!');
    } catch (error) {
      setMessage('Failed to post job.');
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <input
        type="text"
        name="title"
        value={job.title}
        onChange={handleChange}
        placeholder="Job Title"
      />
      <textarea
        name="description"
        value={job.description}
        onChange={handleChange}
        placeholder="Job Description"
      />
      <input
        type="text"
        name="company"
        value={job.company}
        onChange={handleChange}
        placeholder="Company"
      />
      <input
        type="text"
        name="location"
        value={job.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <button onClick={postJob}>Post Job</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminPanel;
