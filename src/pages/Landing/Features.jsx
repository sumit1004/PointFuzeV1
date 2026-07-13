import Card from '../../components/ui/Card';
import { Zap, Image as ImageIcon, BarChart3, Database } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      title: 'Instant Calculations',
      description: 'Choose from 3 calculation methods. Auto-parse Excel or enter kills manually for instant rankings.',
      icon: <Zap size={28} />
    },
    {
      title: 'Graphic Generation',
      description: 'Generate stunning, professional result images in 1-click right from the browser.',
      icon: <ImageIcon size={28} />
    },
    {
      title: 'Real-time Leaderboards',
      description: 'Track overall standings automatically across multiple matches in your tournament.',
      icon: <BarChart3 size={28} />
    },
    {
      title: 'Cloud Saved',
      description: 'All your tournaments, teams, and settings are saved securely in the cloud.',
      icon: <Database size={28} />
    }
  ];

  return (
    <section id="features" className="landing-section">
      <div className="text-center mb-12">
        <h2 className="text-h2 mb-3">Built for Speed and Quality</h2>
        <p className="text-body max-w-2xl mx-auto">Everything an organizer needs to finish the tournament smoothly.</p>
      </div>
      <div className="features-grid">
        {featuresList.map((f, i) => (
          <Card key={i} className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              {f.icon}
            </div>
            <h3 className="text-h4 mb-2">{f.title}</h3>
            <p className="text-body text-sm leading-relaxed">{f.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
