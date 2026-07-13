import { forwardRef } from 'react';
import clsx from 'clsx';
import './Input.css';

const Input = forwardRef(({ 
  label, 
  error, 
  className, 
  containerClassName,
  id,
  ...props 
}, ref) => {
  return (
    <div className={clsx('input-container', containerClassName)}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input
        ref={ref}
        id={id}
        className={clsx('input-field', error && 'input-error', className)}
        {...props}
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
