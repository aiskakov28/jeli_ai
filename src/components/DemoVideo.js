import React from 'react';
import '../styles/DemoVideo.css';
import demoVideo from '../images/vid_jeli.mp4';

const DemoVideo = () => {
  return (
    <section className="demo-section">
      <p className="demo-text">
        We know how time-consuming it is to search for the right connections, send
        personalized messages, and follow up. Jeli eliminates the hassle by doing it all for you.
      </p>
      <div className="demo-content">
        <div className="curved-line left">
          <svg viewBox="0 0 30 100">
            <path d="M15,0 C5,25 25,75 15,100">
              <animate
                attributeName="d"
                dur="3s"
                repeatCount="indefinite"
                values="M15,0 C5,25 25,75 15,100;
                        M15,0 C25,25 5,75 15,100;
                        M15,0 C5,25 25,75 15,100"
              />
            </path>
            <circle cx="15" cy="0" r="3" fill="#212529"/>
            <circle cx="15" cy="100" r="3" fill="#212529"/>
          </svg>
        </div>
        <div className="video-container">
          <video controls>
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="curved-line right">
          <svg viewBox="0 0 30 100">
            <path d="M15,0 C25,25 5,75 15,100">
              <animate
                attributeName="d"
                dur="3s"
                repeatCount="indefinite"
                values="M15,0 C25,25 5,75 15,100;
                        M15,0 C5,25 25,75 15,100;
                        M15,0 C25,25 5,75 15,100"
              />
            </path>
            <circle cx="15" cy="0" r="3" fill="#212529"/>
            <circle cx="15" cy="100" r="3" fill="#212529"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;