import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NetworkList.css';

const NetworkList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('connected');
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [connections, setConnections] = useState([
  {
    id: 1,
    name: 'John Smith',
    title: 'Software Engineer at Google',
    connectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messages: [
      { text: "Thanks for connecting!", sender: "them", time: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      { text: "Would love to chat about opportunities", sender: "you", time: new Date(Date.now() - 30 * 60 * 1000) }
    ],
    hasFollowedUp: false,
    waitingForResponse: false,
    lastMessageFromThem: true
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'Product Manager at Apple',
    connectedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    messages: [],
    hasFollowedUp: false,
    waitingForResponse: false,
    lastMessageFromThem: false
  },
  {
    id: 3,
    name: 'Aldusyan Petrosyan',
    title: 'UI/UX Manager at EPAM',
    connectedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    messages: [
      { text: "Thanks for reaching out!", sender: "them", time: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      { text: "I'd love to discuss opportunities at EPAM", sender: "you", time: new Date(Date.now() - 3 * 60 * 60 * 1000) },
      { text: "Sure! Let's schedule a call next week", sender: "them", time: new Date(Date.now() - 2 * 60 * 60 * 1000) }
    ],
    hasFollowedUp: true,
    waitingForResponse: false,
    lastMessageFromThem: true
  }
]);

  const handleFollowUp = (person) => {
    setSelectedPerson(person);
    setShowPrompt(true);
  };

  const handleFindEmail = () => {
    setEmail(`${selectedPerson.name.toLowerCase().replace(' ', '.')}@example.com`);
  };

  const handleSubmit = () => {
    const newMessage = {
      text: message,
      sender: "you",
      time: new Date()
    };

    const updatedConnections = connections.map(conn =>
      conn.id === selectedPerson.id
        ? {
            ...conn,
            messages: [...conn.messages, newMessage],
            hasFollowedUp: true,
            waitingForResponse: true,
            lastMessageFromThem: false
          }
        : conn
    );

    setConnections(updatedConnections);
    setShowPrompt(false);
    setMessage('');
    setEmail('');
  };

  const getTimeAgo = (date) => {
    const hours = Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60));
    return `${hours} hours ago`;
  };

  const sortedConnections = [...connections].sort((a, b) =>
    b.connectedAt.getTime() - a.connectedAt.getTime()
  );

  const filteredConnections = sortedConnections.filter(conn =>
    activeTab === 'connected' ? !conn.hasFollowedUp : conn.hasFollowedUp
  );

  const canReply = (person) => {
    return person.lastMessageFromThem && !person.waitingForResponse;
  };

  return (
    <div className="network-list">
      <div className="top-spacing"></div>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'connected' ? 'active' : ''}`}
          onClick={() => setActiveTab('connected')}
        >
          Connected
        </button>
        <button
          className={`tab ${activeTab === 'reply' ? 'active' : ''}`}
          onClick={() => setActiveTab('reply')}
        >
          Reply
        </button>
      </div>

      <div className="connections-container">
        {filteredConnections.map(person => (
          <div key={person.id} className="connection-item">
            <div className="connection-info">
              <div className="avatar"></div>
              <div className="person-details">
                <h3>{person.name}</h3>
                <p className="title">{person.title}</p>
                <span className="time-info">
                  {activeTab === 'connected'
                    ? `connected ${getTimeAgo(person.connectedAt)}`
                    : person.messages.length > 0
                      ? `last message ${getTimeAgo(person.messages[person.messages.length - 1].time)}`
                      : 'No messages yet'
                  }
                </span>
                {person.waitingForResponse && (
                  <span className="waiting-response">Waiting for response...</span>
                )}
              </div>
            </div>
            {(activeTab === 'connected' || (activeTab === 'reply' && canReply(person))) && (
              <button
                className="action-btn"
                onClick={() => handleFollowUp(person)}
              >
                {activeTab === 'connected' ? 'Follow Up' : 'Reply'}
              </button>
            )}
          </div>
        ))}
      </div>

      {showPrompt && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{activeTab === 'connected' ? 'Follow up with' : 'Reply to'} {selectedPerson?.name}</h2>
            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="find-email-btn" onClick={handleFindEmail}>
              Find Email
            </button>
            {email && (
              <div className="email-found">
                <p>Email found: {email}</p>
              </div>
            )}
            {activeTab === 'reply' && selectedPerson?.messages.length > 0 && (
              <div className="chat-history">
                <h3>Chat History</h3>
                {selectedPerson.messages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.sender}`}>
                    <p>{msg.text}</p>
                    <span className="message-time">{getTimeAgo(msg.time)}</span>
                  </div>
                ))}
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
  );
};

export default NetworkList;