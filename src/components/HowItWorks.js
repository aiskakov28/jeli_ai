import React, { useEffect, useRef } from 'react';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  const stepsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-it-works-section">
      <div className="section-marker">How It Works</div>
      <h2>Step By Step Instruction To Get Started with Jeli.ai</h2>
      <div className="steps-container">
        {[
          {
            title: 'Write a Prompt',
            description: 'Describe your networking goals or a message idea.'
          },
          {
            title: 'Let Jeli Connect',
            description: 'Jeli reaches out to the right people on LinkedIn.'
          },
          {
            title: 'Build Relationships',
            description: 'Engage with personalized AI-crafted messages.'
          },
          {
            title: 'Grow Your Network',
            description: 'Track your connections and arrange meetings with ease.'
          }
        ].map((step, index) => (
          <div
            key={index}
            className="step"
            ref={(el) => (stepsRef.current[index] = el)}
          >
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;