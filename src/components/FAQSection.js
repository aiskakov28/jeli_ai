import React, { useState, useEffect } from 'react';
import '../styles/FAQSection.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      const featuresSectionTop = featuresSection.getBoundingClientRect().top;
      if (featuresSectionTop <= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible &&
        <button
          className={`scroll-top-button ${isVisible ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      }
    </>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item" onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <span className="arrow">{isOpen ? '▼' : '▶'}</span>
        {question}
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How does Jeli find the right people to connect with?",
      answer: "Jeli uses advanced AI algorithms to analyze LinkedIn profiles and identify potential connections based on your networking goals, industry, and interests. It considers factors like mutual connections, similar professional backgrounds, and engagement patterns to suggest the most relevant people for your network."
    },
    {
      question: "Can I customize the outreach messages?",
      answer: "Yes! While Jeli generates personalized messages automatically, you have full control over editing and customizing them. You can modify the tone, content, and style of messages to match your personal brand and communication preferences."
    },
    {
      question: "Is Jeli compliant with LinkedIn's terms of service?",
      answer: "Absolutely. Jeli is designed to operate within LinkedIn's guidelines and terms of service. We maintain strict compliance with LinkedIn's automation rules and ensure all interactions are authentic and respectful of platform policies."
    },
    {
      question: "What email providers does Jeli support?",
      answer: "Jeli integrates seamlessly with major email providers including Gmail, Outlook, and custom SMTP servers. This allows you to manage your email outreach alongside your LinkedIn networking efforts in one unified platform."
    }
  ];

  return (
    <section className="faq-section" id="faq-section">
      <div className="section-marker">FAQ</div>
      <h2>Got Questions? We've Got Answers.</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <ScrollToTop />
    </section>
  );
};

export default FAQSection;