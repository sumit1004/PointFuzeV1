import { useParams, Link } from 'react-router-dom';
import { TournamentProvider, useTournament } from '../../../contexts/TournamentContext';
import { Settings, Users, Activity, PlayCircle } from 'lucide-react';
import Skeleton from '../../../components/ui/Skeleton';
import TournamentStatusBadge from '../../../components/tournament/TournamentStatusBadge';

const TournamentDashboardContent = () => {
  const { tournament, loading, error } = useTournament();

  if (loading) {
    return (
      <div className="animate-fade-in space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !tournament) {
    return (
      <div className="text-center py-20 text-error animate-fade-in">
        <h3 className="text-h3 mb-2">Error Loading Tournament</h3>
        <p className="text-body mb-6">{error || 'Tournament not found'}</p>
        <Link to="/dashboard/tournaments" className="btn btn-primary">Back to Workspace</Link>
      </div>
    );
  }

  const { metadata, configuration } = tournament;

  return (
    <div className="animate-fade-in">
      {/* Header Info */}
      <div className="glass-panel p-6 rounded-xl border border-[rgba(255,255,255,0.05)] mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-h2 leading-none m-0">{metadata.name}</h2>
            <TournamentStatusBadge status={metadata.status} />
          </div>
          <p className="text-text-secondary">{metadata.description || 'No description provided.'}</p>
        </div>
        
        <div className="flex gap-2">
          <Link to={`/dashboard/tournaments/${metadata.id}/edit`} className="btn btn-secondary btn-sm flex items-center gap-1">
            <Settings size={16} /> Manage Settings
          </Link>
        </div>
      </div>

      {/* Phase 4 Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-[rgba(255,255,255,0.05)] text-center opacity-70 hover:opacity-100 transition-opacity">
          <div className="mx-auto w-12 h-12 bg-[rgba(255,122,0,0.1)] text-primary rounded-full flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <h3 className="font-semibold mb-2">Teams & Players</h3>
          <p className="text-sm text-text-secondary">Registration and team management arriving in Phase 4.</p>
        </div>
        
        <div className="glass-panel p-6 rounded-xl border border-[rgba(255,255,255,0.05)] text-center opacity-70 hover:opacity-100 transition-opacity">
          <div className="mx-auto w-12 h-12 bg-[rgba(255,122,0,0.1)] text-primary rounded-full flex items-center justify-center mb-4">
            <PlayCircle size={24} />
          </div>
          <h3 className="font-semibold mb-2">Match System</h3>
          <p className="text-sm text-text-secondary">Input scores and view leaderboards in Phase 4.</p>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-[rgba(255,255,255,0.05)] text-center opacity-70 hover:opacity-100 transition-opacity">
          <div className="mx-auto w-12 h-12 bg-[rgba(255,122,0,0.1)] text-primary rounded-full flex items-center justify-center mb-4">
            <Activity size={24} />
          </div>
          <h3 className="font-semibold mb-2">Calculation Engine</h3>
          <p className="text-sm text-text-secondary">The core point calculator will be implemented next.</p>
        </div>
      </div>
    </div>
  );
};

const TournamentDetails = () => {
  const { tournamentId } = useParams();

  return (
    <TournamentProvider tournamentId={tournamentId}>
      <TournamentDashboardContent />
    </TournamentProvider>
  );
};

export default TournamentDetails;
