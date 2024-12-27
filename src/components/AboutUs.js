import React from 'react';
import '../styles/AboutUs.css';
import AbylayPic from '../images/Abylay_pic.jpeg';
import DanialPic from '../images/Danial_pic.jpeg';
import AldiyarPic from '../images/Aldiyar_pic.jpeg';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="content-wrapper">
        <h1>How It Works?</h1>
        <div className="text-section">
          <p>Office ipsum you must be muted. Get focus note territories emails lunch incentivization organic. Any involved hour tiger hammer assassin. Idea fruit agile stakeholder right heads-up place of ensure. Every win-win-win that's clean three involved native old power. Are tentative value-added competitors need site streamline developing forward. Eod tent watches boardroom optimize closest whatever. Sandwich hill for break brainstorming my. Whatever will business heads-up sorry.</p>
          <p>Last previous performance principles picture ladder and engagement these timepoint. Driver's teeth space dunder feelers horse pups creep playing call. Procrastinating busy activities go point native activities jumping guys. Driving do weeks another floor player-coach get world. Spaces manager minimize seat ipsum needed right. Territories old contribution shoulder tent tomorrow. Pole ballpark another create spaces let's incompetent anomalies air. Important relaxation hop native lean crack wider.</p>
          <p>Third last cause shoot pants. Marketing cta hill ideal anyway unlock tiger key happenings. Moving low one note die nor picture can't. Out teams client comes meat bells submit masking the. Net let's die keep digital client squad is scope out. Kpis blue don't ourselves job base overflow. Teeth out chime anomalies fm. Fast/works support 4-blocker native activities blue waste club overflow. Per initiative plan get heads-up elephant also flies monday respectively.</p>
        </div>

        <div className="founder-cards">
          <div className="founder-card">
            <div className="founder-image-container">
              <img src={AbylayPic} alt="Abylay Iskakov" className="founder-image" />
            </div>
            <div className="founder-info">
              <h3>Abylay Iskakov, <span className="highlight">Co-Founder</span></h3>
              <p>Office ipsum you must be muted. Waste emails donuts boardroom protocol would. Engagement relaxation see downloaded base journey about client. Drive today mindfulness creep land sorry beef driving didn't. Sorry diarize watches deliverables catching working. Businesses synergize die canatics algorithm right us.</p>
            </div>
          </div>

          <div className="founder-card">
            <div className="founder-image-container">
              <img src={DanialPic} alt="Danial Utegenov" className="founder-image" />
            </div>
            <div className="founder-info">
              <h3>Danial Utegenov, <span className="highlight">Co-Founder</span></h3>
              <p>Office ipsum you must be muted. Waste emails donuts boardroom protocol would. Engagement relaxation see downloaded base journey about client. Drive today mindfulness creep land sorry beef driving didn't. Sorry diarize watches deliverables catching working. Businesses synergize die canatics algorithm right us.</p>
            </div>
          </div>

          <div className="founder-card">
            <div className="founder-image-container">
              <img src={AldiyarPic} alt="Aldiyar Alen" className="founder-image" />
            </div>
            <div className="founder-info">
              <h3>Aldiyar Alen, <span className="highlight">Co-Founder</span></h3>
              <p>Office ipsum you must be muted. Waste emails donuts boardroom protocol would. Engagement relaxation see downloaded base journey about client. Drive today mindfulness creep land sorry beef driving didn't. Sorry diarize watches deliverables catching working. Businesses synergize die canatics algorithm right us.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;