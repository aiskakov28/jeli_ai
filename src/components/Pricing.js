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

    try {
      const updatedUser = {
        ...currentUser,
        subscriptionType: plan
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      //Later will connect with banking system
      if (plan === 'pro') {
        alert('Successfully upgraded to Pro subscription!');
      } else if (plan === 'team') {
        alert('Successfully upgraded to Team subscription!');
      } else {
        alert('Successfully switched to Basic subscription.');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription. Please try again.');
    }
  };

  const getButtonText = (plan) => {
    if (!currentUser) {
      return `Get ${plan.charAt(0).toUpperCase() + plan.slice(1)}`;
    }

    const currentPlan = currentUser.subscriptionType;

    if (currentPlan === plan) {
      return 'Current Plan';
    }

    if (plan === 'basic') {
      return currentPlan === 'pro' || currentPlan === 'team'
        ? 'Already Included'
        : 'Get Basic';
    }

    if (plan === 'pro') {
      return currentPlan === 'basic'
        ? 'Upgrade to Pro'
        : currentPlan === 'team'
          ? 'Already Included'
          : 'Get Pro';
    }

    if (plan === 'team') {
      return currentPlan === 'basic' || currentPlan === 'pro'
        ? 'Upgrade to Team'
        : 'Get Team';
    }
  };

  const getButtonClass = (plan) => {
    const baseClass = 'plan-button';
    if (!currentUser) return baseClass;

    const currentPlan = currentUser.subscriptionType;

    if (currentPlan === plan) {
      return `${baseClass} current-plan`;
    }

    if (plan === 'basic' && (currentPlan === 'pro' || currentPlan === 'team')) {
      return `${baseClass} included-plan`;
    }

    if (plan === 'pro' && currentPlan === 'team') {
      return `${baseClass} included-plan`;
    }

    if (currentPlan && plan !== 'basic') {
      return `${baseClass} upgrade-plan`;
    }

    return baseClass;
  };

  return (
    <div className="pricing-container">
      <div className="pricing-grid">
        <div className="pricing-card basic">
          <h2>Basic</h2>
          <div className="price">
            <span className="amount">$10</span>
            <span className="period">/ month</span>
          </div>
          <p className="plan-description">Lorem ipsum doro kitabu</p>
          <button
            onClick={() => handleSubscribe('basic')}
            className={getButtonClass('basic')}
            disabled={currentUser?.subscriptionType === 'basic' ||
                     (currentUser?.subscriptionType === 'pro' ||
                      currentUser?.subscriptionType === 'team')}
          >
            {getButtonText('basic')}
          </button>
          <ul className="features-list">
            <li>Access to GPT-4o mini</li>
            <li>Limited access to GPT-4o</li>
            <li>Limited access to file uploads, advanced data analysis, web browsing, and image generation</li>
            <li>Limited access to o1 and o1-mini</li>
            <li>Super</li>
          </ul>
        </div>

        <div className="pricing-card pro">
          <div className="popular-tag">Most Popular</div>
          <h2>Pro</h2>
          <div className="price">
            <span className="amount">$15</span>
            <span className="period">/ month</span>
          </div>
          <p className="plan-description">Lorem ipsum doro kitabu</p>
          <button
            onClick={() => handleSubscribe('pro')}
            className={getButtonClass('pro')}
            disabled={currentUser?.subscriptionType === 'pro' ||
                     currentUser?.subscriptionType === 'team'}
          >
            {getButtonText('pro')}
          </button>
          <ul className="features-list">
            <li>Access to GPT-4o mini</li>
            <li>Limited access to GPT-4o</li>
            <li>Limited access to file uploads, advanced data analysis, web browsing, and image generation</li>
            <li>Limited access to o1 and o1-mini</li>
            <li>Super</li>
          </ul>
        </div>

        <div className="pricing-card team">
          <h2>Team</h2>
          <div className="price">
            <span className="amount">$40</span>
            <span className="period">/ month</span>
          </div>
          <p className="plan-description">Lorem ipsum doro kitabu</p>
          <button
            onClick={() => handleSubscribe('team')}
            className={getButtonClass('team')}
            disabled={currentUser?.subscriptionType === 'team'}
          >
            {getButtonText('team')}
          </button>
          <ul className="features-list">
            <li>Access to GPT-4o mini</li>
            <li>Limited access to GPT-4o</li>
            <li>Limited access to file uploads, advanced data analysis, web browsing, and image generation</li>
            <li>Limited access to o1 and o1-mini</li>
            <li>Super</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;