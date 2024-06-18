import React, { useState, useEffect, useContext } from 'react';
import { FaHome } from 'react-icons/fa';
import { createCustomer } from '../../../sdk/customerApi';
import { CustomerSignInResult } from '@commercetools/platform-sdk';

import {
  CustomerData,
  Address,
  FormErrors,
  CustomError,
} from '../../Interfaces/CustomerInterface';
import {
  isEmailValid,
  isPasswordValid,
  isNameValid,
  isDateOfBirthValid,
  isSimpleTextValid,
  isPostalCodeValid,
  CountryCode,
  isCityValid,
} from '../../modules/validationUtils';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Tooltip from '@mui/material/Tooltip';

const validCountries: CountryCode[] = [
  'CA',
  'FR',
  'GE',
  'DE',
  'US',
  'PL',
  'UZ',
];

export const countryNames: { [key in CountryCode]: string } = {
  CA: 'Canada',
  FR: 'France',
  GE: 'Georgia',
  DE: 'Germany',
  US: 'United States',
  PL: 'Poland',
  UZ: 'Uzbekistan',
};

import './Register.css';
import { isExist } from '../../../sdk/myToken';
import { UserContext } from '../../context/userContext';
import { clientWithPassword } from '../../../sdk/createClient';
import { routes } from '../../modules/routes';

import TextInput from '../../components/TextInput/TextInput';
import ErrorInput from '../../components/ErrorInput/ErrorInput';

const RegistrationForm = () => {
  const { apiRoot, setApiRoot } = useContext(UserContext);
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    countryCode: '' as CountryCode,
    dateOfBirth: '',
    billingAddress: {
      streetName: '',
      city: '',
      postalCode: '',
    },
    shippingAddress: {
      streetName: '',
      city: '',
      postalCode: '',
    },
    useSameAddress: false,
    setAsDefaultAddress: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');
  const [toastShown, setToastShown] = useState<boolean>(false);
  const [errorToastShown, setErrorToastShown] = useState(false);
  const navigate = useNavigate();

  const showToastMessage = (message: string, type: TypeOptions) => {
    if (['info', 'success', 'warning', 'error'].includes(type)) {
      toast[type as 'info' | 'success' | 'warning' | 'error'](message, {
        position: 'top-center',
      });
    } else {
      console.warn(`Invalid toast type: ${type}`);
    }
  };

  const updateNestedState = <T extends object, K extends keyof T>(
    obj: T,
    key: K,
    value: Partial<T[K]>
  ): T => ({
    ...obj,
    [key]: {
      ...obj[key],
      ...value,
    },
  });

  const validateField = (
    name: keyof CustomerData | keyof Address,
    value: string | boolean,
    addressType?: 'billing' | 'shipping'
  ): void => {
    let error: string = '';

    switch (name) {
      case 'email':
        if (!isEmailValid(value as string)) error = 'Invalid email format';
        break;
      case 'password':
        if (!isPasswordValid(value as string)) {
          error = 'Invalid password data';
        }

        break;
      case 'firstName':
      case 'lastName':
        if (!isNameValid(value as string)) {
          error = 'Name must contain only letters and spaces';
        }
        break;
      case 'dateOfBirth':
        if (!isDateOfBirthValid(value as string)) {
          error = 'User must be at least 13 years old';
        }
        break;
      case 'streetName':
        if (!isSimpleTextValid(value as string)) {
          error = 'This field cannot be empty';
        }
        break;
      case 'city':
        if (!isSimpleTextValid(value as string)) {
          error = 'This field cannot be empty';
        } else if (!isCityValid(value as string)) {
          error = 'City cannot contain special characters or numbers';
        }
        break;
      case 'postalCode':
        if (!isPostalCodeValid(value as string, customerData.countryCode)) {
          error = 'Invalid postal code for the country';
        }
        break;
      case 'countryCode':
        if (!validCountries.includes(value as CountryCode))
          error = 'Invalid country selected';

        if (name === 'countryCode' && value === '') {
          error = 'Please select a country';
        }

        break;
    }

    if (addressType) {
      setErrors((prev) =>
        updateNestedState(prev, `${addressType}Address`, {
          [name]: error,
        } as Partial<Address>)
      );
    } else {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  type FormEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (event: FormEvent) => {
    const { name, type } = event.target as HTMLInputElement;
    const value =
      type === 'checkbox'
        ? (event.target as HTMLInputElement).checked
        : (event.target as HTMLInputElement).value;

    setCustomerData({
      ...customerData,
      [name]: value,
    });

    validateField(name as keyof CustomerData | keyof Address, value);
  };

  const [tooltipError, setTooltipError] = useState<string>('');
  const handlePasswordChange = (password: string) => {
    setCustomerData((prevData) => ({ ...prevData, password }));

    const isValidPassword = isPasswordValid(password);

    if (!isValidPassword) {
      setTooltipError(
        'Password must be at least 8 characters long and include: an uppercase and a lowercase letter, a number, and a special character (!@#$%^&*.,)'
      );
    } else {
      setTooltipError('');
    }
    validateField('password', password);
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    addressType: 'billing' | 'shipping'
  ) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [addressType === 'billing' ? 'billingAddress' : 'shippingAddress']: {
        ...prevData[
          addressType === 'billing' ? 'billingAddress' : 'shippingAddress'
        ],
        [name]: value,
      },
    }));

    if (addressType === 'billing' && customerData.useSameAddress) {
      setCustomerData((prevData) => ({
        ...prevData,
        shippingAddress: {
          ...prevData.billingAddress,
          [name]: value,
        },
      }));
    }

    validateField(name as keyof Address, value, addressType);
  };

  const validateForm = (): boolean => {
    let valid = true;

    Object.entries(customerData).forEach(([key, value]) => {
      if (key === 'billingAddress' || key === 'shippingAddress') {
        Object.entries(value as Address).forEach(
          ([addressKey, addressValue]) => {
            validateField(
              addressKey as keyof Address,
              addressValue as string,
              key as 'billing' | 'shipping'
            );
          }
        );
      } else {
        validateField(key as keyof CustomerData, value as string | boolean);
      }
    });

    Object.values(errors).forEach((error) => {
      if (typeof error === 'object') {
        Object.values(error).forEach((subError) => {
          if (subError) valid = false;
        });
      } else {
        if (error) valid = false;
      }
    });

    return valid;
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const message =
      'User is already logged in. Do you want to log out and then register again?';
    if (!isExist() || window.confirm(message) == true) {
      if (!validateForm()) {
        console.log('Form validation failed:', errors);
        return;
      }

      createCustomer(customerData, apiRoot!)
        .then((response: CustomerSignInResult) => {
          console.log('Customer created:', response);
          setApiRoot(
            clientWithPassword(customerData.email, customerData.password)
          );
          setErrors({});
          setSuccess(true);
          setToastShown(false);
        })
        .catch((error: CustomError) => {
          console.error('Failed to create customer:', error);

          if (
            error instanceof Error &&
            error.response &&
            error.response.status === 400
          ) {
            setErrors({ email: 'Email already exists' });
          } else {
            const errorMessage =
              error instanceof Error ? error.message : 'Unknown error';
            const customError = new Error(errorMessage);
            if (customError) {
              showToastMessage(errorMessage, 'error');
            }

            setErrors((prev) => ({
              ...prev,
              submit: customError.message,
            }));

            setServerError(
              'Something went wrong during registration. Please try again later.'
            );
          }
          setErrorToastShown(false);
        });
    } else {
      navigate(routes.home);
    }
  };

  useEffect(() => {
    if (success && !toastShown) {
      showToastMessage('Registration Successful!', 'success');
      setToastShown(true);
      setTimeout(() => {
        navigate(routes.home);
      }, 5000);
    }
  }, [success, toastShown, navigate]);

  useEffect(() => {
    if (serverError && !errorToastShown) {
      showToastMessage(`Registration Failed: ${serverError}`, 'error');
      setErrorToastShown(true);
    }
  }, [serverError, errorToastShown]);

  useEffect(() => {
    if (customerData.useSameAddress) {
      setCustomerData((prevData) => ({
        ...prevData,
        shippingAddress: {
          ...prevData.billingAddress,
        },
      }));
    }
  }, [customerData.useSameAddress]);

  return (
    <div className="register-container">
      <ToastContainer />
      <p className="navigation-link">
        Return to
        <Link to={routes.home}>
          <FaHome className="home-icon" /> Home
        </Link>
      </p>
      <section className="registration-section">
        <h1>Sign Up</h1>
        {serverError && (
          <div className="server-error">
            <p>❌ {serverError}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <div className="input-container">
              <label htmlFor="firstName">First Name:</label>
              <TextInput
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Firstname"
                value={customerData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error-input' : 'normal-input'}
              />
              {errors.firstName && <ErrorInput error={errors.firstName} />}
            </div>
            <div className="input-container">
              <label htmlFor="lastName">Last Name:</label>
              <TextInput
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Lastname"
                value={customerData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error-input' : 'normal-input'}
              />
              {errors.lastName && <ErrorInput error={errors.lastName} />}
            </div>
          </div>
          <div className="form-group">
            <div className="input-container">
              <label htmlFor="email">Email:</label>
              <TextInput
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={customerData.email}
                onChange={handleChange}
                className={errors.email ? 'error-input' : 'normal-input'}
              />
              {errors.email && <ErrorInput error={errors.email} />}
            </div>
            <Tooltip title={tooltipError} arrow>
              <div className="password-field">
                <PasswordInput
                  password={customerData.password}
                  onPasswordChange={handlePasswordChange}
                  error={errors.password || ''}
                />
              </div>
            </Tooltip>
          </div>
          <div className="form-group">
            <div className="input-container">
              <label htmlFor="countryCode">Country:</label>
              <select
                name="countryCode"
                id="countryCode"
                value={customerData.countryCode}
                onChange={handleChange}
              >
                <option value="">Select a country</option>
                {validCountries.map((countryCode) => (
                  <option key={countryCode} value={countryCode}>
                    {countryNames[countryCode]}
                  </option>
                ))}
              </select>
              {errors.countryCode && <ErrorInput error={errors.countryCode} />}
            </div>
            <div className="input-container">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <TextInput
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={customerData.dateOfBirth}
                placeholder=""
                onChange={handleChange}
                className={errors.dateOfBirth ? 'error-input' : 'normal-input'}
              />
              {errors.dateOfBirth && <ErrorInput error={errors.dateOfBirth} />}
            </div>
          </div>

          <h2>Billing Address</h2>
          <div className="form-group">
            <div className="input-container">
              <label htmlFor="billingCity">City:</label>
              <TextInput
                type="text"
                id="billingCity"
                name="city"
                placeholder="City"
                value={customerData.billingAddress.city}
                onChange={(e) => handleAddressChange(e, 'billing')}
                className={errors.billingAddress?.city ? 'error-input' : ''}
              />
              {errors.billingAddress?.city && (
                <ErrorInput error={errors.billingAddress.city} />
              )}
            </div>
            <div className="input-container">
              <label htmlFor="billingStreet">Street:</label>
              <TextInput
                type="text"
                id="billingStreet"
                name="streetName"
                placeholder="Street"
                value={customerData.billingAddress.streetName}
                onChange={(e) => handleAddressChange(e, 'billing')}
                className={
                  errors.billingAddress?.streetName ? 'error-input' : ''
                }
              />
              {errors.billingAddress?.streetName && (
                <ErrorInput error={errors.billingAddress.streetName} />
              )}
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="billingPostalCode">Postal Code:</label>
            <TextInput
              type="text"
              id="billingPostalCode"
              name="postalCode"
              placeholder="Postal Code"
              value={customerData.billingAddress.postalCode}
              onChange={(e) => handleAddressChange(e, 'billing')}
              className={errors.billingAddress?.postalCode ? 'error-input' : ''}
            />
            {errors.billingAddress?.postalCode && (
              <ErrorInput error={errors.billingAddress.postalCode} />
            )}
          </div>

          <div className="input-container">
            <label htmlFor="useSameAddress" className="checkbox-label">
              <input
                type="checkbox"
                id="useSameAddress"
                name="useSameAddress"
                checked={customerData.useSameAddress}
                onChange={handleChange}
              />
              Use same address for billing and shipping
            </label>
          </div>

          {!customerData.useSameAddress && (
            <>
              <h2>Shipping Address</h2>
              <div className="form-group">
                <div className="input-container">
                  <label htmlFor="shippingCity">City:</label>
                  <TextInput
                    type="text"
                    id="shippingCity"
                    name="city"
                    placeholder="City"
                    value={customerData.shippingAddress.city}
                    onChange={(e) => handleAddressChange(e, 'shipping')}
                    className={
                      errors.shippingAddress?.city ? 'error-input' : ''
                    }
                  />
                  {errors.shippingAddress?.city && (
                    <ErrorInput error={errors.shippingAddress.city} />
                  )}
                </div>
                <div className="input-container">
                  <label htmlFor="shippingStreet">Street:</label>
                  <TextInput
                    type="text"
                    id="shippingStreet"
                    name="streetName"
                    placeholder="Street"
                    value={customerData.shippingAddress.streetName}
                    onChange={(e) => handleAddressChange(e, 'shipping')}
                    className={
                      errors.shippingAddress?.streetName ? 'error-input' : ''
                    }
                  />
                  {errors.shippingAddress?.streetName && (
                    <ErrorInput error={errors.shippingAddress.streetName} />
                  )}
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="shippingPostalCode">Postal Code:</label>
                <TextInput
                  type="text"
                  id="shippingPostalCode"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={customerData.shippingAddress.postalCode}
                  onChange={(e) => handleAddressChange(e, 'shipping')}
                  className={
                    errors.shippingAddress?.postalCode ? 'error-input' : ''
                  }
                />
                {errors.shippingAddress?.postalCode && (
                  <ErrorInput
                    className="error-zip"
                    error={errors.shippingAddress.postalCode}
                  />
                )}
              </div>
            </>
          )}

          <div className="input-container">
            <label htmlFor="setAsDefaultAddress" className="checkbox-label">
              <input
                type="checkbox"
                id="setAsDefaultAddress"
                name="setAsDefaultAddress"
                checked={customerData.setAsDefaultAddress}
                onChange={handleChange}
              />
              Set as default address
            </label>
          </div>
          <div>
            <button type="submit" className="button register-btn">
              Register
            </button>
          </div>
          {errors.submit && (
            <div className="error other-error">
              <p>⚠️ {errors.submit}</p>
            </div>
          )}
          {success && (
            <div className="success-msg">Registration successful!</div>
          )}
        </form>
        <div>
          <p className="navigation-link">
            Already have an account? <Link to={routes.login}>Login</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegistrationForm;
