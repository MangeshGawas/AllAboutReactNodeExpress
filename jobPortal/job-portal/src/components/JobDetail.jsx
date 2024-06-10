import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setJob(response.data);
    };

    fetchJob();
  }, [id]);

  const applyForJob = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You need to be logged in to apply.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/applications',
        { jobId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Application submitted successfully!');
    } catch (error) {
      setMessage('Failed to apply for job.');
    }
  };

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <button onClick={applyForJob}>Apply for Job</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default JobDetail;
