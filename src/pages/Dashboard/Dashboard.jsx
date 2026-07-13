import DashboardLayout from './DashboardLayout';
import Card from '../../components/ui/Card';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-h3 mb-2">Welcome to PointFuze</h2>
        <p className="text-body">Your dashboard is ready. Phase 2 will implement full analytics and widgets here.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-body mb-2">Total Tournaments</h3>
          <p className="text-h2">0</p>
        </Card>
        <Card>
          <h3 className="text-body mb-2">Matches Played</h3>
          <p className="text-h2">0</p>
        </Card>
        <Card>
          <h3 className="text-body mb-2">Images Generated</h3>
          <p className="text-h2">0</p>
        </Card>
      </div>

      <Card className="h-[300px] flex items-center justify-center border-dashed">
        <p className="text-body text-center">Recent Tournaments will appear here</p>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
