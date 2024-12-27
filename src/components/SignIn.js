import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { findUser } from './userDatabase';
import { useAuth } from './AuthContext';
import '../styles/Auth.css';

const SignIn = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const user = findUser(formData.email);
    if (user) {
      setStep(2);
      setError('');
    } else {
      setError('No account found with this email');
    }
  };

  const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  const user = findUser(formData.email);
  if (user && user.password === formData.password) {
    document.querySelector('.signin-container').classList.add('slide-up');

    setTimeout(() => {
      login({
        email: user.email,
        fullName: user.fullName,
        linkedinProfile: user.linkedinProfile
      });
      navigate('/dashboard');
    }, 500);
  } else {
    setError('Invalid password');
  }
};

  return (
    <div className="auth-page signin-page">
      <div className="signup-container signin-container">
        <div className="signup-header">
          <Link to="/" className="auth-logo" style={{color: 'var(--orange)'}}>Jeli</Link>
          <h1 className="signup-title">Welcome Back</h1>
        </div>

        <div className="signin-content">
          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="signin-form">
              <div className="form-group">
                <label className="input-label">Email address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="auth-input"
                />
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-button">
                Continue
              </button>

              <div className="auth-footer">
                <span>Don't have an account? </span>
                <Link to="/signup" className="auth-signin-link" style={{color: 'var(--orange)'}}>Sign Up</Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="signin-form">
              <div className="email-display">
                <span>{formData.email}</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="edit-email"
                  style={{color: 'var(--orange)'}}
                >
                  Edit
                </button>
              </div>

              <div className="form-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className="auth-input"
                />
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" className="auth-button">
                Sign In
              </button>

              <Link
                to="/forgot-password"
                className="forgot-password-link"
                style={{color: 'var(--orange)', textDecoration: 'none', display: 'block', textAlign: 'right', marginTop: '-20px', marginBottom: '20px'}}
              >
                Forgot password?
              </Link>

              <div className="auth-footer">
                <span>Don't have an account? </span>
                <Link to="/signup" className="auth-signin-link" style={{color: 'var(--orange)'}}>Sign Up</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;