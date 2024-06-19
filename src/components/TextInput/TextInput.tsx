import React from 'react';
import { TextInputProps } from 'src/Interfaces/CustomerInterface';

const TextInput: React.FC<TextInputProps> = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      required
      autoComplete="off"
    />
  );
};

export default TextInput;
