import { Link } from 'react-router-dom';

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-lg glass-panel">
      {Icon && <div className="mb-4 text-primary bg-[rgba(255,122,0,0.1)] p-4 rounded-full"><Icon size={32} /></div>}
      <h3 className="text-h4 mb-2">{title}</h3>
      <p className="text-body max-w-md mb-6">{description}</p>
      
      {action && (
        <Link to={action.path} className="btn btn-primary btn-md">
          {action.label}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
