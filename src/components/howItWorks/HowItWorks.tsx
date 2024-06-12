import React from 'react';
import './howItWorks.css';

function HowItWorks(): React.JSX.Element {
  const howItWorksText = [
    {
      header: 'Purchase Securely',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      header: 'Ships From Warehouse',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      header: 'Style Your Room',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  return (
    <section className="section howItWorks">
      <h2 className="section-header">How It Works</h2>
      <p className="howItWorks-text-content">
        With Furniture, your furniture can be redistributed to families we serve
        within 72 hours.
      </p>
      <ul className="howItWorks-lists">
        {howItWorksText.map((element, index) => (
          <li className="howItWorks-item" key={index}>
            <h2 className="howItWorks-header">{element.header}</h2>
            <p className="howItWorks-text">{element.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HowItWorks;
