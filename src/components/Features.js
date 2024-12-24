import React from 'react';
import '../styles/Features.css';

const Features = () => {
  const features = [
    {
      title: "Smart Email Discovery",
      description: "Find professional email addresses instantly through LinkedIn profiles using advanced AI technology."
    },
    {
      title: "Personalized Messaging",
      description: "Generate custom-tailored messages that sound natural and professional."
    },
    {
      title: "Automated Follow-ups",
      description: "Set up intelligent follow-up sequences that maintain engagement."
    }
  ];

  return (
    <section className="features" id="features">
      <h2>Main Features</h2>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;