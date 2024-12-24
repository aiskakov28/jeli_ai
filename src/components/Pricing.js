import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../styles/Pricing.css';

const Pricing = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  const handleSubscribe = async (plan) => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    if (currentUser.subscriptionType === plan) {
      alert(`You already have ${plan.charAt(0).toUpperCase() + plan.slice(1)} subscription`);
      return;
    }

    // Simulating an API call to update subscription
    try {
      // Here you would typically make an API call to your backend
      // to handle the subscription change and payment processing

      // For demo purposes, we'll just update the local state
      const updatedUser = {
        ...currentUser,
        subscriptionType: plan
      };

      // Update localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update context
      setCurrentUser(updatedUser);

      // Show success message
      if (plan === 'premium') {
        alert('Successfully upgraded to Premium subscription!');
      } else {
        alert('Successfully downgraded to Basic subscription.');
      }

      // Optional: Redirect to dashboard or profile
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription. Please try again.');
    }
  };

  const getButtonText = (plan) => {
    if (currentUser?.subscriptionType === plan) {
      return 'Current Plan';
    }
    if (plan === 'basic') {
      return currentUser?.subscriptionType === 'premium' ? 'Already Have These Features' : 'Get Started';
    }
    if (plan === 'premium') {
      return currentUser?.subscriptionType === 'basic' ? 'Upgrade to Premium' : 'Get Premium';
    }
    return 'Select Plan';
  };

  const getButtonClass = (plan) => {
    const baseClass = `subscribe-button ${plan === 'premium' ? 'premium' : ''}`;
    if (currentUser?.subscriptionType === plan) {
      return `${baseClass} current-plan`;
    }
    if (currentUser?.subscriptionType === 'premium' && plan === 'basic') {
      return `${baseClass} downgrade`;
    }
    return baseClass;
  };

  return (
    <div className="pricing-container">
      <h1>Choose Your Plan</h1>
      <div className="pricing-grid">
        <div className="pricing-card">
          <h2>Basic</h2>
          <div className="price">
            <span className="amount">$10</span>
            <span className="period">/month</span>
          </div>
          <ul className="features-list">
            <li>Up to 100 AI-generated messages</li>
            <li>Basic email finder</li>
            <li>Standard templates</li>
            <li>Basic analytics</li>
            <li>Email support</li>
          </ul>
          <button
            onClick={() => handleSubscribe('basic')}
            className={getButtonClass('basic')}
            disabled={currentUser?.subscriptionType === 'basic'}
          >
            {getButtonText('basic')}
          </button>
        </div>

        <div className="pricing-card premium">
          <div className="popular-tag">Most Popular</div>
          <h2>Premium</h2>
          <div className="price">
            <span className="amount">$20</span>
            <span className="period">/month</span>
          </div>
          <ul className="features-list">
            <li>Unlimited AI-generated messages</li>
            <li>Advanced email finder</li>
            <li>Custom templates</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
            <li>Team collaboration</li>
            <li>API access</li>
          </ul>
          <button
            onClick={() => handleSubscribe('premium')}
            className={getButtonClass('premium')}
            disabled={currentUser?.subscriptionType === 'premium'}
          >
            {getButtonText('premium')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;