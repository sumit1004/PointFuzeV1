import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import CTA from './CTA';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-wrapper flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
