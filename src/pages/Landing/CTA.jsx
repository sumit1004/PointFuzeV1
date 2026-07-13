import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const CTA = () => {
  return (
    <section className="landing-section">
      <div className="cta-box">
        <h2 className="text-h2 mb-4 relative z-10">Stop wasting time after every match.</h2>
        <p className="text-body mb-8 max-w-2xl mx-auto text-lg relative z-10">
          Join hundreds of esports organizers saving hours every day. Automate your results and focus on your community.
        </p>
        <Link to="/register" className="relative z-10">
          <Button variant="primary" size="lg">Create Free Account</Button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
