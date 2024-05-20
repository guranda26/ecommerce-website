import React, { useState } from 'react';
import { isEmailValid, isPasswordValid } from '../../modules/validationUtils';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    submit?: string;
  }>({});
  const [generalError, setGeneralError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateField = (name: string, value: string): void => {
    let error: string = '';

    switch (name) {
      case 'email':
        if (!isEmailValid(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (!isPasswordValid(value)) {
          error =
            'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*.,)';
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'email') setEmail(value);

    validateField(name, value);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    validateField('password', password);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateField('email', email);
    validateField('password', password);

    if (errors.email || errors.password) {
      console.log('Form validation failed:', errors);
      return;
    }

    // TODO: Proceed with form submission or authentication
    console.log('Form submitted:', { email, password });

    // TODO: Simulating an authentication success
    setSuccess(true);
    setGeneralError('');

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="login-form-container">
      <h1>Login</h1>
      {generalError && <div className="error-message">{generalError}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-controls">
          <div class="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && (
              <div className="error">
                <span className="error-icon">⚠️</span>
                {errors.email}</div>
              )}
          </div>
        </div>
        <div className="login-form-controls">
          <PasswordInput
            password={password}
            onPasswordChange={handlePasswordChange}
            error={errors.password}
          />
        </div>
        <div className="login-form-controls">
          <button type="submit" className="button login">
            Login
          </button>
          {errors.submit && (
            <div className="error">{errors.submit}</div>
          )}
          {success && (
            <div className="success">Login successful! Redirecting...</div>
          )}
        </div>
      </form>
      <div>
        <p className="navigation-link">
          Do not have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
