import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import NetworkList from './NetworkList';
import { useNavigate } from 'react-router-dom';
import othersLogo from '../images/others_logo.png';
import userLogo from '../images/user_logo.png';
import settingsIcon from '../images/settings_icon.png';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('reach');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // Add this line
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [activeSection, setActiveSection] = useState('potential');
  const [message, setMessage] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [email, setEmail] = useState('');
  const [highlightedProfile, setHighlightedProfile] = useState(null);

  const [connections, setConnections] = useState([
    { id: 1, name: 'Zhansar Zhaparov', title: 'Software Engineer at Google', status: 'reach', order: 1 },
    { id: 2, name: 'Arystan Ospanbekov', title: 'Product Manager at Apple', status: 'reach', order: 2 },
    { id: 3, name: 'Karaganda Karaganda', title: 'Data Scientist at Amazon', status: 'pending', order: 3 },
    { id: 4, name: 'Salam Salam', title: 'Frontend Developer at Meta', status: 'pending', order: 4 },
    { id: 5, name: 'Genius Machine', title: 'UI/UX Designer at Netflix', status: 'reach', order: 5 },
  ]);

  const handleReturn = (person) => {
    const maxOrder = Math.max(...connections.map(conn => conn.order));
    setConnections(connections.map(conn =>
      conn.id === person.id
        ? {...conn, status: 'reach', order: maxOrder + 1}
        : conn
    ));
  };

  const handleViewProfile = (person) => {
    setHighlightedProfile(person.id);
    setSelectedPerson(person);
    setShowProfile(true);

    setTimeout(() => {
      setHighlightedProfile(null);
    }, 2000);
  };

  const handleReachOut = (person) => {
    setSelectedPerson(person);
    setShowProfile(false);
    setShowPrompt(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setHighlightedProfile(null);
  };

  const handleSendMessage = () => {
    setConnections(connections.map(conn =>
      conn.id === selectedPerson.id ? {...conn, status: 'pending'} : conn
    ));
    setShowPrompt(false);
    setMessage('');
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="settings-icon" onClick={() => setShowSettings(true)}>
          <img src={settingsIcon} alt="Settings" />
        </div>
        <div className="sidebar-content">
          <button
            className={`nav-item ${activeSection === 'potential' ? 'active' : ''}`}
            onClick={() => setActiveSection('potential')}
          >
            Potential Connects
          </button>
          <button
            className={`nav-item ${activeSection === 'network' ? 'active' : ''}`}
            onClick={() => setActiveSection('network')}
          >
            List of Network
          </button>
        </div>
        <div className="profile-section" onClick={() => navigate('/profile')}>
          <img src={userLogo} alt="Profile" className="profile-picture"/>
          <span className="profile-text">Your Profile</span>
        </div>
      </div>

      <div className="main-content">
        {activeSection === 'potential' && (
          <>
            <div className="tab-container">
              <button
                className={`tab-button ${activeTab === 'reach' ? 'active' : ''}`}
                onClick={() => setActiveTab('reach')}
              >
                Yet to reach out
              </button>
              <button
                className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending
              </button>
            </div>

            <div className="connections-list">
              {connections
                  .filter(conn => activeTab === 'reach' ? conn.status === 'reach' : conn.status === 'pending')
                  .sort((a, b) => a.order - b.order)
                  .map(person => (
                      <div
                          key={person.id}
                          className={`connection-row ${highlightedProfile === person.id ? 'highlighted pulse' : ''}`}
                      >
                        <div
                            className="connection-info"
                            onClick={() => handleViewProfile(person)}
                        >
                          <img
                              src={othersLogo}
                              alt="Profile"
                              className={`connection-avatar ${highlightedProfile === person.id ? 'avatar-highlight' : ''}`}
                          />
                          <div className="connection-details">
                            <span className="connection-name">{person.name}</span>
                            <span className="connection-title">{person.title}</span>
                          </div>
                        </div>
                        <button
                            className={`action-button ${person.status === 'pending' ? 'return-button' : 'reachout-button'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              person.status === 'pending' ? handleReturn(person) : handleReachOut(person);
                            }}
                        >
                          {person.status === 'pending' ? 'Return' : 'Reachout'}
                        </button>
                      </div>
                  ))}
            </div>
          </>
        )}
        {activeSection === 'network' && <NetworkList/>}

        {showProfile && selectedPerson && (
            <div className="modal-overlay" onClick={handleCloseProfile}>
              <div
                  className="modal profile-modal"
                  onClick={e => e.stopPropagation()}
              >
                <div className="modal-header">
                  <img
                      src={othersLogo}
                      alt="Profile"
                      className="modal-avatar"
                  />
                  <div className="modal-title">
                    <h2>{selectedPerson.name}</h2>
                    <p className="title-position">{selectedPerson.title}</p>
                  </div>
                </div>

                <div className="profile-content">
                  <div className="info-section">
                    <div className="info-header">
                      <h3>About</h3>
                    </div>
                    <div className="info-body">
                      <p>Professional with extensive experience in technology sector...</p>
                    </div>
                  </div>

                  <div className="info-section">
                  <div className="info-header">
                      <h3>Current Position</h3>
                    </div>
                    <div className="info-body position-card">
                      <div className="company-info">
                        <h4>{selectedPerson.title}</h4>
                        <span className="duration">2020 - Present</span>
            </div>
            <p className="position-description">
              Leading development initiatives and managing key projects...
            </p>
          </div>
        </div>

        <div className="info-section">
          <div className="info-header">
            <h3>Education</h3>
          </div>
          <div className="info-body education-card">
            <div className="education-info">
              <h4>University of Technology</h4>
              <span className="degree">Bachelor's in Computer Science</span>
              <span className="duration">2016 - 2020</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="info-header">
            <h3>Skills</h3>
          </div>
          <div className="info-body skills-container">
            <span className="skill-tag">Python</span>
            <span className="skill-tag">Machine Learning</span>
            <span className="skill-tag">Data Science</span>
            <span className="skill-tag">Cloud Computing</span>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          className="close-button"
          onClick={handleCloseProfile}
        >
          Close
        </button>
        <button
          className="reachout-button modal-reachout"
          onClick={() => {
            handleCloseProfile();
            handleReachOut(selectedPerson);
          }}
        >
          Reachout
        </button>
      </div>
    </div>
  </div>
        )}

        {showPrompt && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Connect with {selectedPerson?.name}</h2>
              <textarea
                placeholder="Add a personal note to your connection request..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="modal-actions">
                <button
                  className="cancel-button"
                  onClick={() => setShowPrompt(false)}
                >
                  Cancel
                </button>
                <button
                  className="submit-button"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  Send Connection Request
                </button>
              </div>
            </div>
          </div>
        )}

        {showSettings && (
          <div className="modal-overlay" onClick={() => setShowSettings(false)}>
            <div
              className="modal settings-modal"
              onClick={e => e.stopPropagation()}
            >
              <h2>Settings</h2>
              <div className="settings-content">
                <div className="settings-section">
                  <h3>Account Settings</h3>
                </div>
                <div className="settings-section">
                  <h3>Preferences</h3> //work later
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="close-button"
                  onClick={() => setShowSettings(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;