import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import SkillCard from "../components/SkillCard";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const [recentMatches, setRecentMatches] = useState([
    { name: "Alice", skills_offered: ["Guitar"], skills_wanted: ["Python"], photo: "/avatars/alice.jpg" },
    { name: "Bob", skills_offered: ["Cooking"], skills_wanted: ["Spanish"], photo: "/avatars/bob.jpg" },
    { name: "Charlie", skills_offered: ["Photoshop"], skills_wanted: ["Guitar"], photo: "/avatars/charlie.jpg" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", skills_offered: "", skills_wanted: "", photo: null });

  const handleRequestSwap = (matchUser) => alert(`Swap request sent to ${matchUser.name}!`);

  const handleOpenAddModal = () => setShowAddModal(true);

  const handleAddNewUserSubmit = () => {
    if (!newUser.name || !newUser.skills_offered || !newUser.skills_wanted) return;
    const photoURL = newUser.photo ? URL.createObjectURL(newUser.photo) : "/default-avatar.png";

    setRecentMatches([
      ...recentMatches,
      {
        name: newUser.name,
        skills_offered: newUser.skills_offered.split(",").map(s => s.trim()),
        skills_wanted: newUser.skills_wanted.split(",").map(s => s.trim()),
        photo: photoURL,
      },
    ]);

    setNewUser({ name: "", skills_offered: "", skills_wanted: "", photo: null });
    setShowAddModal(false);
  };

  return (
    <div className="dashboard-page fade-in">
      <header className="dashboard-header">
        <h2>Welcome, {user.name}!</h2>
        <p>Discover new skills or share yours today.</p>
      </header>

      <section className="dashboard-summary">
        <div className="summary-card">
          <h3>Credits</h3>
          <p>{user.credits || 0}</p>
        </div>
        <div className="summary-card">
          <h3>Badges</h3>
          <p>{user.badges?.length ? user.badges.join(", ") : "No badges yet"}</p>
        </div>
      </section>

      <section className="recent-matches">
        <h3>Recent Matches</h3>
        <div className="matches-grid">
          {recentMatches.map((match, idx) => (
            <SkillCard
              key={idx}
              user={match}
              onRequestSwap={() => handleRequestSwap(match)}
            />
          ))}

          {/* Add New Person Card */}
          <div className="skill-card add-card" onClick={handleOpenAddModal}>
            <div className="add-icon">+</div>
            <p>Add New Person</p>
          </div>
        </div>
      </section>

      {/* Add New User Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Person</h3>
            <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            <input type="text" placeholder="Skills Offered (comma separated)" value={newUser.skills_offered} onChange={(e) => setNewUser({ ...newUser, skills_offered: e.target.value })} />
            <input type="text" placeholder="Skills Wanted (comma separated)" value={newUser.skills_wanted} onChange={(e) => setNewUser({ ...newUser, skills_wanted: e.target.value })} />
            <input type="file" accept="image/*" onChange={(e) => setNewUser({ ...newUser, photo: e.target.files[0] })} />
            <div className="modal-buttons">
              <button className="btn-submit" onClick={handleAddNewUserSubmit}>Add User</button>
              <button className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
