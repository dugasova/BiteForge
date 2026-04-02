import type { ButtonHTMLAttributes } from 'react';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // We can still optionally support 'text', but 'children' is the React standard
  text?: string; 
}

export default function Button({ text, children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`button ${className}`} {...props}>
      {text || children}
    </button>
  );
}