import React from "react";
import "./SkillCard.css";

const SkillCard = ({ user, onRequestSwap, onAddNew }) => {
  // Add New Person Card
  if (!user) {
    return (
      <div className="skill-card add-card" onClick={onAddNew}>
        <div className="add-circle">+</div>
        <p>Add New Person</p>
      </div>
    );
  }

  return (
    <div className="skill-card">
      <div className="profile-pic-wrapper">
        <img src={user.photo || "/default-avatar.png"} alt={user.name} />
      </div>

      <h4>{user.name}</h4>

      <div className="skills-section">
        <div className="skills-offered">
          <span className="section-title">Offers:</span>
          {user.skills_offered.map((skill, idx) => (
            <span key={idx} className="badge offered">{skill}</span>
          ))}
        </div>

        <div className="skills-wanted">
          <span className="section-title">Wants:</span>
          {user.skills_wanted.map((skill, idx) => (
            <span key={idx} className="badge wanted">{skill}</span>
          ))}
        </div>
      </div>

      <button className="btn-swap" onClick={onRequestSwap}>
        Request Swap
      </button>
    </div>
  );
};

export default SkillCard;
