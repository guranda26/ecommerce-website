import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import {
  Customer,
  Address as CommercetoolsAddress,
} from '@commercetools/platform-sdk';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { handleEditBtn, handlechange } from './updateProfile';
import {
  updateProfile,
  updatePassword,
  getUser,
} from '../../../sdk/profileApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface FetchAddress extends CommercetoolsAddress {
  country: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      const apiRoot = userContext.apiRoot;

      const response = await apiRoot.me().get().execute();
      const data: Customer = response.body;
      setUser(data);
      const userAddresses = data.addresses || [];
      userAddresses as Address[];
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  interface Address extends CommercetoolsAddress {
    id: string;
    isDefaultBillingAddress?: boolean;
    isDefaultShippingAddress?: boolean;
  }

  const handleUpdateProfile = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    country: string;
    city: string;
    postalCode: string;
  }) => {
    try {
      const newAddresses: FetchAddress[] = [
        {
          ...user!.addresses[0],
          id: user!.addresses[0].id,
          country: values.country,
          city: values.city,
          postalCode: values.postalCode,
        },
        {
          ...user!.addresses[1],
          id: user!.addresses[1].id,
          country: values.country,
          city: values.city,
          postalCode: values.postalCode,
        },
      ];
      const updatedUser: Customer = {
        ...user!,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        dateOfBirth: values.dateOfBirth,
        addresses: newAddresses,
      };
      setUser(updatedUser);
      await updateProfile(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleUpdatePassword = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      if (user && values.currentPassword && values.newPassword) {
        const passwordUpdated = await updatePassword(user, {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
        if (passwordUpdated) {
          setChangePassword(false);
        }
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <section className="profile">
      <h2 className="section-header">Profile</h2>
      <Formik
        initialValues={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          dateOfBirth: user?.dateOfBirth || '',
          country: user?.addresses[0]?.country || '',
          city: user?.addresses[0]?.city || '',
          postalCode: user?.addresses[0]?.postalCode || '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await handleUpdateProfile(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="profile-form">
            <div className="input-wrapper">
              <label className="profile-label" htmlFor="firstName">
                Firstname:
              </label>
              <Field
                className="field"
                id="firstName"
                type="text"
                name="firstName"
                readOnly={!editMode}
              />
              <button
                className="edit-btn"
                type="button"
                onClick={() => setEditMode(!editMode)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
            <div className="input-wrapper">
              <label className="profile-label" htmlFor="lastName">
                Lastname:
              </label>
              <Field
                className="field"
                id="lastName"
                type="text"
                name="lastName"
                readOnly={!editMode}
              />
              <button
                className="edit-btn"
                type="button"
                onClick={() => setEditMode(!editMode)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
            <div className="input-wrapper">
              <label className="profile-label" htmlFor="email">
                Email:
              </label>
              <Field
                className="field"
                id="email"
                type="email"
                name="email"
                readOnly={!editMode}
              />
              <button
                className="edit-btn"
                type="button"
                onClick={() => setEditMode(!editMode)}
              >
                <FontAwesomeIcon className="edit-img" icon={faEdit} />
              </button>
            </div>
            <div className="input-wrapper">
              <label className="profile-label" htmlFor="dateOfBirth">
                Date of Birth:
              </label>
              <Field
                className="field"
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                readOnly={!editMode}
              />
              <button
                className="edit-btn"
                type="button"
                onClick={() => setEditMode(!editMode)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
            <div className="input-wrapper">
              <label className="profile-label" htmlFor="country">
                Country Code:
              </label>
              <Field
                className="field"
                type="text"
                id="country"
                name="country"
                readOnly={!editMode}
              />
              <button
                className="edit-btn"
                type="button"
                onClick={() => setEditMode(!editMode)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
            <div className="input-wrapper">
              <label className="profile-label" htmlFor="city">
                City:
              </label>
              <Field
                className="field"
                type="text"
                id="city"
                name="city"
                readOnly={!editMode}
              />
              <button
                className="edit-btn"
                type="button"
                onClick={() => setEditMode(!editMode)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
            <div className="input-wrapper">
              <label className="profile-label" htmlFor="postalCode">
                Postal Code:
              </label>
              <Field
                className="field"
                type="text"
                id="postalCode"
                name="postalCode"
                readOnly={!editMode}
              />
              <button
                className="edit-btn"
                type="button"
                onClick={() => setEditMode(!editMode)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
            <div className="button-wrap">
              <button className="button" type="submit" disabled={isSubmitting}>
                Update Profile
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {changePassword && (
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await handleUpdatePassword(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="password-form">
              <div className="input-wrapper">
                <label className="profile-label" htmlFor="currentPassword">
                  Current Password:
                </label>
                <Field
                  className="field"
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Current Password"
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="error"
                />
              </div>
              <div className="input-wrapper">
                <label className="profile-label" htmlFor="newPassword">
                  New Password:
                </label>
                <Field
                  className="field"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="error"
                />
              </div>

              <div className="button-wrap">
                <button
                  className="button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Update Password
                </button>
                <button
                  className="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setChangePassword(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      <button
        className="button"
        onClick={() => setChangePassword(!changePassword)}
      >
        {changePassword ? 'Hide password field' : 'Change Password'}
      </button>
    </section>
  );
};

export default Profile;
