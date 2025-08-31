// src/pages/Profile.jsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "./Profile.css";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [skillsOffered, setSkillsOffered] = useState(user.skills_offered || []);
  const [skillsWanted, setSkillsWanted] = useState(user.skills_wanted || []);
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [message, setMessage] = useState("");

  // Handle Save
  const handleSave = () => {
    updateUser({ name, bio, skills_offered: skillsOffered, skills_wanted: skillsWanted, profileImage });
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
    setIsEditing(false);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setProfileImage(imgUrl);
    }
  };

  const handleAddSkill = (skill, type) => {
    if (skill.trim() === "") return;
    if (type === "offered" && !skillsOffered.includes(skill)) setSkillsOffered([...skillsOffered, skill]);
    if (type === "wanted" && !skillsWanted.includes(skill)) setSkillsWanted([...skillsWanted, skill]);
  };

  const handleRemoveSkill = (skill, type) => {
    if (type === "offered") setSkillsOffered(skillsOffered.filter((s) => s !== skill));
    if (type === "wanted") setSkillsWanted(skillsWanted.filter((s) => s !== skill));
  };

  return (
    <div className="profile-page fade-in">
      {message && <p className="success">{message}</p>}

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-image">
          <img src={profileImage || "/default-avatar.png"} alt={name} />
          {isEditing && (
            <label className="upload-btn">
              Change
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
          )}
        </div>

        <div className="profile-info">
          <h2>{name}</h2>
          {!isEditing && (
            <>
              <p className="bio">{bio || "No bio yet..."}</p>
              <div className="stats">
                <div>
                  <strong>{skillsOffered.length}</strong>
                  <span>Skills Offered</span>
                </div>
                <div>
                  <strong>{skillsWanted.length}</strong>
                  <span>Skills Wanted</span>
                </div>
                <div>
                  <strong>{user.credits || 0}</strong>
                  <span>Credits</span>
                </div>
              </div>
              <button className="btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
            </>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="profile-form">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

          <label>Skills Offered</label>
          <div className="skill-tags">
            {skillsOffered.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill} <button onClick={() => handleRemoveSkill(skill, "offered")}>x</button>
              </span>
            ))}
            <input
              placeholder="Add skill"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill(e.target.value, "offered");
                  e.target.value = "";
                }
              }}
            />
          </div>

          <label>Skills Wanted</label>
          <div className="skill-tags">
            {skillsWanted.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill} <button onClick={() => handleRemoveSkill(skill, "wanted")}>x</button>
              </span>
            ))}
            <input
              placeholder="Add skill"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill(e.target.value, "wanted");
                  e.target.value = "";
                }
              }}
            />
          </div>

          <div className="form-actions">
            <button className="btn save" onClick={handleSave}>Save</button>
            <button className="btn cancel" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
