import React, { useState } from 'react';
import './UniversityScreen.css';

const UniversityScreen = ({ onUniversitySelect }) => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const universities = [
    {
      id: 1,
      name: 'University of California, Berkeley',
      type: 'Public University',
      initials: 'UCB'
    },
    {
      id: 2,
      name: 'Stanford University',
      type: 'Private University',
      initials: 'SU'
    },
    {
      id: 3,
      name: 'University of California, Los Angeles',
      type: 'Public University',
      initials: 'UCLA'
    },
    {
      id: 4,
      name: 'University of Southern California',
      type: 'Private University',
      initials: 'USC'
    },
    {
      id: 5,
      name: 'University of California, San Diego',
      type: 'Public University',
      initials: 'UCSD'
    },
    {
      id: 6,
      name: 'University of California, Davis',
      type: 'Public University',
      initials: 'UCD'
    },
    {
      id: 7,
      name: 'University of California, Irvine',
      type: 'Public University',
      initials: 'UCI'
    },
    {
      id: 8,
      name: 'University of California, Santa Barbara',
      type: 'Public University',
      initials: 'UCSB'
    },
    {
      id: 9,
      name: 'University of California, Santa Cruz',
      type: 'Public University',
      initials: 'UCSC'
    },
    {
      id: 10,
      name: 'University of California, Riverside',
      type: 'Public University',
      initials: 'UCR'
    },
    {
      id: 11,
      name: 'University of California, Merced',
      type: 'Public University',
      initials: 'UCM'
    },
    {
      id: 12,
      name: 'California State University, Long Beach',
      type: 'Public University',
      initials: 'CSULB'
    },
    {
      id: 13,
      name: 'California State University, Fullerton',
      type: 'Public University',
      initials: 'CSUF'
    },
    {
      id: 14,
      name: 'California State University, Northridge',
      type: 'Public University',
      initials: 'CSUN'
    },
    {
      id: 15,
      name: 'San Diego State University',
      type: 'Public University',
      initials: 'SDSU'
    },
    {
      id: 16,
      name: 'San Jose State University',
      type: 'Public University',
      initials: 'SJSU'
    },
    {
      id: 17,
      name: 'California Polytechnic State University',
      type: 'Public University',
      initials: 'CalPoly'
    },
    {
      id: 18,
      name: 'University of San Francisco',
      type: 'Private University',
      initials: 'USF'
    },
    {
      id: 19,
      name: 'Santa Clara University',
      type: 'Private University',
      initials: 'SCU'
    },
    {
      id: 20,
      name: 'Loyola Marymount University',
      type: 'Private University',
      initials: 'LMU'
    },
    {
      id: 21,
      name: 'Rutgers University',
      type: 'Public University',
      initials: 'RU'
    },
    {
      id: 22,
      name: 'University of Miami',
      type: 'Private University',
      initials: 'UM'
    },
    {
      id: 23,
      name: 'Tulane University',
      type: 'Private University',
      initials: 'TU'
    },
    {
      id: 24,
      name: 'University of Alabama',
      type: 'Public University',
      initials: 'UA'
    },
    {
      id: 25,
      name: 'Auburn University',
      type: 'Public University',
      initials: 'AU'
    },
    {
      id: 26,
      name: 'University of Florida',
      type: 'Public University',
      initials: 'UF'
    },
    {
      id: 27,
      name: 'University of Georgia',
      type: 'Public University',
      initials: 'UGA'
    },
    {
      id: 28,
      name: 'Louisiana State University',
      type: 'Public University',
      initials: 'LSU'
    },
    {
      id: 29,
      name: 'University of Kentucky',
      type: 'Public University',
      initials: 'UK'
    },
    {
      id: 30,
      name: 'University of Mississippi',
      type: 'Public University',
      initials: 'Ole Miss'
    },
    {
      id: 31,
      name: 'Mississippi State University',
      type: 'Public University',
      initials: 'MSU'
    },
    {
      id: 32,
      name: 'University of Missouri',
      type: 'Public University',
      initials: 'Mizzou'
    },
    {
      id: 33,
      name: 'University of South Carolina',
      type: 'Public University',
      initials: 'USC'
    },
    {
      id: 34,
      name: 'University of Tennessee',
      type: 'Public University',
      initials: 'UT'
    },
    {
      id: 35,
      name: 'Texas A&M University',
      type: 'Public University',
      initials: 'TAMU'
    },
    {
      id: 36,
      name: 'Vanderbilt University',
      type: 'Private University',
      initials: 'VU'
    }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1>Select Your University</h1>
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
                    {selectedUniversity.initials}
                  </div>
                </div>
                <div className="university-info">
                  <h4>Selected: {selectedUniversity.name}</h4>
                  <p>{selectedUniversity.type}</p>
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
                  {university.initials}
                </div>
              </div>
              <div className="university-info">
                <h3>{university.name}</h3>
                <p>{university.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityScreen; 