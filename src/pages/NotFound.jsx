import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-h1 text-primary mb-2">404</h1>
      <h2 className="text-h3 mb-4">Page Not Found</h2>
      <p className="text-body mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
