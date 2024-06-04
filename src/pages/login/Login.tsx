import React, { useState, useEffect, useContext } from 'react';
import { isEmailValid, isPasswordValid } from '../../modules/validationUtils';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/userContext';
import { getMyToken, isExist } from '../../../sdk/myToken';
import { clientWithPassword } from '../../../sdk/createClient';

const Login: React.FC = () => {
  const userContext = useContext(UserContext);
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

  useEffect(() => {
    
    if (isExist()) {
      const message = 'You are already logged in';
      toast.info(message, { autoClose: 3000 });
      setTimeout(() => {
        navigate({
          pathname: '/',
          search: `?message=${encodeURIComponent(message)}`,
        });
      }, 3000);
    }
  }, [navigate]);

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

  const authenticateUser = async (email: string, password: string) => {
    try {
      const response = await userContext.apiRoot
        .me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();

      if (response.body) {
        userContext.apiRoot = clientWithPassword(email, password);
        const res = await userContext.apiRoot
          .me()
          .get()
          .execute();
        const bodyInit = {
          email: res.body.email,
          password:res.body.password
        };
        await getMyToken(bodyInit);
        return true;
      } else {
        setGeneralError('Login failed. Please check your email and password.');
        return false;
      }
    } catch (error) {
      console.error(error);
      setGeneralError('Login failed. Please check your email and password.');
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message =
      'User is already logged in. Do you want to log out and then log in again?';
    
    if (!isExist() || window.confirm(message) == true) {
      validateField('email', email);
      validateField('password', password);

      if (errors.email || errors.password) {
        console.log('Form validation failed:', errors);
        return;
      }

      const authSuccess = await authenticateUser(email, password);

      if (authSuccess) {
        setSuccess(true);
        setGeneralError('');
        navigate('/', { replace: true });
      }
    } else {
      navigate('/', { replace: true });
    }
  };

  // Wrapping handleSubmit in a non-async function to satisfy the linter
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    void handleSubmit(event);
  };

  return (
    <div className="login-form-container">
      <ToastContainer />
      <h1>Login</h1>
      {generalError && <div className="error">{generalError}</div>}
      <form onSubmit={handleFormSubmit} className="login-form">
        <div className="login-form-controls">
          <div className="input-container">
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
                {errors.email}
              </div>
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
          {errors.submit && <div className="error">{errors.submit}</div>}
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
