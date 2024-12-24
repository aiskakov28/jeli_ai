import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={handleLogoClick}>
        Jeli.ai
      </Link>
      <div className="nav-links">
        <Link to="/about">About Us</Link>
        <Link to="/pricing">Pricing</Link>
        {currentUser ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">My Profile</Link>
            <button onClick={handleLogout} className="cta-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/signin" className="cta-button">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;