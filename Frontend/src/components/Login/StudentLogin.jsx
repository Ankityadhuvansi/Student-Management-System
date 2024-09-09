// src/components/Login/StudentLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { useUser } from '../../context/UserContext'; 
import './StudentLogin.css';

const StudentLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/students/login', { username, password });
      localStorage.setItem('authToken', response.data);
      setUser({ name: username }); 
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-page-container">
      <h2 className="login-page-heading">Login</h2>
      <form className="login-page-form" onSubmit={handleLogin}>
        <div className="login-page-form-group">
          <label htmlFor="username" className="login-page-label">Username:</label>
          <input
            type="text"
            id="username"
            className="login-page-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-page-form-group">
          <label htmlFor="password" className="login-page-label">Password:</label>
          <input
            type="password"
            id="password"
            className="login-page-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="login-page-error-message">{error}</p>}
        <button type="submit" className="login-page-button">Login</button>
      </form>
      <p className="login-page-register-link">
        Don't have an account?{' '}
        <button className="login-page-register-button" onClick={() => navigate('/register')}>
          Register
        </button>
      </p>
    </div>
  );
};

export default StudentLogin;