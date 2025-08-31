// src/pages/Matches.jsx
import React, { useState, useEffect } from "react";
import SkillCard from "../components/SkillCard";
import "./Matches.css";

// Mock data (can be replaced with API)
const mockMatches = [
  { name: "Alice", skills_offered: ["Guitar"], skills_wanted: ["Python"], profileImage: "/default-avatar.png" },
  { name: "Bob", skills_offered: ["Cooking"], skills_wanted: ["Spanish"], profileImage: "/default-avatar.png" },
  { name: "Charlie", skills_offered: ["Photoshop"], skills_wanted: ["Guitar"], profileImage: "/default-avatar.png" },
  { name: "David", skills_offered: ["Python"], skills_wanted: ["Guitar"], profileImage: "/default-avatar.png" },
  { name: "Eva", skills_offered: ["Guitar"], skills_wanted: ["Cooking"], profileImage: "/default-avatar.png" },
  { name: "Frank", skills_offered: ["JavaScript"], skills_wanted: ["Photoshop"], profileImage: "/default-avatar.png" },
];

const ITEMS_PER_PAGE = 4;

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [filterSkill, setFilterSkill] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMatches(mockMatches);
  }, []);

  // Filter matches by search or skill
  const filteredMatches = matches.filter(
    (match) =>
      match.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterSkill === "" ||
        match.skills_offered.includes(filterSkill) ||
        match.skills_wanted.includes(filterSkill))
  );

  // Pagination
  const totalPages = Math.ceil(filteredMatches.length / ITEMS_PER_PAGE);
  const paginatedMatches = filteredMatches.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRequestSwap = (user) => {
    alert(`Swap request sent to ${user.name}!`);
  };

  return (
    <div className="matches-page fade-in">
      <header className="matches-header">
        <h2>Suggested Matches</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="search-input"
          />

          <select
            value={filterSkill}
            onChange={(e) => { setFilterSkill(e.target.value); setCurrentPage(1); }}
            className="skill-filter"
          >
            <option value="">All Skills</option>
            <option value="Guitar">Guitar</option>
            <option value="Python">Python</option>
            <option value="Cooking">Cooking</option>
            <option value="Spanish">Spanish</option>
            <option value="Photoshop">Photoshop</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>
      </header>

      <div className="matches-grid">
        {paginatedMatches.length ? (
          paginatedMatches.map((match, idx) => (
            <SkillCard key={idx} user={match} onRequestSwap={() => handleRequestSwap(match)} />
          ))
        ) : (
          <p className="no-matches">No matches found.</p>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Matches;
