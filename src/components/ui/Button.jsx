import clsx from 'clsx';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  isLoading = false, 
  disabled, 
  ...props 
}) => {
  return (
    <button
      className={clsx(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <span className="loader" /> : children}
    </button>
  );
};

export default Button;
