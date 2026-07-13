import { useState, useEffect, useMemo } from 'react';
import { subscribeToHistory } from '../../../services/history/historyService';
import { deleteTournament } from '../../../services/tournament/tournamentService';
import { useAuth } from '../../../hooks/useAuth';
import HistoryStats from './HistoryStats';
import HistoryHeader from './HistoryHeader';
import HistoryGrid from './HistoryGrid';
import TournamentPreviewModal from './TournamentPreviewModal';
import ExportWizard from '../../../components/export/ExportWizard';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

const History = () => {
  const { user } = useAuth();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGame, setFilterGame] = useState('ALL');
  const [sortBy, setSortBy] = useState('NEWEST'); // NEWEST, OLDEST, NAME

  // Modals
  const [previewTournament, setPreviewTournament] = useState(null);
  const [exportTournament, setExportTournament] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const unsubscribe = subscribeToHistory(user.uid, (data) => {
      setTournaments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Derived State: Filtering and Sorting
  const filteredAndSorted = useMemo(() => {
    let result = [...tournaments];

    // Filter Game
    if (filterGame !== 'ALL') {
      result = result.filter(t => t.configuration?.game === filterGame);
    }

    // Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.metadata.name?.toLowerCase().includes(q) ||
        t.metadata.summary?.champion?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'NEWEST') return new Date(b.metadata.updatedAt) - new Date(a.metadata.updatedAt);
      if (sortBy === 'OLDEST') return new Date(a.metadata.updatedAt) - new Date(b.metadata.updatedAt);
      if (sortBy === 'NAME') return a.metadata.name.localeCompare(b.metadata.name);
      return 0;
    });

    return result;
  }, [tournaments, filterGame, searchQuery, sortBy]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this tournament from History?")) {
      try {
        await deleteTournament(user.uid, id);
        toast.success("Tournament deleted.");
      } catch (e) {
        toast.error("Failed to delete.");
      }
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Tournament History</h1>
        <p className="text-text-secondary">View past results, export graphics, and duplicate setups for new weeks.</p>
      </div>

      <HistoryStats tournaments={tournaments} />

      <div className="glass-panel rounded-xl border border-[rgba(255,255,255,0.05)] flex-1 flex flex-col overflow-hidden">
        <HistoryHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterGame={filterGame}
          setFilterGame={setFilterGame}
          sortBy={sortBy}
          setSortBy={setSortBy}
          uniqueGames={[...new Set(tournaments.map(t => t.configuration?.game))].filter(Boolean)}
        />

        <div className="p-6 flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-text-secondary">Loading history...</div>
          ) : filteredAndSorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-text-secondary">
              <Search size={48} className="opacity-20 mb-4" />
              <p>No completed tournaments found.</p>
            </div>
          ) : (
            <HistoryGrid 
              tournaments={filteredAndSorted} 
              onView={(t) => setPreviewTournament(t)}
              onExport={(t) => setExportTournament(t)}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {previewTournament && (
        <TournamentPreviewModal 
          tournament={previewTournament} 
          onClose={() => setPreviewTournament(null)} 
        />
      )}

      {exportTournament && (
        <ExportWizard 
          tournament={exportTournament}
          onClose={() => setExportTournament(null)}
        />
      )}
    </div>
  );
};

export default History;
