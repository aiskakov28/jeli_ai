import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import NetworkList from './NetworkList';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('reach');
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [activeSection, setActiveSection] = useState('potential');
  const [message, setMessage] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [email, setEmail] = useState('');
  const [connections, setConnections] = useState([
    { id: 1, name: 'Zhansar Zhaparov', title: 'Software Engineer at Google', status: 'reach' },
    { id: 2, name: 'Arystan Ospanbekov', title: 'Product Manager at Apple', status: 'reach' },
    { id: 3, name: 'Karaganda Karaganda', title: 'Data Scientist at Amazon', status: 'pending' },
    { id: 4, name: 'Salam Salam', title: 'Frontend Developer at Meta', status: 'pending' },
    { id: 5, name: 'Genius Machine', title: 'UI/UX Designer at Netflix', status: 'reach' },
  ]);

  const handleReachOut = (person) => {
    setSelectedPerson(person);
    setShowPrompt(true);
  };

  const handleFindEmail = () => {
    setEmail('zhansar.zhaparov@example.com');
  };

  const handleGetAISuggestion = () => {
    setAiSuggestion(
      "Hi Zhansar, I noticed your impressive work at Google. I'd love to connect and learn more about your experience in software engineering. Best regards, [Your Name]"
    );
  };

  const handleSubmit = () => {
    setConnections(connections.map(conn =>
      conn.id === selectedPerson.id ? {...conn, status: 'pending'} : conn
    ));
    setShowPrompt(false);
    setMessage('');
    setEmail('');
    setAiSuggestion('');
  };

  const toggleStatus = (person) => {
    setConnections(connections.map(conn =>
      conn.id === person.id ? {...conn, status: conn.status === 'pending' ? 'reach' : 'pending'} : conn
    ));
  };

  const filteredConnections = connections.filter(conn =>
    activeTab === 'reach' ? conn.status === 'reach' : conn.status === 'pending'
  );

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="welcome-message">
          Welcome to <a href="http://Jeli.ai">Jeli.ai</a> Dashboard, {currentUser?.fullName}!
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
          <div className="profile-picture"></div>
          <span className="profile-text">Your Profile</span>
        </div>
      </div>

      <div className="main-content">
        {activeSection === 'potential' ? (
          <>
            <div className="top-spacing"></div>
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'reach' ? 'active' : ''}`}
                onClick={() => setActiveTab('reach')}
              >
                Yet to reach out
              </button>
              <button
                className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending
              </button>
            </div>

            <div className="connections-list">
              {filteredConnections.map(person => (
                <div key={person.id} className="connection-item">
                  <div className="connection-info">
                    <div className="avatar"></div>
                    <div className="person-details">
                      <h3>{person.name}</h3>
                      <p>{person.title}</p>
                    </div>
                  </div>
                  <button
                    className={`reachout-btn ${person.status === 'pending' ? 'pending' : ''}`}
                    onClick={() => person.status === 'pending' ? toggleStatus(person) : handleReachOut(person)}
                  >
                    {person.status === 'pending' ? 'Pending' : 'Reachout'}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <NetworkList />
        )}

        {showPrompt && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Reach out to {selectedPerson?.name}</h2>
              <textarea
                placeholder="What would you like to reach out about?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="ai-suggest-btn" onClick={handleGetAISuggestion}>
                Get AI Suggestion
              </button>
              {aiSuggestion && (
                <div className="ai-suggestion">
                  <h3>AI Suggested Message:</h3>
                  <p>{aiSuggestion}</p>
                </div>
              )}
              <button className="find-email-btn" onClick={handleFindEmail}>
                Find Email
              </button>
              {email && (
                <div className="email-found">
                  <p>Email found: {email}</p>
                </div>
              )}
              <div className="modal-actions">
                <button className="cancel" onClick={() => setShowPrompt(false)}>
                  Cancel
                </button>
                <button
                  className="submit"
                  onClick={handleSubmit}
                  disabled={!message.trim()}
                >
                  Submit
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