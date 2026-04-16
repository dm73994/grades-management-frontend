import React from 'react';
import './button.css';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    icon?: React.ReactNode;
}

const Button = ({ variant = 'primary', icon, children, className = '', ...props }: ButtonProps) => {
    return (
        <button className={`btn btn-${variant} ${className}`} {...props}>
            {icon && <span className="btn-icon">{icon}</span>}
            {children && <span>{children}</span>}
        </button>
    );
};

export default Button;
