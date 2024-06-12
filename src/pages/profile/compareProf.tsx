import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import {
  Customer,
  Address as CommercetoolsAddress,
} from '@commercetools/platform-sdk';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface Address extends CommercetoolsAddress {
  id: string;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
}

const Profile: React.FC = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState<Customer | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const apiRoot = userContext.apiRoot;

  const fetchUser = useCallback(async () => {
    try {
      const apiRoot = userContext.apiRoot;

      const response = await apiRoot.me().get().execute();
      const data: Customer = response.body;
      setUser(data);

      const userAddresses = data.addresses || [];
      setAddresses(userAddresses as Address[]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate, userContext.apiRoot]);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="profile">
      <h2 className="section-header">Profile</h2>
      <form className="profile-form">
        <div className="input-wrapper">
          <label className="profile-label" htmlFor="first-name">
            Firstname:
          </label>
          <input
            className="field"
            id={'first-name'}
            type="text"
            value={user!.firstName}
            readOnly
          />
          <button className="edit-btn">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div className="input-wrapper">
          <label className="profile-label" htmlFor="last-name">
            Lastname:
          </label>
          <input
            className="field"
            type="text"
            id="last-name"
            value={user!.lastName}
            readOnly
          />
          <button className="edit-btn">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div className="input-wrapper">
          <label className="profile-label" htmlFor="first-name">
            Email:
          </label>
          <input className="field" type="email" value={user!.email} readOnly />
          <button className="edit-btn">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div className="input-wrapper">
          <label className="profile-label" htmlFor="password">
            Password:
          </label>
          <input
            className="field"
            type="password"
            id="password"
            value={user!.password}
            readOnly
          />
          <button className="edit-btn">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div className="input-wrapper">
          <label className="profile-label" htmlFor="dateOfBirth">
            Date of Birth:
          </label>
          <input
            className="field"
            type="date"
            id="dateOfBirth"
            value={user!.dateOfBirth}
            readOnly
          />
          <button className="edit-btn">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>

        <div className="input-wrapper">
          <label className="profile-label" htmlFor="country">
            Country Code:
          </label>
          <input
            className="field"
            type="text"
            id="country"
            value={user!.addresses[0].country}
            readOnly
          />
          <button className="edit-btn">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>

        <div className="input-wrapper">
          <label className="profile-label" htmlFor="city">
            City:
          </label>
          <input
            className="field"
            type="text"
            id="city"
            value={user!.addresses[0].city}
            readOnly
          />
          <button className="edit-btn">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div className="input-wrapper">
          <label className="profile-label" htmlFor="postal">
            Postal Code:
          </label>
          <input
            className="field"
            type="text"
            id="postal"
            value={user!.addresses[0].postalCode}
            readOnly
          />
          <button className="edit-btn">
            <FontAwesomeIcon className="edit-img" icon={faEdit} />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
