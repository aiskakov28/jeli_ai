import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUser } from './userDatabase';
import { useAuth } from './AuthContext';
import '../styles/Auth.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

      const user = findUser(formData.email);
    if (user && user.password === formData.password) {
    // Make sure the complete user object is being passed here
    login({
      email: user.email,
      fullName: user.fullName,
      linkedinProfile: user.linkedinProfile
    });
    navigate('/dashboard');
  }
    else {
    setError('Invalid email or password');
  }
};

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign In to Jeli.ai</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            className="auth-input"
          />
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="auth-button">Sign In</button>
        </form>
        <div className="auth-links">
          <a href="/forgot-password" className="text-button">Forgot Password?</a>
          <a href="/signup" className="text-button">New User? Sign Up!</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;