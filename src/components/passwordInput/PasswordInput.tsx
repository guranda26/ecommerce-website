// PasswordInput.tsx
import React from 'react';
import visibilityIcon from '../../assets/images/visibility_icon.png';
import notVisibilityIcon from '../../assets/images/not-visible.png';
import './PasswordInput.css';

interface PasswordInputProps {
  password: string;
  onPasswordChange: (password: string) => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  onPasswordChange,
  error,
}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="password-field">
      <div className="input-container">
        <label htmlFor="password">Password: </label>
        <input
          type={visible ? 'text' : 'password'}
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <div onClick={() => setVisible(!visible)} className="icon-container">
          <img
            src={visible ? visibilityIcon : notVisibilityIcon}
            alt={visible ? 'visible' : 'not visible'}
            className="visibility-icon"
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default PasswordInput;
