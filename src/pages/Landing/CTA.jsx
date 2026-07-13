import { Link } from 'react-router-dom';
import SectionContainer from '../../components/layout/SectionContainer';
import Button from '../../components/ui/Button';

const CTA = () => {
  return (
    <SectionContainer className="py-20 mb-12 text-center bg-gradient-to-t from-[#14181f] to-background rounded-xl border border-border">
      <h2 className="text-h2 mb-4">Stop wasting time after every match.</h2>
      <p className="text-body mb-8 max-w-2xl mx-auto">
        Join hundreds of esports organizers saving hours every day. Automate your results and focus on your community.
      </p>
      <Link to="/register">
        <Button variant="primary" size="lg">Create Free Account</Button>
      </Link>
    </SectionContainer>
  );
};

export default CTA;
