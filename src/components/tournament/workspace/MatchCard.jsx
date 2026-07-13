import React, { useMemo } from 'react';
import { useTournament } from '../../../contexts/TournamentContext';
import { MATCH_STATUS } from '../../../constants/tournamentStatus';
import { Trophy, Target, Hash } from 'lucide-react';

const MatchCard = ({ matchId }) => {
  const { tournament, dispatch } = useTournament();
  const match = tournament.matches[matchId];
  const method = tournament.configuration.calculationMethod;
  const isEditing = match.metadata.status === MATCH_STATUS.EDITING;

  const handleInputChange = (teamId, field, value, playerId = null) => {
    const inputData = {};
    if (playerId) {
      inputData.playerKills = {
        ...(match.input[teamId]?.playerKills || {}),
        [playerId]: value
      };
    } else {
      inputData[field] = value;
    }

    dispatch({
      type: 'UPDATE_MATCH_INPUT',
      payload: { matchId, teamId, inputData }
    });
  };

  // Convert teams to an array and sort by displayOrder
  const sortedTeams = useMemo(() => {
    return Object.values(tournament.teams || {}).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [tournament.teams]);

  if (!match) return null;

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)]">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.05)] text-sm font-semibold text-text-secondary">
            <th className="p-3 sticky left-0 bg-[#1a1a1a] z-10 w-16 text-center">Rank</th>
            <th className="p-3 sticky left-16 bg-[#1a1a1a] z-10 w-48">Team</th>
            
            {/* Dynamic Headers based on Method */}
            {method === 'excel_players' && (
              <th className="p-3 border-l border-[rgba(255,255,255,0.05)] text-center">Player Kills</th>
            )}
            
            {(method === 'excel_players' || method === 'team_names_only') && (
              <th className="p-3 border-l border-[rgba(255,255,255,0.05)] text-center w-24"><Target size={16} className="inline mr-1" /> Kills</th>
            )}
            
            {method !== 'direct_score' && (
              <th className="p-3 border-l border-[rgba(255,255,255,0.05)] text-center w-24"><Hash size={16} className="inline mr-1" /> Place</th>
            )}

            {method === 'direct_score' && (
              <th className="p-3 border-l border-[rgba(255,255,255,0.05)] text-center w-32"><Trophy size={16} className="inline mr-1" /> Points</th>
            )}

            {/* Read-only Result Columns */}
            {method !== 'direct_score' && (
              <th className="p-3 border-l border-[rgba(255,255,255,0.05)] text-center bg-[rgba(255,122,0,0.05)] w-24">KP</th>
            )}
            {method !== 'direct_score' && (
              <th className="p-3 text-center bg-[rgba(255,122,0,0.05)] w-24">PP</th>
            )}
            <th className="p-3 text-center bg-[rgba(255,122,0,0.1)] text-primary w-24">Total</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => {
            const teamInput = match.input[team.id] || {};
            const teamResult = match.result[team.id] || {};
            
            return (
              <tr key={team.id} className="border-b border-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="p-3 sticky left-0 bg-[#1a1a1a] z-10 text-center font-bold text-text-secondary">
                  {teamResult.rank || '-'}
                </td>
                <td className="p-3 sticky left-16 bg-[#1a1a1a] z-10 font-medium truncate">
                  {team.name}
                </td>

                {/* Player Kills (Method 1) */}
                {method === 'excel_players' && (
                  <td className="p-2 border-l border-[rgba(255,255,255,0.05)]">
                    <div className="flex gap-2 flex-wrap justify-center">
                      {(team.players || []).map(player => (
                        <div key={player.id} className="flex items-center gap-1 bg-[rgba(255,255,255,0.03)] px-2 py-1 rounded">
                          <span className="text-xs text-text-secondary truncate max-w-[80px]" title={player.ign}>{player.ign}</span>
                          <input 
                            type="number"
                            min="0"
                            disabled={!isEditing}
                            value={(teamInput.playerKills && teamInput.playerKills[player.id]) || ''}
                            onChange={(e) => handleInputChange(team.id, 'playerKills', e.target.value, player.id)}
                            className="w-12 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded px-1 py-0.5 text-center text-sm focus:border-primary focus:outline-none disabled:opacity-50"
                            tabIndex={isEditing ? 1 : -1}
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                )}

                {/* Team Kills (Method 1 & 2) */}
                {(method === 'excel_players' || method === 'team_names_only') && (
                  <td className="p-3 border-l border-[rgba(255,255,255,0.05)] text-center">
                    {method === 'team_names_only' ? (
                      <input 
                        type="number"
                        min="0"
                        disabled={!isEditing}
                        value={teamInput.teamKills || ''}
                        onChange={(e) => handleInputChange(team.id, 'teamKills', e.target.value)}
                        className="w-16 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1 text-center focus:border-primary focus:outline-none mx-auto block disabled:opacity-50"
                        tabIndex={isEditing ? 1 : -1}
                      />
                    ) : (
                      <span className="font-medium text-text-secondary">{teamResult.totalKills || 0}</span>
                    )}
                  </td>
                )}

                {/* Placement (Method 1 & 2) */}
                {method !== 'direct_score' && (
                  <td className="p-3 border-l border-[rgba(255,255,255,0.05)] text-center">
                    <input 
                      type="number"
                      min="1"
                      disabled={!isEditing}
                      value={teamInput.placement || ''}
                      onChange={(e) => handleInputChange(team.id, 'placement', e.target.value)}
                      className="w-16 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1 text-center focus:border-primary focus:outline-none mx-auto block disabled:opacity-50"
                      tabIndex={isEditing ? 1 : -1}
                    />
                  </td>
                )}

                {/* Direct Points (Method 3) */}
                {method === 'direct_score' && (
                  <td className="p-3 border-l border-[rgba(255,255,255,0.05)] text-center">
                    <input 
                      type="number"
                      disabled={!isEditing}
                      value={teamInput.totalPoints || ''}
                      onChange={(e) => handleInputChange(team.id, 'totalPoints', e.target.value)}
                      className="w-20 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded px-2 py-1 text-center focus:border-primary focus:outline-none mx-auto block disabled:opacity-50"
                      tabIndex={isEditing ? 1 : -1}
                    />
                  </td>
                )}

                {/* Live Results Columns */}
                {method !== 'direct_score' && (
                  <td className="p-3 border-l border-[rgba(255,255,255,0.05)] text-center bg-[rgba(255,122,0,0.02)] text-text-secondary">
                    {teamResult.killPoints || 0}
                  </td>
                )}
                {method !== 'direct_score' && (
                  <td className="p-3 text-center bg-[rgba(255,122,0,0.02)] text-text-secondary">
                    {teamResult.placementPoints || 0}
                  </td>
                )}
                <td className="p-3 text-center bg-[rgba(255,122,0,0.05)] font-bold text-primary">
                  {teamResult.totalPoints || 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(MatchCard);
