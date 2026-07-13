import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const TournamentEmptyState = ({ filter }) => {
  let message = "You haven't created any tournaments yet.";
  if (filter === 'ACTIVE') message = "You don't have any active tournaments.";
  if (filter === 'COMPLETED') message = "You don't have any completed tournaments.";

  return (
    <div className="w-full py-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-lg glass-panel">
      <div className="mb-4 text-primary bg-[rgba(255,122,0,0.1)] p-4 rounded-full">
        <Trophy size={40} />
      </div>
      <h3 className="text-h3 mb-2">No Tournaments Found</h3>
      <p className="text-body max-w-md mb-6">{message}</p>
      
      <Link to="/dashboard/tournaments/create" className="btn btn-primary btn-lg">
        Create Your First Tournament
      </Link>
    </div>
  );
};

export default TournamentEmptyState;
