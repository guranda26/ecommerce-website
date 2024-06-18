import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  updateProfile,
  updatePassword,
  getUser,
} from '../../../sdk/profileApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UserContext } from '../../context/userContext';

const Profile: React.FC = () => {
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [changePassword, setChangePassword] = useState(false);
  const { apiRoot } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      const response = await getUser(apiRoot!);
      if (response) setUser(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate, apiRoot]);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleUpdatePassword = async () => {
    try {
      if (user && password.currentPassword && password.newPassword) {
        await updatePassword(user, password, apiRoot!);
        setPassword({ currentPassword: '', newPassword: '' });
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleUpdatePasswordClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    void handleUpdatePassword();
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
          currentPassword: '',
          newPassword: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const updatedUser: Customer = {
              ...user!,
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              dateOfBirth: values.dateOfBirth,
              addresses: [
                {
                  country: values.country,
                  city: values.city,
                  postalCode: values.postalCode,
                },
              ],
            };
            await updateProfile(updatedUser, apiRoot!);
            setSubmitting(false);
          } catch (error) {
            console.error('Error updating profile:', error);
            setSubmitting(false);
          }
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
                Update
              </button>
              <button
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  setEditMode(false);
                  setChangePassword(false);
                }}
              >
                Cancel
              </button>
              <button
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  setChangePassword(!changePassword);
                }}
              >
                {changePassword ? 'Hide password field' : 'Change Password'}
              </button>
            </div>
            {changePassword && (
              <div className="password-wrapper">
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
                    onClick={(e) => {
                      e.preventDefault();
                      setChangePassword(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="button"
                    type="button"
                    onClick={handleUpdatePasswordClick}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Profile;
