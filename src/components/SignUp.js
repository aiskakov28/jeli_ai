import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, findUser } from './userDatabase';
import '../styles/Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    linkedinProfile: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (findUser(formData.email)) {
      setError('Email already exists');
      return;
    }

    addUser({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      linkedinProfile: formData.linkedinProfile
    });

    navigate('/signin');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            required
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="auth-input"
          />
          <input
            type="url"
            placeholder="LinkedIn Profile URL"
            value={formData.linkedinProfile}
            onChange={(e) => setFormData({...formData, linkedinProfile: e.target.value})}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
            className="auth-input"
          />
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="auth-button">Create Account</button>
        </form>
        <div className="auth-links">
          <a href="/signin" className="text-button">Already have an account? Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;