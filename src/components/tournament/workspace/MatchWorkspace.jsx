import { useState, useEffect } from 'react';
import { useTournament } from '../../../contexts/TournamentContext';
import { saveAndExitTournament } from '../../../services/tournament/tournamentService';
import { validateTournamentState } from '../../../utils/validation/resultValidation';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import MatchNavigation from './MatchNavigation';
import MatchCard from './MatchCard';
import OverallTable from './OverallTable';
import { Save, AlertCircle, ImageDown } from 'lucide-react';
import toast from 'react-hot-toast';
import ExportWizard from '../../export/ExportWizard';

const MatchWorkspace = () => {
  const { tournament, dispatch } = useTournament();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('MATCH'); // 'MATCH' or 'OVERALL'
  const [activeMatchId, setActiveMatchId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Auto-select first match on load
  useEffect(() => {
    if (tournament && tournament.matches) {
      const matchIds = Object.keys(tournament.matches);
      if (matchIds.length > 0 && !activeMatchId) {
        // Find first editing match or default to first
        const editingMatchId = matchIds.find(id => tournament.matches[id].metadata.status === 'EDITING');
        setActiveMatchId(editingMatchId || matchIds[0]);
      }
    }
  }, [tournament, activeMatchId]);

  if (!tournament) return null;

  const handleAddMatch = () => {
    dispatch({ type: 'ADD_MATCH' });
  };

  const handleSaveAndExit = async () => {
    dispatch({ type: 'CALCULATE_OVERALL' });
    const { isValid, errors } = validateTournamentState(tournament, tournament.configuration.pointConfig);

    if (!isValid) {
      toast.error('Validation failed. Please fix errors before saving.');
      errors.forEach(err => toast(err.message, { icon: <AlertCircle className="text-error" /> }));
      return;
    }

    setIsSaving(true);
    try {
      await saveAndExitTournament(user.uid, tournament.metadata.id, tournament);
      toast.success('Tournament Saved successfully!');
      navigate('/dashboard/tournaments');
    } catch (err) {
      toast.error('Failed to save tournament to cloud.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    if (tab === 'OVERALL') {
      dispatch({ type: 'CALCULATE_OVERALL' });
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in pb-20 relative">
      {/* Header */}
      <div className="glass-panel p-4 rounded-xl border border-[rgba(255,255,255,0.05)] mb-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold">{tournament.metadata.name}</h2>
          <p className="text-xs text-text-secondary flex items-center gap-2">
            Local Recovery Active <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsExporting(true)}
            className="btn btn-ghost flex items-center gap-2 border border-[rgba(255,255,255,0.1)]"
          >
            <ImageDown size={18} />
            <span className="hidden sm:inline">Export Graphic</span>
          </button>
          
          <button 
            onClick={handleSaveAndExit}
            disabled={isSaving}
            className="btn btn-primary flex items-center gap-2 shadow-glow"
          >
            <Save size={18} />
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save & Exit'}</span>
          </button>
        </div>
      </div>

      <div className="glass-panel p-4 md:p-6 rounded-xl border border-[rgba(255,255,255,0.05)] flex-1">
        <MatchNavigation 
          matches={tournament.matches || {}}
          activeMatchId={activeMatchId}
          onSelect={setActiveMatchId}
          onAdd={handleAddMatch}
          onDuplicate={(id) => dispatch({ type: 'DUPLICATE_MATCH', payload: { sourceMatchId: id } })}
          onDelete={(id) => dispatch({ type: 'DELETE_MATCH', payload: { matchId: id } })}
          onToggleStatus={(id, status) => dispatch({ type: 'CHANGE_MATCH_STATUS', payload: { matchId: id, status } })}
          activeTab={activeTab}
          onTabSelect={handleTabSelect}
        />

        <div className="mt-6">
          {activeTab === 'MATCH' && activeMatchId && tournament.matches[activeMatchId] ? (
            <MatchCard matchId={activeMatchId} />
          ) : activeTab === 'OVERALL' ? (
            <OverallTable />
          ) : (
            <div className="text-center py-12 text-text-secondary">
              No matches found. Click "Add Match" to begin.
            </div>
          )}
        </div>
      </div>

      {isExporting && (
        <ExportWizard 
          tournament={tournament}
          onClose={() => setIsExporting(false)}
        />
      )}
    </div>
  );
};

export default MatchWorkspace;
