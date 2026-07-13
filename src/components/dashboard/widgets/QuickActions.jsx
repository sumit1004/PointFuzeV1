import { Link } from 'react-router-dom';
import { QUICK_ACTIONS } from '../../../constants/dashboard';

const QuickActions = () => {
  return (
    <div className="mb-8">
      <h3 className="text-h4 mb-4 text-text-secondary">Quick Actions</h3>
      <div className="flex flex-wrap gap-4">
        {QUICK_ACTIONS.map((action, i) => {
          const Icon = action.icon;
          return (
            <Link 
              key={i} 
              to={action.path}
              className={`btn btn-${action.variant} btn-md flex items-center gap-2`}
            >
              <Icon size={18} />
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
