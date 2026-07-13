import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { listenToDashboardStats } from '../../../services/dashboard/dashboardService';
import { DEFAULT_STATS } from '../../../constants/dashboard';
import StatCard from '../../ui/StatCard';

const DashboardStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // Set up realtime listener
    const unsubscribe = listenToDashboardStats(user.uid, (data) => {
      setStats(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      {DEFAULT_STATS.map((stat) => {
        const value = stats ? stats[stat.id] || 0 : 0;
        return (
          <StatCard 
            key={stat.id}
            label={stat.label}
            value={value}
            loading={loading}
          />
        );
      })}
    </div>
  );
};

export default DashboardStats;
