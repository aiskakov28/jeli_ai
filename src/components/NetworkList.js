import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import othersLogo from '../images/others_logo.png';
import '../styles/NetworkList.css';

const NetworkList = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('connected');
  const [showMessagePrompt, setShowMessagePrompt] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messageHistory, setMessageHistory] = useState({});

  const [connections, setConnections] = useState([
    {
      id: 1,
      name: 'Utegenov Danial',
      title: 'Executive Janitor',
      status: 'connected',
      messages: []
    },
    {
      id: 2,
      name: 'Utegenov Danial',
      title: 'Janitor Manager',
      status: 'connected',
      messages: []
    },
    {
      id: 3,
      name: 'Utegenov Danial',
      title: 'Janitor Specialist',
      status: 'connected',
      messages: []
    }
  ]);

  const handleMessage = (person) => {
    setSelectedPerson(person);
    setShowMessagePrompt(true);
    // Load message history for this person
    setMessageHistory(prev => ({
      ...prev,
      [person.id]: prev[person.id] || []
    }));
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      // Here we will connect API later
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Connecting LinkedIn Chat History API
      const newMessage = {
        id: Date.now(),
        text: message,
        type: messageType || 'default',
        timestamp: new Date(),
        sender: currentUser.id,
        recipient: selectedPerson.id
      };

      setMessageHistory(prev => ({
        ...prev,
        [selectedPerson.id]: [...(prev[selectedPerson.id] || []), newMessage]
      }));

      // Will adapt to LinkedIn Chat API later
      setConnections(prev =>
        prev.map(conn =>
          conn.id === selectedPerson.id
            ? { ...conn, lastMessage: newMessage }
            : conn
        )
      );

      setShowMessagePrompt(false);
      setMessage('');
      setMessageType('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleMessageTypeSelect = (type) => {
    setMessageType(type);
    // Template messages based on type (later work on that)
    if (type === 'cold_email') {
      setMessage(`Hi ${selectedPerson?.name},\n\nI noticed your work at...`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSendMessage();
    }
  };

  const filteredConnections = connections.filter(conn =>
    activeTab === 'connected'
      ? conn.status === 'connected'
      : conn.status === 'pending'
  ).sort((a, b) => {
    const aLastMessage = messageHistory[a.id]?.slice(-1)[0];
    const bLastMessage = messageHistory[b.id]?.slice(-1)[0];
    return (bLastMessage?.timestamp || 0) - (aLastMessage?.timestamp || 0);
  });

  return (
    <div className="network-list">
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'connected' ? 'active' : ''}`}
          onClick={() => setActiveTab('connected')}
        >
          Connected
        </button>
        <button
          className={`tab-button ${activeTab === 'reply' ? 'active' : ''}`}
          onClick={() => setActiveTab('reply')}
        >
          Reply
        </button>
      </div>

      <div className="connections-list">
        {filteredConnections.map(person => (
          <div key={person.id} className="connection-row">
            <div className="connection-info">
              <img src={othersLogo} alt="Profile" className="connection-avatar"/>
              <div className="connection-details">
                <span className="connection-name">{person.name}</span>
                <span className="connection-title">{person.title}</span>
                {messageHistory[person.id]?.length > 0 && (
                  <span className="last-message">
                    {messageHistory[person.id].slice(-1)[0].text.substring(0, 50)}...
                  </span>
                )}
              </div>
            </div>
            <button
              className="message-button"
              onClick={() => handleMessage(person)}
            >
              Message
            </button>
          </div>
        ))}
      </div>

      {showMessagePrompt && (
        <div className="modal-overlay" onClick={() => setShowMessagePrompt(false)}>
          <div className="message-modal" onClick={e => e.stopPropagation()}>
            <h2>What personalized message would you like to write?</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="depends on the features of our tool"
              autoFocus
            />
            <div className="message-options">
              <div className="option-buttons">
                <button
                  className={`option-button ${messageType === 'cold_email' ? 'active' : ''}`}
                  onClick={() => handleMessageTypeSelect('cold_email')}
                >
                  Cold email
                </button>
                <button
                  className={`option-button ${messageType === 'other' ? 'active' : ''}`}
                  onClick={() => handleMessageTypeSelect('other')}
                >
                  Others
                </button>
                <button className="menu-button">☰</button>
              </div>
              <button
                className={`send-button ${isSending ? 'sending' : ''}`}
                onClick={handleSendMessage}
                disabled={!message.trim() || isSending}
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkList;