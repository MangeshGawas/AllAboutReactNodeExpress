import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ username: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', user);
      navigate('/login');
    } catch (error) {
      setMessage('Registration failed.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button onClick={registerUser}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
