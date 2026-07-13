import { Trophy, Gamepad2, Calendar, Target } from 'lucide-react';

const HistoryStats = ({ tournaments }) => {
  const totalCompleted = tournaments.length;
  const totalMatches = tournaments.reduce((acc, curr) => acc + (curr.metadata.matchCount || 0), 0);
  
  // Find most played game
  const gameCounts = tournaments.reduce((acc, curr) => {
    const game = curr.configuration?.game || 'Unknown';
    acc[game] = (acc[game] || 0) + 1;
    return acc;
  }, {});
  const mostPlayedGame = Object.keys(gameCounts).reduce((a, b) => gameCounts[a] > gameCounts[b] ? a : b, 'N/A');

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="glass-panel p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-3 text-text-secondary mb-2">
          <Trophy size={16} />
          <span className="text-sm font-bold">Completed</span>
        </div>
        <div className="text-2xl font-black text-white">{totalCompleted}</div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-3 text-text-secondary mb-2">
          <Target size={16} />
          <span className="text-sm font-bold">Matches Played</span>
        </div>
        <div className="text-2xl font-black text-white">{totalMatches}</div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-3 text-text-secondary mb-2">
          <Gamepad2 size={16} />
          <span className="text-sm font-bold">Top Game</span>
        </div>
        <div className="text-xl font-black text-white truncate">{mostPlayedGame || 'N/A'}</div>
      </div>

      <div className="glass-panel p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-3 text-text-secondary mb-2">
          <Calendar size={16} />
          <span className="text-sm font-bold">Last Activity</span>
        </div>
        <div className="text-sm font-bold text-white">
          {tournaments.length > 0 ? new Date(Math.max(...tournaments.map(t => new Date(t.metadata.updatedAt)))).toLocaleDateString() : 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default HistoryStats;
