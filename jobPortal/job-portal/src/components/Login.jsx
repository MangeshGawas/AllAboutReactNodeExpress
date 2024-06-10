import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', user);
      localStorage.setItem('token', response.data.token);
      console.log(      localStorage.setItem('token', response.data.token)    )
      navigate('/');
    } catch (error) {
      setMessage('Login failed.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={loginUser}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
