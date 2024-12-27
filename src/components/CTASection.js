import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/CTASection.css';

const CTASection = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleClick = () => {
    navigate('/signup');
    window.scrollTo(0, 0);
  };

  if (currentUser) {
    return null;
  }

  return (
    <section className="cta-section">
      <div className="dot-grid"></div>
      <h2>Ready to Transform Your Networking Game?</h2>
      <p>Start building meaningful connections today with Jeli's AI-powered tools.</p>
      <div className="line-container">
        <div className="dot left"></div>
        <div className="line"></div>
        <div className="dot right"></div>
      </div>
      <button className="cta-button" onClick={handleClick}>
        <span className="button-content">
          <span className="button-text">Get Started For Free</span>
          <span className="button-shine"></span>
        </span>
      </button>
    </section>
  );
};

export default CTASection;