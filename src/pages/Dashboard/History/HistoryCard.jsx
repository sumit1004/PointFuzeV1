import { Trophy, ImageDown, Copy, Trash2, Eye } from 'lucide-react';
import { duplicateTournamentToDraft } from '../../../services/history/historyService';
import { useAuth } from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const HistoryCard = ({ tournament, onView, onExport, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDuplicate = async () => {
    try {
      const newId = await duplicateTournamentToDraft(user.uid, tournament);
      toast.success("Tournament duplicated as Draft!");
      navigate(`/dashboard/tournaments`);
    } catch (e) {
      toast.error("Failed to duplicate.");
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[rgba(255,255,255,0.2)] transition-all flex flex-col group relative">
      
      {/* Header Info */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg truncate pr-4">{tournament.metadata.name}</h3>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-[rgba(255,255,255,0.1)] text-text-secondary">
            {tournament.configuration?.game || 'Unknown'}
          </span>
        </div>
        <div className="text-xs text-text-secondary">
          Completed {new Date(tournament.metadata.updatedAt).toLocaleDateString()}
        </div>
      </div>

      {/* Snapshot Data */}
      <div className="p-4 flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[rgba(255,122,0,0.1)] flex items-center justify-center text-primary">
            <Trophy size={20} />
          </div>
          <div>
            <div className="text-xs text-text-secondary uppercase font-bold tracking-wider">Champion</div>
            <div className="font-black text-white truncate max-w-[150px]">
              {tournament.metadata.summary?.champion || 'N/A'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
          <div>
            <span className="text-text-secondary block text-xs">Matches</span>
            <span className="font-bold">{tournament.metadata.matchCount || 0}</span>
          </div>
          <div>
            <span className="text-text-secondary block text-xs">Teams</span>
            <span className="font-bold">{tournament.metadata.summary?.totalTeams || 0}</span>
          </div>
        </div>
      </div>

      {/* Hover Action Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
        <button onClick={() => onView(tournament)} className="btn btn-primary w-3/4 flex items-center justify-center gap-2">
          <Eye size={16} /> View Details
        </button>
        <button onClick={() => onExport(tournament)} className="btn btn-ghost w-3/4 flex items-center justify-center gap-2 border border-[rgba(255,255,255,0.2)]">
          <ImageDown size={16} /> Export Graphic
        </button>
        
        <div className="flex w-3/4 gap-3 mt-2">
          <button onClick={handleDuplicate} className="flex-1 p-2 bg-[#111] hover:bg-[#222] rounded flex items-center justify-center text-text-secondary hover:text-white transition-colors" title="Duplicate Setup">
            <Copy size={16} />
          </button>
          <button onClick={() => onDelete(tournament.metadata.id)} className="flex-1 p-2 bg-[#111] hover:bg-[rgba(255,0,0,0.1)] rounded flex items-center justify-center text-text-secondary hover:text-error transition-colors" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default HistoryCard;
