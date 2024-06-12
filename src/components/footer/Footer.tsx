import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import { routes } from '../../modules/routes';

function Footer(): React.JSX.Element {
  return (
    <footer className="footer">
      <ul className="footer-lists">
        <li className="footer-item">
          <Link className="footer-link" to={routes.home}>
            Home
          </Link>
        </li>
        <li className="footer-item">
          <Link className="footer-link" to={routes.catalog}>
            Catalog
          </Link>
        </li>
        <li className="footer-item">
          <Link className="footer-link" to={routes.about}>
            About us
          </Link>
        </li>
      </ul>

      <div className="contributors">
        <h3 className="contributors-header">Contributors:</h3>
        <Link className="footer-link" to="https://github.com/guranda26">
          Guranda
        </Link>
        <Link className="footer-link" to="https://github.com/inafk">
          Ina
        </Link>
        <Link className="footer-link" to="https://github.com/sabohatfrontend">
          Sabokhat
        </Link>
      </div>
      <div className="footer-left">
        <p>2024</p>
        <Link className="footer-link" to="https://rs.school/">
          The Rolling Scopes School
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
