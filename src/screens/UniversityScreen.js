import React, { useState } from 'react';
import './UniversityScreen.css';
import { collegesData, searchColleges } from '../data/collegesData';

const UniversityScreen = ({ onUniversitySelect }) => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Use the comprehensive college database
  const universities = collegesData.sort((a, b) => a.name.localeCompare(b.name));

  const filteredUniversities = searchTerm ? searchColleges(searchTerm) : universities;

  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
  };

  const handleConfirm = () => {
    if (selectedUniversity) {
      onUniversitySelect(selectedUniversity);
    }
  };

  return (
    <div className="university-screen">
      <div className="university-container">
        <h2>Select Your University</h2>
        <p>Choose your university to connect with campus organizations</p>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {selectedUniversity && (
          <div className="continue-section">
            <div className="selected-preview">
              <div className="selected-university">
                <div className="university-logo">
                  <div className="logo-initials">
                    {selectedUniversity.logo}
                  </div>
                </div>
                <div className="university-info">
                  <h4>Selected: {selectedUniversity.name}</h4>
                  <p>{selectedUniversity.type} • {selectedUniversity.state}</p>
                </div>
              </div>
            </div>
            <button onClick={handleConfirm} className="confirm-button">
              Continue with {selectedUniversity.name}
            </button>
          </div>
        )}

        <div className="universities-list">
          {filteredUniversities.map((university) => (
            <div
              key={university.id}
              className={`university-item ${selectedUniversity?.id === university.id ? 'selected' : ''}`}
              onClick={() => handleUniversitySelect(university)}
            >
              <div className="university-logo">
                <div className="logo-initials">
                  {university.logo}
                </div>
              </div>
              <div className="university-info">
                <h3>{university.name}</h3>
                <p>{university.type} • {university.state}</p>
                <div className="greek-count">
                  <span>{university.fraternities.length} Fraternities</span>
                  <span>{university.sororities.length} Sororities</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityScreen; 