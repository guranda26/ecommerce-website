import React from 'react';
import './services.css';

function Services(): React.JSX.Element {
  return (
    <section className="services">
      <ul className="services-lists">
        <li className="services-item">
          <div className="services-content">
            <h3 className="services-header">Free Delivery</h3>
            <p className="services-text">
              Free delivery is applicable only for Standard Delivery
            </p>
          </div>
        </li>
        <li className="services-item">
          <div className="services-content">
            <h3 className="services-header">Support 24/7</h3>
            <p className="services-text">
              Get help and find answers to questions as soon as they come
              up—24/7 and in real-time.
            </p>
          </div>
        </li>
        <li className="services-item">
          <div className="services-content">
            <h3 className="services-header">100% Authentic</h3>
            <p className="services-text">
              All products made in accordance with the standards and rules
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Services;
