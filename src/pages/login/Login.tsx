import React, { useEffect, useContext } from 'react';
import { isEmailValid, isPasswordValid } from '../../modules/validationUtils';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../context/userContext';
import { isExist } from '../../../sdk/myToken';
import { authenticateUser } from '../../../sdk/userApi';
import { routes } from '../../modules/routes';
import { useFormik } from 'formik';
import {
  LoginFormErrors,
  LoginFormValues,
} from '../../Interfaces/loginInterface';

const Login: React.FC = () => {
  const { apiRoot, setApiRoot } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isExist()) {
      const message = 'You are already logged in';
      toast.info(message, { autoClose: 3000 });
      setTimeout(() => {
        navigate({
          pathname: routes.home,
          search: `?message=${encodeURIComponent(message)}`,
        });
      }, 3000);
    }
  }, [navigate]);

  const validate = (values: LoginFormValues) => {
    const errors: LoginFormErrors = {};

    if (!isEmailValid(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!isPasswordValid(values.password)) {
      errors.password =
        'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character (!@#$%^&*.,)';
    }

    return errors;
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { setErrors }) => {
      const message =
        'User is already logged in. Do you want to log out and then log in again?';

      if (!isExist() || window.confirm(message)) {
        const authSuccess = await authenticateUser(
          values.email,
          values.password,
          setErrors,
          apiRoot!,
          setApiRoot
        );

        if (authSuccess) {
          navigate('/', { replace: true });
        }
      } else {
        navigate('/', { replace: true });
      }
    },
  });

  const handlePasswordChange = async (password: string) => {
    await formik.setFieldValue('password', password);
    await formik.validateField('password');
  };

  const handlePasswordChangeWrapper = (password: string) => {
    handlePasswordChange(password).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="login-form-container">
      <ToastContainer />
      <h1>Login</h1>
      {formik.errors.submit && (
        <div className="error">{formik.errors.submit}</div>
      )}
      <form onSubmit={formik.handleSubmit} className="login-form">
        <div className="login-form-controls">
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />
            {formik.errors.email && (
              <div className="error">
                <span className="error-icon">⚠️</span>
                {formik.errors.email}
              </div>
            )}
          </div>
        </div>
        <div className="login-form-controls">
          <PasswordInput
            password={formik.values.password}
            onPasswordChange={handlePasswordChangeWrapper}
            error={formik.errors.password}
          />
        </div>
        <div className="login-form-controls">
          <button type="submit" className="button login">
            Login
          </button>
        </div>
      </form>
      <div>
        <p className="navigation-link">
          Do not have an account? <Link to={routes.register}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
