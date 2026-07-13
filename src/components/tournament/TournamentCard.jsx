import { Link } from 'react-router-dom';
import { Gamepad2, Play, Edit, Copy, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import TournamentStatusBadge from './TournamentStatusBadge';
import { SUPPORTED_GAMES } from '../../constants/games';

const TournamentCard = ({ tournament, onDelete, onDuplicate }) => {
  const { metadata, configuration } = tournament;
  const gameInfo = SUPPORTED_GAMES[configuration?.game?.toUpperCase()] || { name: configuration?.game };

  return (
    <Card className="glass-panel flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-h4 mb-1 truncate max-w-[200px]">{metadata.name}</h3>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Gamepad2 size={14} />
            <span>{gameInfo.name}</span>
          </div>
        </div>
        <TournamentStatusBadge status={metadata.status} />
      </div>

      <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Link 
            to={`/dashboard/tournaments/${metadata.id}`} 
            className="btn btn-primary btn-sm flex items-center gap-1"
          >
            <Play size={14} /> Open
          </Link>
          <Link 
            to={`/dashboard/tournaments/${metadata.id}/edit`} 
            className="btn btn-secondary btn-sm flex items-center gap-1"
          >
            <Edit size={14} /> Edit
          </Link>
        </div>
        
        <div className="flex gap-1">
          <button 
            onClick={() => onDuplicate(metadata.id)}
            className="p-2 text-text-secondary hover:text-text hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors"
            title="Duplicate"
          >
            <Copy size={16} />
          </button>
          <button 
            onClick={() => onDelete(metadata.id)}
            className="p-2 text-error hover:bg-[rgba(239,68,68,0.1)] rounded transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TournamentCard;
