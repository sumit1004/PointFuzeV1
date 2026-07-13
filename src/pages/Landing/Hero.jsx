import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import SectionContainer from '../../components/layout/SectionContainer';

const Hero = () => {
  return (
    <SectionContainer className="hero-section text-center pt-24 pb-16">
      <h1 className="text-h1 mb-4 leading-tight">
        The Fastest Esports Tournament <br/>
        <span className="text-primary">Result Operating System</span>
      </h1>
      <p className="text-body max-w-[600px] mx-auto mb-8 text-lg">
        Automate your point calculations and instantly generate professional branded result graphics. Say goodbye to Excel errors and Photoshop delays.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link to="/register">
          <Button variant="primary" size="lg">Start Automating Now</Button>
        </Link>
        <a href="#how-it-works">
          <Button variant="secondary" size="lg">See How It Works</Button>
        </a>
      </div>
    </SectionContainer>
  );
};

export default Hero;
