import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import DemoVideo from './DemoVideo';
import Features from './Features';
import HowItWorks from './HowItWorks';
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <div className="dot-grid"></div>
        <div className="curved-line">
          <svg>
            <path d="M0,50 C200,20 400,80 600,50 S800,20 1000,80">
              <animate
                attributeName="d"
                dur="3s"
                repeatCount="indefinite"
                values="M0,50 C200,20 400,80 600,50 S800,20 1000,80;
                       M0,80 C200,50 400,20 600,80 S800,50 1000,20;
                       M0,50 C200,20 400,80 600,50 S800,20 1000,80"
              />
            </path>
            <circle cx="0" cy="50" r="4" fill="#212529"/>
            <circle cx="1000" cy="80" r="4" fill="#212529"/>
          </svg>
        </div>
        <div className="hero-content">
          <h1>Effortless Networking with <span>Jeli</span></h1>
          <h2 className="hero-subtitle">Let AI Connect the Dots for You</h2>
          <p className="hero-description">
            Save time, build meaningful connections, and take your LinkedIn
            outreach to the next level with Jeli's AI-powered automation.
          </p>
          <Link to="/signup" className="primary-button">
            Try Jeli Now
          </Link>
        </div>
      </section>
      <DemoVideo />
      <Features />
      <HowItWorks />
      <CTASection />
      <FAQSection />
    </>
  );
};

export default LandingPage;