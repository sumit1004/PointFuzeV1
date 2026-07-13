import { useAuth } from '../../hooks/useAuth';
import DashboardStats from '../../components/dashboard/widgets/DashboardStats';
import QuickActions from '../../components/dashboard/widgets/QuickActions';
import RecentActivity from '../../components/dashboard/widgets/RecentActivity';

const Dashboard = () => {
  const { user, userData } = useAuth();
  
  const username = userData?.username || user?.displayName || 'Organizer';
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="animate-fade-in">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-h2 mb-2">
            Welcome back, <span className="text-gradient">{username}</span>!
          </h2>
          <p className="text-body text-lg">Here's what's happening with your tournaments today.</p>
        </div>
        <div className="text-sm font-medium text-text-secondary bg-[rgba(255,255,255,0.05)] px-4 py-2 rounded-full border border-[rgba(255,255,255,0.05)]">
          {today}
        </div>
      </div>
      
      <DashboardStats />
      <QuickActions />
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
