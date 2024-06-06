import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './Profile.css';

interface Address {
  id: string;
  streetName: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
}

const Profile: React.FC = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiRoot = userContext.apiRoot;

        const response = await apiRoot.me().get().execute();
        const data = response.body;
        setUser(data);

        const userAddresses = data.addresses || [];
        setAddresses(userAddresses);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, userContext.apiRoot]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="profile">
      <h2 className="section-header">Profile</h2>
      <div className="profile_personal-information">
        <h3>Personal Information</h3>
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
      </div>
      <div className="profile_addresses">
        <h3>Addresses</h3>
        {addresses.map((address) => (
          <div key={address.id} className="address">
            <p>{address.streetName}</p>
            <p>{address.city}, {address.state} {address.postalCode}</p>
            <p>{address.country}</p>
            {address.isDefaultBillingAddress && <p><strong>Default Billing Address</strong></p>}
            {address.isDefaultShippingAddress && <p><strong>Default Shipping Address</strong></p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;