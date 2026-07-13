import Card from './Card';
import Skeleton from './Skeleton';

const StatCard = ({ label, value, icon: Icon, loading }) => {
  return (
    <Card className="glass-panel flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-body text-sm font-semibold uppercase tracking-wider">{label}</h3>
        {Icon && <Icon size={20} className="text-primary opacity-80" />}
      </div>
      
      {loading ? (
        <Skeleton className="h-10 w-16" />
      ) : (
        <p className="text-h1 text-primary">{value}</p>
      )}
    </Card>
  );
};

export default StatCard;
