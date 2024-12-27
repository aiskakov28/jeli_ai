import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUser } from './userDatabase';
import '../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = findUser(email);
    if (user) {
      setMessage('Password reset instructions sent to your email.');
      setTimeout(() => navigate('/signin'), 3000);
    } else {
      setMessage('Email not found.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Reset Password</h2>
        <p className="auth-description">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          {message && <div className={message.includes('not') ? 'auth-error' : 'auth-success'}>{message}</div>}
          <button type="submit" className="auth-button">Send Reset Link</button>
        </form>
        <div className="auth-links">
          <a href="/signin" className="text-button">Back to Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;