import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleButtonClick = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/pricing');
    }
  };

  return (
    <section className="hero">
      <h1>Connect Smarter with Jeli.ai</h1>
      <p>
        Automate your professional networking with AI-powered personalized messages and emails.
        Reach the right people with <b>just one click</b>.
      </p>
      <button onClick={handleButtonClick} className="cta-button">
        {currentUser ? 'Go to Dashboard' : 'Get Started'}
      </button>
    </section>
  );
};

export default Hero;