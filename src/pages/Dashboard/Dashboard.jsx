import DashboardLayout from './DashboardLayout';
import Card from '../../components/ui/Card';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6 md:mb-8">
        <h2 className="text-h2 mb-2 text-gradient">Welcome to PointFuze</h2>
        <p className="text-body text-lg">Your dashboard is ready. Phase 2 will implement full analytics and widgets here.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <Card className="glass-panel">
          <h3 className="text-body text-sm font-semibold mb-2 uppercase tracking-wider">Total Tournaments</h3>
          <p className="text-h1 text-primary">0</p>
        </Card>
        <Card className="glass-panel">
          <h3 className="text-body text-sm font-semibold mb-2 uppercase tracking-wider">Matches Played</h3>
          <p className="text-h1 text-primary">0</p>
        </Card>
        <Card className="glass-panel">
          <h3 className="text-body text-sm font-semibold mb-2 uppercase tracking-wider">Images Generated</h3>
          <p className="text-h1 text-primary">0</p>
        </Card>
      </div>

      <Card className="h-[300px] flex items-center justify-center border-dashed border-2 glass-panel">
        <div className="text-center">
          <p className="text-body mb-2">No tournaments yet.</p>
          <p className="text-small text-primary cursor-pointer hover:underline">Create your first tournament</p>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
