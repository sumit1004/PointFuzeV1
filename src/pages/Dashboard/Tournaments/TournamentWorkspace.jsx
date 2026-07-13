import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { subscribeToUserTournaments, deleteTournament } from '../../../services/tournament/tournamentService';
import { TOURNAMENT_STATUS } from '../../../constants/tournamentStatus';
import TournamentCard from '../../../components/tournament/TournamentCard';
import TournamentEmptyState from '../../../components/tournament/TournamentEmptyState';
import DeleteTournamentModal from '../../../components/tournament/DeleteTournamentModal';
import Skeleton from '../../../components/ui/Skeleton';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const TournamentWorkspace = () => {
  const { user } = useAuth();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, DRAFT, ACTIVE, COMPLETED

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToUserTournaments(user.uid, (data) => {
      setTournaments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const filteredTournaments = tournaments.filter(t => {
    if (filter === 'ALL') return true;
    return t.metadata.status === filter;
  });

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTournament(user.uid, deleteModal.id);
      toast.success('Tournament deleted successfully');
      setDeleteModal({ isOpen: false, id: null, name: '' });
    } catch (error) {
      toast.error('Failed to delete tournament');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDuplicate = async (id) => {
    toast.error('Duplicate feature coming soon!');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-h2 text-gradient">Tournament Workspace</h2>
          <p className="text-body mt-1">Manage, edit, and create your tournaments here.</p>
        </div>
        <Link to="/dashboard/tournaments/create" className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> New Tournament
        </Link>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['ALL', TOURNAMENT_STATUS.DRAFT, TOURNAMENT_STATUS.IN_PROGRESS, TOURNAMENT_STATUS.COMPLETED].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
              filter === status 
                ? 'bg-primary text-white shadow-glow' 
                : 'bg-[rgba(255,255,255,0.05)] text-text-secondary hover:text-text'
            }`}
          >
            {status === 'ALL' ? 'All Tournaments' : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : filteredTournaments.length === 0 ? (
        <TournamentEmptyState filter={filter} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map(t => (
            <TournamentCard 
              key={t.id} 
              tournament={t} 
              onDelete={() => handleDeleteClick(t.id, t.metadata.name)}
              onDuplicate={handleDuplicate}
            />
          ))}
        </div>
      )}

      <DeleteTournamentModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
        onConfirm={handleConfirmDelete}
        tournamentName={deleteModal.name}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default TournamentWorkspace;
