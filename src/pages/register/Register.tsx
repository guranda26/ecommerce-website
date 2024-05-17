import React, { useState, useEffect } from 'react';
import { createCustomer } from '../../../sdk/customerApi';
import { apiRoot } from '../../../sdk/client';
import {
  CustomerData,
  Address,
  FormErrors,
  CustomerResponse,
} from '../../Interfaces/CustomerInterface';
import {
  isEmailValid,
  isPasswordValid,
  isNameValid,
  isDateOfBirthValid,
  isSimpleTextValid,
  isPostalCodeValid,
  isCountryValid,
  CountryCode,
  isCityValid,
} from '../../modules/validationUtils';
import PasswordInput from '../../components/passwordInput/PasswordInput';

const validCountries: CountryCode[] = [
  'US',
  'CA',
  'GE',
  'DE',
  'FR',
  'GB',
  'UZ',
  'PL',
];

const RegistrationForm = () => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    countryCode: 'GE',
    dateOfBirth: '',
    billingAddress: {
      street: '',
      city: '',
      postalCode: '',
    },
    shippingAddress: {
      street: '',
      city: '',
      postalCode: '',
    },
    useSameAddress: false,
    setAsDefaultAddress: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');

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
          error =
            'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number and a special character';
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
      case 'street':
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
        if (
          !isPostalCodeValid(
            value as string,
            customerData.countryCode as CountryCode
          )
        ) {
          error = 'Invalid postal code for the country';
        }
        break;
      case 'countryCode':
        if (!isCountryValid(value as string, validCountries)) {
          error = 'Invalid country';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setCustomerData({
      ...customerData,
      [name]: fieldValue,
    });

    validateField(name as keyof CustomerData | keyof Address, fieldValue);
  };
  const handlePasswordChange = (password: string) => {
    setCustomerData((prevData) => ({ ...prevData, password }));

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

    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }

    createCustomer(apiRoot, customerData)
      .then((response: CustomerResponse) => {
        console.log('Customer created:', response);
        setErrors({});
        setSuccess(true);
      })
      .catch((error) => {
        console.error('Failed to create customer:', error);
        setErrors((prev) => ({
          ...prev,
          submit: (error as Error).message,
        }));
        setServerError(
          'Something went wrong during registration. Please try again later.'
        );
      });
  };

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
    <section>
      <h1>Sign Up</h1>
      {serverError && <div className="server-error">{serverError}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Firstname"
            value={customerData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Lastname"
            value={customerData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={customerData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <PasswordInput
          password={customerData.password}
          onPasswordChange={handlePasswordChange}
          error={errors.password || ''}
        />
        <div>
          <label htmlFor="countryCode">Country Code:</label>
          <input
            type="text"
            id="countryCode"
            name="countryCode"
            value={customerData.countryCode}
            onChange={handleChange}
          />
          {errors.countryCode && (
            <div className="error">{errors.countryCode}</div>
          )}
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={customerData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && (
            <div className="error">{errors.dateOfBirth}</div>
          )}
        </div>

        <h2>Billing Address</h2>
        <div>
          <label htmlFor="billingStreet">Street:</label>
          <input
            type="text"
            id="billingStreet"
            name="street"
            placeholder="Street"
            value={customerData.billingAddress.street}
            onChange={(e) => handleAddressChange(e, 'billing')}
          />
          {errors.billingAddress?.street && (
            <div className="error">{errors.billingAddress.street}</div>
          )}
        </div>
        <div>
          <label htmlFor="billingCity">City:</label>
          <input
            type="text"
            id="billingCity"
            name="city"
            placeholder="City"
            value={customerData.billingAddress.city}
            onChange={(e) => handleAddressChange(e, 'billing')}
          />
          {errors.billingAddress?.city && (
            <div className="error">{errors.billingAddress.city}</div>
          )}
        </div>
        <div>
          <label htmlFor="billingPostalCode">Postal Code:</label>
          <input
            type="text"
            id="billingPostalCode"
            name="postalCode"
            placeholder="Postal Code"
            value={customerData.billingAddress.postalCode}
            onChange={(e) => handleAddressChange(e, 'billing')}
          />
          {errors.billingAddress?.postalCode && (
            <div className="error">{errors.billingAddress.postalCode}</div>
          )}
        </div>

        <div>
          <label htmlFor="useSameAddress">
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
            <div>
              <label htmlFor="shippingStreet">Street:</label>
              <input
                type="text"
                id="shippingStreet"
                name="street"
                placeholder="Street"
                value={customerData.shippingAddress.street}
                onChange={(e) => handleAddressChange(e, 'shipping')}
              />
              {errors.shippingAddress?.street && (
                <div className="error">{errors.shippingAddress.street}</div>
              )}
            </div>
            <div>
              <label htmlFor="shippingCity">City:</label>
              <input
                type="text"
                id="shippingCity"
                name="city"
                placeholder="City"
                value={customerData.shippingAddress.city}
                onChange={(e) => handleAddressChange(e, 'shipping')}
              />
              {errors.shippingAddress?.city && (
                <div className="error">{errors.shippingAddress.city}</div>
              )}
            </div>
            <div>
              <label htmlFor="shippingPostalCode">Postal Code:</label>
              <input
                type="text"
                id="shippingPostalCode"
                name="postalCode"
                placeholder="Postal Code"
                value={customerData.shippingAddress.postalCode}
                onChange={(e) => handleAddressChange(e, 'shipping')}
              />
              {errors.shippingAddress?.postalCode && (
                <div className="error">{errors.shippingAddress.postalCode}</div>
              )}
            </div>
          </>
        )}

        <div>
          <label htmlFor="setAsDefaultAddress">
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

        <button type="submit">Register</button>
        {errors.submit && <div className="error">{errors.submit}</div>}
        {success && <div className="success">Registration successful!</div>}
      </form>
    </section>
  );
};

export default RegistrationForm;
