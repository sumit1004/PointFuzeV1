import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { listenToRecentActivity } from '../../../services/dashboard/dashboardService';
import EmptyState from '../../ui/EmptyState';
import Skeleton from '../../ui/Skeleton';

const RecentActivity = () => {
  const { user } = useAuth();
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const unsubscribe = listenToRecentActivity(user.uid, (data) => {
      setActivity(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="mb-8">
      <h3 className="text-h4 mb-4 text-text-secondary">Recent Activity</h3>
      
      {loading ? (
        <div className="w-full h-64 border-2 border-[rgba(255,255,255,0.05)] rounded-lg glass-panel flex flex-col gap-4 p-6">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      ) : activity.length === 0 ? (
        <EmptyState 
          icon={Trophy}
          title="No Recent Activity"
          description="You haven't created any tournaments or generated images yet. Start by creating your first tournament."
          action={{ label: "Create Tournament", path: "/dashboard/create-tournament" }}
        />
      ) : (
        <div className="glass-panel rounded-lg overflow-hidden border border-[rgba(255,255,255,0.05)]">
          {activity.map((item) => (
            <div key={item.id} className="p-4 border-b border-[rgba(255,255,255,0.05)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors flex items-center justify-between">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-text-secondary">{item.date}</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-[rgba(255,255,255,0.1)] rounded text-text-secondary">
                {item.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
