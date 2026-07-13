import clsx from 'clsx';
import './Card.css';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={clsx('card', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
