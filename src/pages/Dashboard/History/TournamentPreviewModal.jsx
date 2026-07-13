import { X, Trophy, Crosshair, Users, Map, Download } from 'lucide-react';
import ExportWizard from '../../../components/export/ExportWizard';
import { useState } from 'react';

const TournamentPreviewModal = ({ tournament, onClose }) => {
  const [showExport, setShowExport] = useState(false);

  // We need to render a read-only table. Since we don't want to couple this entirely with the complex workspace OverallTable,
  // we will build a lightweight display table here for the overallResult.
  const standings = Object.values(tournament.overallResult || {}).sort((a, b) => a.rank - b.rank);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }} className="animate-fade-in">
      <div style={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', width: '100%', maxWidth: '900px', height: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)] bg-[#0a0a0a]">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {tournament.metadata.name}
              <span className="text-[10px] bg-primary text-black px-2 py-0.5 rounded uppercase font-black">Archive</span>
            </h2>
            <p className="text-xs text-text-secondary mt-1">Completed {new Date(tournament.metadata.updatedAt).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowExport(true)} className="btn btn-primary flex items-center gap-2 px-3 py-1.5 text-sm">
              <Download size={14} /> Export Graphic
            </button>
            <button onClick={onClose} className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-lg text-text-secondary hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          
          {/* Summary Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#111] p-4 rounded-lg border border-[rgba(255,255,255,0.05)] flex items-center gap-3">
              <Trophy className="text-primary" size={24} />
              <div>
                <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Champion</div>
                <div className="font-bold truncate w-full">{tournament.metadata.summary?.champion || 'N/A'}</div>
              </div>
            </div>
            <div className="bg-[#111] p-4 rounded-lg border border-[rgba(255,255,255,0.05)] flex items-center gap-3">
              <Users className="text-blue-400" size={24} />
              <div>
                <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Runner-Up</div>
                <div className="font-bold truncate w-full">{tournament.metadata.summary?.runnerUp || 'N/A'}</div>
              </div>
            </div>
            <div className="bg-[#111] p-4 rounded-lg border border-[rgba(255,255,255,0.05)] flex items-center gap-3">
              <Map className="text-purple-400" size={24} />
              <div>
                <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Matches</div>
                <div className="font-bold">{tournament.metadata.matchCount || 0}</div>
              </div>
            </div>
            <div className="bg-[#111] p-4 rounded-lg border border-[rgba(255,255,255,0.05)] flex items-center gap-3">
              <Crosshair className="text-green-400" size={24} />
              <div>
                <div className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Total Teams</div>
                <div className="font-bold">{tournament.metadata.summary?.totalTeams || 0}</div>
              </div>
            </div>
          </div>

          {/* Standings Table */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-[rgba(255,255,255,0.05)] pb-2">Final Standings</h3>
            <div className="overflow-x-auto rounded-lg border border-[rgba(255,255,255,0.05)] bg-[#0a0a0a]">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#111] text-text-secondary text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 w-16">Rank</th>
                    <th className="px-4 py-3">Team</th>
                    <th className="px-4 py-3 text-center">Matches</th>
                    <th className="px-4 py-3 text-center">Kills</th>
                    <th className="px-4 py-3 text-center">Place Pts</th>
                    <th className="px-4 py-3 text-center text-primary font-bold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                  {standings.map(team => (
                    <tr key={team.teamId} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="px-4 py-3 font-bold text-center">#{team.rank}</td>
                      <td className="px-4 py-3 font-bold">{team.teamName}</td>
                      <td className="px-4 py-3 text-center text-text-secondary">{team.matchesPlayed}</td>
                      <td className="px-4 py-3 text-center text-text-secondary">{team.totalKills}</td>
                      <td className="px-4 py-3 text-center text-text-secondary">{team.totalPlacementPoints}</td>
                      <td className="px-4 py-3 text-center font-black text-primary">{team.totalPoints}</td>
                    </tr>
                  ))}
                  {standings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-text-secondary">No final standings available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showExport && (
        <ExportWizard 
          tournament={tournament}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
};

export default TournamentPreviewModal;
