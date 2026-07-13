import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-h1 text-error mb-2">401</h1>
      <h2 className="text-h3 mb-4">Unauthorized Access</h2>
      <p className="text-body mb-8">You do not have permission to view this page.</p>
      <Link to="/login">
        <Button variant="primary">Go to Login</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
