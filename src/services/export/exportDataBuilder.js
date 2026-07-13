/**
 * Maps complex Tournament Data into the generic string-dictionary format expected by TemplateCompiler.
 */
export const buildExportData = (tournament, contextType, matchId = null) => {
  const baseData = {
    TOURNAMENT_NAME: tournament.metadata?.name || 'Tournament',
    GAME_NAME: tournament.metadata?.game || 'Unknown Game',
  };

  if (contextType === 'MATCH' && matchId) {
    const match = tournament.matches.find(m => m.id === matchId);
    if (!match) throw new Error('Match not found');

    return {
      ...baseData,
      MATCH_NUMBER: `Match ${match.matchNumber}`,
      MATCH_DATE: new Date().toLocaleDateString(), // Or use match.date if available
      MAP_NAME: match.map || 'Unknown Map',
      
      // Inject the leaderboard directly into the payload format expected by widgets
      _leaderboardData: match.result || [],
      
      // Inject MVP data if available
      _mvpData: match.mvp ? { name: match.mvp.playerName, team: match.mvp.teamName, kills: match.mvp.kills, damage: match.mvp.damage } : null
    };
  }

  if (contextType === 'OVERALL') {
    return {
      ...baseData,
      MATCH_NUMBER: 'Overall Standings',
      MATCH_DATE: new Date().toLocaleDateString(),
      MAP_NAME: 'All Maps',
      
      _leaderboardData: tournament.overallStandings || []
    };
  }

  return baseData;
};
