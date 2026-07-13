import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const SomethingWentWrong = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-h1 text-warning mb-2">Oops!</h1>
      <h2 className="text-h3 mb-4">Something Went Wrong</h2>
      <p className="text-body mb-8">An unexpected error occurred. Please try again later.</p>
      <button onClick={() => window.location.reload()} className="mb-4">
        <Button variant="secondary">Reload Page</Button>
      </button>
      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
};

export default SomethingWentWrong;
