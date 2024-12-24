import React from 'react';
import '../styles/AboutUs.css';
import AbylayPic from '../images/Abylay_pic.jpeg';
import DanialPic from '../images/Danial_pic.jpeg';
import AldiyarPic from '../images/Aldiyar_pic.jpeg';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="hero-section">
        <h1>About Jeli.ai</h1>
        <p className="hero-text">Revolutionizing Professional Networking with AI</p>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>At Jeli.ai, we're revolutionizing professional networking through AI-powered solutions, making meaningful connections easier and more efficient than ever before. We believe in the power of authentic connections and leverage AI to make networking more accessible and effective for everyone.</p>
          </div>
        </section>

        <section className="founders-section">
          <h2>Meet Our Co-Founders</h2>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-image">
                <img src={AbylayPic} alt="Abylay Iskakov" className="profile-img" />
              </div>
              <div className="founder-info">
                <h3>Abylay Iskakov</h3>
                <p className="founder-title">CEO & Technical Lead</p>
                <p className="founder-bio">Leading the technical vision and development of Jeli.ai's website.</p>
                <a href="https://www.linkedin.com/in/abylay-iskakov/" className="linkedin-link" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div className="founder-card">
              <div className="founder-image">
                <img src={DanialPic} alt="Danial Utegenov" className="profile-img" />
              </div>
              <div className="founder-info">
                <h3>Danial Utegenov</h3>
                <p className="founder-title">COO & Product Strategy</p>
                <p className="founder-bio">Analyzing user interaction patterns and optimizing product strategy.</p>
                <a href="https://www.linkedin.com/in/danial-utegenov/" className="linkedin-link" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div className="founder-card">
              <div className="founder-image">
                <img src={AldiyarPic} alt="Aldiyar Alen" className="profile-img" />
              </div>
              <div className="founder-info">
                <h3>Aldiyar Alen</h3>
                <p className="founder-title">CTO & ML Engineer</p>
                <p className="founder-bio">Executing AI research and implementing ML algorithms.</p>
                <a href="https://www.linkedin.com/in/aldiyaralen/" className="linkedin-link" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="vision-section">
          <div className="section-content">
            <h2>Our Vision</h2>
            <p>We envision a future where professional networking is seamless, personalized, and powered by intelligent automation. Our team is committed to building tools that help professionals connect more effectively and build meaningful relationships.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;