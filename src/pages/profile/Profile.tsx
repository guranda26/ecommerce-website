import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { Customer } from '@commercetools/platform-sdk';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { handleEditBtn, handlechange } from './updateProfile';
import { updateProfile, updatePassword } from '../../../sdk/profileApi';

const Profile: React.FC = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [changePassword, setChangePassword] = useState(false);
  const navigate = useNavigate();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const countryRef = useRef(null);
  const cityRef = useRef(null);
  const postalCodeRef = useRef(null);

  const fetchUser = useCallback(async () => {
    try {
      const apiRoot = userContext.apiRoot;

      const response = await apiRoot.me().get().execute();
      const data: Customer = response.body;
      setUser(data);
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

  const handleUpdateBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    void updateProfile(user!);
  };

  const handleUpdatePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    void updatePassword(user!, password);
  };

  const handlePasswordInput = (element: HTMLInputElement) => {
    setPassword((prev) => {
      return {
        ...prev,
        [element.name]: element.value,
      };
    });
  };

  const handleChangePasswordBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setChangePassword(!changePassword);
  };

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
            name="firstName"
            value={user!.firstName}
            ref={firstNameRef}
            onChange={(e) =>
              handlechange(
                e.target,
                setUser as React.Dispatch<React.SetStateAction<Customer>>
              )
            }
            readOnly
          />
          <button
            className="edit-btn"
            onClick={(e) => handleEditBtn(e, firstNameRef.current!)}
          >
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
            name="lastName"
            value={user!.lastName}
            ref={lastNameRef}
            onChange={(e) =>
              handlechange(
                e.target,
                setUser as React.Dispatch<React.SetStateAction<Customer>>
              )
            }
            readOnly
          />
          <button
            className="edit-btn"
            onClick={(e) => handleEditBtn(e, lastNameRef.current!)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div className="input-wrapper">
          <label className="profile-label" htmlFor="first-name">
            Email:
          </label>
          <input
            className="field"
            type="email"
            name="email"
            value={user!.email}
            ref={emailRef}
            onChange={(e) =>
              handlechange(
                e.target,
                setUser as React.Dispatch<React.SetStateAction<Customer>>
              )
            }
            readOnly
          />
          <button
            className="edit-btn"
            onClick={(e) => handleEditBtn(e, emailRef.current!)}
          >
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
            ref={dateOfBirthRef}
            name="dateOfBirth"
            onChange={(e) =>
              handlechange(
                e.target,
                setUser as React.Dispatch<React.SetStateAction<Customer>>
              )
            }
            readOnly
          />
          <button
            className="edit-btn"
            onClick={(e) => handleEditBtn(e, dateOfBirthRef.current!)}
          >
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
            name="country"
            value={user!.addresses[0].country}
            ref={countryRef}
            onChange={(e) =>
              handlechange(
                e.target,
                setUser as React.Dispatch<React.SetStateAction<Customer>>
              )
            }
            readOnly
          />
          <button
            className="edit-btn"
            onClick={(e) => handleEditBtn(e, countryRef.current!)}
          >
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
            name="city"
            value={user!.addresses[0].city}
            ref={cityRef}
            onChange={(e) =>
              handlechange(
                e.target,
                setUser as React.Dispatch<React.SetStateAction<Customer>>
              )
            }
            readOnly
          />
          <button
            className="edit-btn"
            onClick={(e) => handleEditBtn(e, cityRef.current!)}
          >
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
            name="postalCode"
            value={user!.addresses[0].postalCode}
            ref={postalCodeRef}
            onChange={(e) =>
              handlechange(
                e.target,
                setUser as React.Dispatch<React.SetStateAction<Customer>>
              )
            }
            readOnly
          />
          <button
            className="edit-btn"
            onClick={(e) => handleEditBtn(e, postalCodeRef.current!)}
          >
            <FontAwesomeIcon className="edit-img" icon={faEdit} />
          </button>
        </div>
        <div className="button-wrap">
          <button className="button" onClick={(e) => handleUpdateBtn(e)}>
            Update
          </button>
          <button
            className="button"
            onClick={(e) => handleChangePasswordBtn(e)}
          >
            {changePassword ? 'Hide password field' : 'Change Password'}
          </button>
        </div>
        {changePassword && (
          <div className="password-warrapper">
            <label className="profile-label" htmlFor="password">
              Password:
            </label>
            <input
              className="field"
              type="password"
              id="password"
              name="currentPassword"
              onChange={(e) => handlePasswordInput(e.target)}
            />

            <label className="profile-label" htmlFor="newpassword">
              New Password:
            </label>
            <input
              className="field"
              type="password"
              id="newpassword"
              name="newPassword"
              onChange={(e) => handlePasswordInput(e.target)}
            />
            <span></span>
            <div className="button-wrap">
              <button
                className="button"
                onClick={(e) => handleUpdatePassword(e)}
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default Profile;
