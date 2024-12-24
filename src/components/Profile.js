import React from 'react';
import { useAuth } from './AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();

  const getSubscriptionText = (type) => {
    switch(type?.toLowerCase()) {
      case 'premium':
        return 'Premium Plan';
      case 'basic':
      default:
        return 'Basic Plan';
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1>My Profile</h1>
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
      </div>
    </div>
  );
};

export default Profile;