import SectionContainer from '../../components/layout/SectionContainer';
import Card from '../../components/ui/Card';
import { Zap, Image as ImageIcon, BarChart3, Database } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      title: 'Instant Calculations',
      description: 'Choose from 3 calculation methods. Auto-parse Excel or enter kills manually for instant rankings.',
      icon: <Zap className="text-primary" size={32} />
    },
    {
      title: 'Graphic Generation',
      description: 'Generate stunning, professional result images in 1-click right from the browser.',
      icon: <ImageIcon className="text-primary" size={32} />
    },
    {
      title: 'Real-time Leaderboards',
      description: 'Track overall standings automatically across multiple matches in your tournament.',
      icon: <BarChart3 className="text-primary" size={32} />
    },
    {
      title: 'Cloud Saved',
      description: 'All your tournaments, teams, and settings are saved securely in the cloud.',
      icon: <Database className="text-primary" size={32} />
    }
  ];

  return (
    <SectionContainer id="features" className="bg-[#14181f] py-20 rounded-xl my-12">
      <div className="text-center mb-12">
        <h2 className="text-h2 mb-2">Built for Speed and Quality</h2>
        <p className="text-body">Everything an organizer needs to finish the tournament smoothly.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuresList.map((f, i) => (
          <Card key={i} className="flex flex-col items-center text-center hover:border-primary transition-colors">
            <div className="mb-4 p-3 bg-background rounded-full">{f.icon}</div>
            <h3 className="text-h4 mb-2">{f.title}</h3>
            <p className="text-body text-sm">{f.description}</p>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Features;
