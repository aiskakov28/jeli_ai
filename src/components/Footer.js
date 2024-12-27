import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import linkedinIcon from '../images/linkedin_icon.png';
import emailIcon from '../images/email_icon.png';
import '../styles/Footer.css';

const Footer = () => {
  const location = useLocation();

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const section = document.querySelector(sectionId);
      if (section) {
        const headerOffset = 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      window.location.href = `/${sectionId}`;
    }
  };

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <div className="brand-content">
            <h2>Jeli.ai</h2>
            <div className="brand-tagline">
              <span>LinkedIn Networking</span>
              <span>Made Absurdly Faster</span>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about" onClick={() => handleNavigation('/about')}>About Us</Link></li>
            <li><Link to="/contact" onClick={() => handleNavigation('/contact')}>Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Product</h3>
          <ul>
            <li><Link to="/pricing" onClick={() => handleNavigation('/pricing')}>Pricing</Link></li>
            <li><Link to="/" onClick={(e) => scrollToSection(e, '.faq-section')}>FAQ</Link></li>
            <li><Link to="/feature-request" onClick={() => handleNavigation('/feature-request')}>Feature Request</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><Link to="/terms" onClick={() => handleNavigation('/terms')}>Terms of Service</Link></li>
            <li><Link to="/privacy" onClick={() => handleNavigation('/privacy')}>Privacy Policy</Link></li>
            <li><Link to="/refund" onClick={() => handleNavigation('/refund')}>Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Jeli. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
          <a href="mailto:contact@jeli.ai">
            <img src={emailIcon} alt="Email" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;