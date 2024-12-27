import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    linkedinProfile: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    return null;
  };

  const validateLinkedInUrl = (url) => {
    if (!url) return null;
    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedinRegex.test(url) ? null : 'Please enter a valid LinkedIn profile URL';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    const linkedinError = validateLinkedInUrl(formData.linkedinProfile);
    if (linkedinError) {
      setError(linkedinError);
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = existingUsers.some(user => user.email === formData.email);

      if (emailExists) {
        setError('An account with this email already exists');
        return;
      }

      const newUser = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        subscriptionType: 'basic'
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      await register(newUser);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="auth-page signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <Link to="/" className="auth-logo" style={{color: 'var(--orange)'}}>Jeli</Link>
          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">Join thousands of professionals connecting through Jeli</p>
        </div>

        <div className="signup-content">
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <label className="input-label">Work Email</label>
              <input
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <label className="input-label">LinkedIn Profile (Optional)</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/johndoe"
                value={formData.linkedinProfile}
                onChange={(e) => setFormData({...formData, linkedinProfile: e.target.value})}
                className="auth-input"
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-button">
              Create Account
            </button>

            <div className="auth-footer">
              <span>Already have an account? </span>
              <Link to="/signin" className="auth-signin-link" style={{color: 'var(--orange)'}}>Sign In</Link>
            </div>
          </form>

          <div className="signup-benefits">
            <h3>Why join Jeli?</h3>
            <ul className="benefits-list">
              <li>
                <span className="benefit-icon">✨</span>
                <div className="benefit-text">
                  <h4>Smart Networking</h4>
                  <p>AI-powered connections that matter</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">🎯</span>
                <div className="benefit-text">
                  <h4>Targeted Outreach</h4>
                  <p>Reach the right people at the right time</p>
                </div>
              </li>
              <li>
                <span className="benefit-icon">📈</span>
                <div className="benefit-text">
                  <h4>Growth Analytics</h4>
                  <p>Track and optimize your networking efforts</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;