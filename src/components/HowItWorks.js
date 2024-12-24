import React from 'react';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      description: "Connect your LinkedIn account and select your target connections"
    },
    {
      number: 2,
      description: "Our AI discovers professional email addresses and generates personalized messages"
    },
    {
      number: 3,
      description: "Review and send messages with one click, while we handle the follow-ups"
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        {steps.map((step) => (
          <div key={step.number} className="step">
            <div className="step-number">{step.number}</div>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;