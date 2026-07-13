import { useState } from 'react';
import { ChevronDown, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import Button from '../../../ui/Button';

const TeamListEditor = ({ teams, methodId, onUpdateTeam, onRemoveTeam, onCompleteEdit }) => {
  const [expandedTeam, setExpandedTeam] = useState(null);

  const toggleExpand = (teamId) => {
    setExpandedTeam(prev => prev === teamId ? null : teamId);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in max-w-4xl mx-auto w-full">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h3 className="text-h3 mb-2">Edit Imported Teams</h3>
          <p className="text-body text-sm">Review the list below. Correct any warnings or errors.</p>
        </div>
        <div className="text-sm font-semibold bg-[rgba(255,255,255,0.05)] px-3 py-1 rounded">
          Total Teams: <span className="text-primary">{teams.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-6 max-h-[400px] scrollbar-thin">
        {teams.map((team, index) => {
          const isExpanded = expandedTeam === team.id;
          const hasPlayers = team.players && team.players.length > 0;

          return (
            <div key={team.id} className="glass-panel border border-[rgba(255,255,255,0.05)] rounded-lg overflow-hidden">
              {/* Team Header */}
              <div 
                className={`p-3 flex items-center justify-between cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors ${isExpanded ? 'bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]' : ''}`}
                onClick={() => methodId === 'excel_players' && toggleExpand(team.id)}
              >
                <div className="flex items-center gap-3">
                  {methodId === 'excel_players' && (
                    <button className="text-text-secondary">
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                  )}
                  <span className="text-xs text-text-secondary font-mono w-6">#{index + 1}</span>
                  <input 
                    type="text" 
                    value={team.name}
                    onChange={(e) => onUpdateTeam(team.id, 'name', e.target.value)}
                    className="bg-transparent border-none focus:ring-1 focus:ring-primary rounded px-2 py-1 text-sm font-semibold min-w-[200px]"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  {hasPlayers && (
                    <span className="text-xs text-text-secondary">
                      {team.players.length} Players
                    </span>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRemoveTeam(team.id); }}
                    className="text-text-secondary hover:text-error p-1 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Player Editor Dropdown (Only for Excel+Players) */}
              {isExpanded && hasPlayers && (
                <div className="p-4 bg-[rgba(0,0,0,0.2)]">
                  <div className="grid grid-cols-[1fr_1fr] gap-4 mb-2 px-2 text-xs text-text-secondary uppercase">
                    <span>In-Game Name (IGN)</span>
                    <span>Unique ID (UID)</span>
                  </div>
                  <div className="space-y-2">
                    {team.players.map((p, pIndex) => (
                      <div key={p.id} className="grid grid-cols-[1fr_1fr] gap-4">
                        <input 
                          type="text"
                          value={p.ign}
                          onChange={(e) => {
                            const newPlayers = [...team.players];
                            newPlayers[pIndex].ign = e.target.value;
                            onUpdateTeam(team.id, 'players', newPlayers);
                          }}
                          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-1.5 text-sm"
                          placeholder="Player IGN"
                        />
                        <input 
                          type="text"
                          value={p.uid}
                          onChange={(e) => {
                            const newPlayers = [...team.players];
                            newPlayers[pIndex].uid = e.target.value;
                            onUpdateTeam(team.id, 'players', newPlayers);
                          }}
                          className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded px-3 py-1.5 text-sm"
                          placeholder="Player UID"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
        <Button variant="primary" onClick={onCompleteEdit}>
          Re-Validate Changes
        </Button>
      </div>
    </div>
  );
};

export default TeamListEditor;
