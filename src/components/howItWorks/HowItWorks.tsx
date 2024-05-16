import React from 'react';
import './howItWorks.css';

function HowItWorks(): React.JSX.Element {
  return (
    <section className="section howItWorks">
      <h2 className="section-header">How It Works</h2>
      <p className="section-text">
        With Furniture, your furniture can be redistributed to families we serve
        within 72 hours.
      </p>
      <ul className="howItWorks-lists">
        <li className="howItWorks-item">
          <h2 className="howItWorks-header">Purchase Securely</h2>
          <p className="howItWorks-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </li>
        <li className="howItWorks-item">
          <h2 className="howItWorks-header">Ships From Warehouse</h2>
          <p className="howItWorks-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </li>
        <li className="howItWorks-item">
          <h2 className="howItWorks-header">Style Your Room</h2>
          <p className="howItWorks-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default HowItWorks;
