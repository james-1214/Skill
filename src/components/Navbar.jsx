// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="logo">SkillSwap</Link>
        <ul className="nav-links">
          {user ? (
            <>
            <li><Link to="/Dashboard">Dashboard</Link></li>
              <li><Link to="/matches">Matches</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button className="btn-logout" onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
