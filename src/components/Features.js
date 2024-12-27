import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <section className="features-section">
      <div className="dot-grid"></div>
      <div className="section-marker">Features</div>
      <h2>What Makes Jeli Your Ultimate Networking Tool?</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Automated LinkedIn Outreach</h3>
          <p>Jeli connects with people on LinkedIn so you don't have to.</p>
        </div>
        <div className="feature-card">
          <h3>AI-Powered Context Awareness</h3>
          <p>Write a short prompt, and Jeli crafts personalized connection requests and follow-ups.</p>
        </div>
        <div className="feature-card">
          <h3>Cold Email Integration</h3>
          <p>Find emails of your ideal connections and send cold outreach effortlessly.</p>
        </div>
        <div className="feature-card">
          <h3>Meeting Scheduling Made Easy</h3>
          <p>Jeli can arrange meetings and sync them directly to your calendar.</p>
        </div>
        <div className="feature-card">
          <h3>Centralized Dashboard</h3>
          <p>Track your growing network and manage your connections all in one place.</p>
        </div>
        <div className="feature-card">
          <h3>No Extra Efforts</h3>
          <p>Jeli connects with people on LinkedIn so you don't have to.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;