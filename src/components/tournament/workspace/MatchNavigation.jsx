import React from 'react';
import { Plus, Copy, Trash2, CheckCircle2 } from 'lucide-react';
import { MATCH_STATUS } from '../../../constants/tournamentStatus';

const MatchNavigation = ({ matches, activeMatchId, onSelect, onAdd, onDuplicate, onDelete, onToggleStatus, activeTab, onTabSelect }) => {
  const matchesList = Object.values(matches).sort((a, b) => a.metadata.matchNumber - b.metadata.matchNumber);
  const activeMatch = matches[activeMatchId];

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Top Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide gap-2 border-b border-[rgba(255,255,255,0.05)] pb-2">
        {matchesList.map(m => (
          <button
            key={m.metadata.id}
            onClick={() => { onTabSelect('MATCH'); onSelect(m.metadata.id); }}
            className={`px-4 py-2 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors flex items-center gap-2
              ${activeTab === 'MATCH' && activeMatchId === m.metadata.id 
                ? 'bg-[rgba(255,255,255,0.05)] text-primary border-b-2 border-primary' 
                : 'text-text-secondary hover:text-text hover:bg-[rgba(255,255,255,0.02)]'}`}
          >
            {m.metadata.mapName}
            {m.metadata.status === MATCH_STATUS.COMPLETED && <CheckCircle2 size={14} className="text-success" />}
          </button>
        ))}
        <button
          onClick={() => onTabSelect('OVERALL')}
          className={`px-4 py-2 rounded-t-lg font-bold text-sm whitespace-nowrap transition-colors
            ${activeTab === 'OVERALL' 
              ? 'bg-[rgba(255,255,255,0.05)] text-primary border-b-2 border-primary' 
              : 'text-text-secondary hover:text-text hover:bg-[rgba(255,255,255,0.02)]'}`}
        >
          Overall Standings
        </button>
      </div>

      {/* Action Toolbar for Active Match */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button 
          onClick={onAdd}
          className="btn btn-secondary btn-sm flex items-center gap-1"
        >
          <Plus size={16} /> Add Match
        </button>

        {activeTab === 'MATCH' && activeMatch && (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onDuplicate(activeMatchId)}
              className="btn btn-ghost btn-sm flex items-center gap-1 text-text-secondary hover:text-text"
              title="Duplicate this match"
            >
              <Copy size={16} />
            </button>
            <button 
              onClick={() => onDelete(activeMatchId)}
              className="btn btn-ghost btn-sm flex items-center gap-1 text-error hover:bg-[rgba(239,68,68,0.1)]"
              title="Delete Match"
            >
              <Trash2 size={16} />
            </button>
            
            <div className="w-px h-6 bg-[rgba(255,255,255,0.1)] mx-2"></div>
            
            <button 
              onClick={() => onToggleStatus(activeMatchId, activeMatch.metadata.status === MATCH_STATUS.COMPLETED ? MATCH_STATUS.EDITING : MATCH_STATUS.COMPLETED)}
              className={`btn btn-sm flex items-center gap-2 transition-colors ${
                activeMatch.metadata.status === MATCH_STATUS.COMPLETED 
                  ? 'bg-[rgba(255,255,255,0.05)] text-text hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]' 
                  : 'bg-[rgba(34,197,94,0.1)] text-success hover:bg-[rgba(34,197,94,0.2)] border border-[rgba(34,197,94,0.2)]'
              }`}
            >
              <CheckCircle2 size={16} />
              {activeMatch.metadata.status === MATCH_STATUS.COMPLETED ? 'Unlock for Editing' : 'Mark Completed'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(MatchNavigation);
