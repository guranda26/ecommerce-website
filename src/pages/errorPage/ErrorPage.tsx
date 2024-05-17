import { ErrorResponse, NavLink, useRouteError } from 'react-router-dom';
import errorImage from '../../assets/images/404-error.png';
import planetImage from '../../assets/images/planet.png';
import './errorPage.css';

function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  if (error.status === 404) {
    return (
      <div className="error-container">
        <img
          className="error-img"
          src={errorImage}
          alt="Error page image"
          width={400}
          height={400}
        />
        <h2 className="header-content">PageNotFound</h2>
        <NavLink className="home-page-btn button" to={'./'}>
          Home Page
        </NavLink>
      </div>
    );
  }
  return (
    <div className="error-container">
      <img src={planetImage} alt="Error page image" width={400} height={400} />
      <h2 className="header-content">Something went wrong:</h2>
      <NavLink className="home-page-btn button" to={'./'}>
        Home Page
      </NavLink>
    </div>
  );
}

export default ErrorPage;
