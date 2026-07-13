import React from 'react';
import { useTournament } from '../../../contexts/TournamentContext';
import { Trophy, Target, Hash } from 'lucide-react';

const OverallTable = () => {
  const { tournament } = useTournament();
  
  if (!tournament || !tournament.overallResult || !tournament.overallResult.leaderboard) {
    return (
      <div className="text-center py-12 text-text-secondary animate-fade-in">
        <Trophy size={48} className="mx-auto mb-4 opacity-20" />
        <p>No completed matches found.</p>
        <p className="text-sm">Scores will appear here once matches are marked as COMPLETED.</p>
      </div>
    );
  }

  const method = tournament.configuration.calculationMethod;
  const leaderboardArray = Object.values(tournament.overallResult.leaderboard).sort((a, b) => a.rank - b.rank);
  const { teams } = tournament;

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)] animate-fade-in">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.05)] text-sm font-semibold text-text-secondary">
            <th className="p-4 sticky left-0 bg-[#1a1a1a] z-10 w-16 text-center">Rank</th>
            <th className="p-4 sticky left-16 bg-[#1a1a1a] z-10 w-64">Team</th>
            <th className="p-4 border-l border-[rgba(255,255,255,0.05)] text-center">Matches</th>
            
            {method !== 'direct_score' && (
              <>
                <th className="p-4 text-center"><Target size={16} className="inline mr-1" /> Kills</th>
                <th className="p-4 text-center">KP</th>
                <th className="p-4 text-center">PP</th>
              </>
            )}
            
            <th className="p-4 text-center bg-[rgba(255,122,0,0.1)] text-primary text-base"><Trophy size={16} className="inline mr-1" /> Total</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardArray.map((row) => {
            const team = teams[row.teamId];
            if (!team) return null;

            return (
              <tr key={row.teamId} className="border-b border-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="p-4 sticky left-0 bg-[#1a1a1a] z-10 text-center">
                  <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full font-bold
                    ${row.rank === 1 ? 'bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 
                      row.rank === 2 ? 'bg-gray-300 text-black' : 
                      row.rank === 3 ? 'bg-amber-700 text-white' : 
                      'text-text-secondary'}`}
                  >
                    {row.rank}
                  </div>
                </td>
                <td className="p-4 sticky left-16 bg-[#1a1a1a] z-10 font-bold text-lg truncate">
                  {team.name}
                </td>
                
                <td className="p-4 border-l border-[rgba(255,255,255,0.05)] text-center font-medium text-text-secondary">
                  {row.matchesPlayed}
                </td>

                {method !== 'direct_score' && (
                  <>
                    <td className="p-4 text-center text-text-secondary">{row.totalKills}</td>
                    <td className="p-4 text-center text-text-secondary">{row.killPoints}</td>
                    <td className="p-4 text-center text-text-secondary">{row.placementPoints}</td>
                  </>
                )}

                <td className="p-4 text-center bg-[rgba(255,122,0,0.05)] font-black text-primary text-xl">
                  {row.totalPoints}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OverallTable;
