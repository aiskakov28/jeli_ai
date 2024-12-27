import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import userLogo from '../images/user_logo.png';
import '../styles/Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate('/');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const renderAuthButton = () => {
    if (location.pathname === '/signin') {
      return (
        <Link to="/signup" className="cta-button">
          Sign Up
        </Link>
      );
    }
    if (currentUser) {
      return (
        <Link
          to="/dashboard"
          className={`cta-button ${isActive('/dashboard') ? 'active' : ''}`}
        >
          Dashboard
        </Link>
      );
    }
    return (
      <Link to="/signin" className="cta-button">
        Sign In
      </Link>
    );
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={handleLogoClick}>
        Jeli
      </Link>
      <div className="nav-links">
        <Link
          to="/about"
          className={`nav-link ${isActive('/about') ? 'active' : ''}`}
        >
          About Us
        </Link>
        <Link
          to="/pricing"
          className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}
        >
          Pricing
        </Link>
        {renderAuthButton()}
      </div>
      {currentUser && (
    <div className="profile-icon">
    <img src={userLogo} alt="Profile" onClick={handleProfileClick}/>
    </div>
      )}
    </nav>
  );
};

export default Navbar;