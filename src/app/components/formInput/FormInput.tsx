import { forwardRef } from 'react';
import './formInput.css';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <div className="form-input">
                <label className="form-input-label">{label}</label>

                <input
                    ref={ref}
                    className={`form-input-field ${error ? 'error' : ''}`}
                    {...props}
                />

                {error && <span className="form-input-error">{error}</span>}
            </div>
        );
    },
);

FormInput.displayName = 'FormInput';

export default FormInput;
