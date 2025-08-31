// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/dashboard">Go back to Dashboard</Link>
    </div>
  );
};

export default NotFound;
