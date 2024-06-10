import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <Link to={`/jobs/${job._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
