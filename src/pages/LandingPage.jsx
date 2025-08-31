import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Swap Skills. Build Connections.</h1>
          <p>
            A platform where people exchange skills, collaborate, and grow
            together — without spending a dime.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://illustrations.popsy.co/gray/community.svg"
            alt="Skill Sharing"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why SkillSwap?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://illustrations.popsy.co/gray/light-bulb.svg" alt="Learn" />
            <h3>Learn Anything</h3>
            <p>Find mentors & peers ready to share their expertise.</p>
          </div>
          <div className="feature-card">
            <img src="https://illustrations.popsy.co/gray/teamwork.svg" alt="Teach" />
            <h3>Share Skills</h3>
            <p>Teach your skills to others and earn trust in the community.</p>
          </div>
          <div className="feature-card">
            <img src="https://illustrations.popsy.co/gray/handshake.svg" alt="Connect" />
            <h3>Grow Together</h3>
            <p>Build meaningful connections through knowledge exchange.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-banner">
        <h2>Start swapping skills today!</h2>
        <Link to="/register" className="btn btn-primary">Join Now</Link>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
