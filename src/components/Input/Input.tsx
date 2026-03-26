import React, { forwardRef } from 'react';
import './Input.scss';

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string; // Add optional className
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, value, onChange, onBlur, className }, ref) => {
    return (
      <input
        className={`input ${type === 'email' ? 'email' : 'password'} ${className || ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
