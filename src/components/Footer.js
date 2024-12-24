import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const location = useLocation();

  const handleLinkClick = (e, sectionId) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Jeli.ai</h3>
          <p>Automating professional networking with AI-powered solutions.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/pricing" onClick={() => window.scrollTo(0, 0)}>
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/#features"
                onClick={(e) => handleLinkClick(e, 'features')}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/#how-it-works"
                onClick={(e) => handleLinkClick(e, 'how-it-works')}
              >
                How it Works
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:support@jeli.ai">support@jeli.ai</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Rights Reserved. Jeli.ai</p>
      </div>
    </footer>
  );
};

export default Footer;