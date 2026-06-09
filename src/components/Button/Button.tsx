import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`button${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </button>
  );
}
