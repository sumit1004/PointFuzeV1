import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Hero = () => {
  return (
    <section className="landing-section hero-section">
      <div className="hero-glow"></div>
      <div className="hero-content">
        <h1 className="hero-title animate-slide-up">
          The Fastest Esports Tournament <br className="hidden md:block"/>
          <span className="text-gradient">Result Operating System</span>
        </h1>
        <p className="text-body max-w-[650px] mx-auto mb-8 text-lg md:text-xl animate-fade-in" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
          Automate your point calculations and instantly generate professional branded result graphics. Say goodbye to Excel errors and Photoshop delays.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full">Start Automating Now</Button>
          </Link>
          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full">See How It Works</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
