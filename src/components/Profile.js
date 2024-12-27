import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const { currentUser, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    linkedinProfile: currentUser?.linkedinProfile || '',
    subscriptionType: currentUser?.subscriptionType || 'basic'
  });

  const getSubscriptionText = (type) => {
    switch(type?.toLowerCase()) {
      case 'team':
        return 'Team Plan';
      case 'pro':
        return 'Pro Plan';
      case 'basic':
      default:
        return 'Basic Plan';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      ...editedProfile
    };
    updateUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      fullName: currentUser?.fullName || '',
      email: currentUser?.email || '',
      linkedinProfile: currentUser?.linkedinProfile || '',
      subscriptionType: currentUser?.subscriptionType || 'basic'
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1>My Profile</h1>

        {!isEditing ? (
          <>
            <p>
              <strong>Name:</strong>
              <span>{currentUser?.fullName}</span>
            </p>
            <p>
              <strong>Email:</strong>
              <span>{currentUser?.email}</span>
            </p>
            <p>
              <strong>LinkedIn Profile:</strong>
              <span>
                {currentUser?.linkedinProfile ? (
                  <a
                    href={currentUser.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                ) : 'Not provided'}
              </span>
            </p>
            <p>
              <strong>Subscription:</strong>
              <span className={`subscription-badge ${currentUser?.subscriptionType?.toLowerCase()}`}>
                {getSubscriptionText(currentUser?.subscriptionType)}
              </span>
            </p>
            <div className="button-group">
              <button onClick={handleEditClick} className="edit-button">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="logout-button">
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="edit-form">
              <p>
                <strong>Name:</strong>
                <input
                  type="text"
                  name="fullName"
                  value={editedProfile.fullName}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </p>
              <p>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </p>
              <p>
                <strong>LinkedIn Profile:</strong>
                <input
                  type="url"
                  name="linkedinProfile"
                  value={editedProfile.linkedinProfile}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </p>
              <p>
                <strong>Subscription:</strong>
                <span className={`subscription-badge ${currentUser?.subscriptionType?.toLowerCase()}`}>
                  {getSubscriptionText(currentUser?.subscriptionType)}
                </span>
              </p>
              <div className="button-group">
                <button onClick={handleCancel} className="cancel-button">
                  Cancel
                </button>
                <button onClick={handleSave} className="save-button">
                  Save Changes
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;