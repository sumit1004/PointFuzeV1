import { Wrench } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-h2 text-gradient">{title}</h2>
        <p className="text-body mt-2">This module is currently under development.</p>
      </div>
      
      <EmptyState 
        icon={Wrench}
        title="Coming Soon"
        description={`The ${title} feature will be available in the next phase. Stay tuned!`}
      />
    </div>
  );
};

export default PlaceholderPage;
