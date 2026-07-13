export const generateOverallStandings = (matches, teams) => {
  if (!matches || !teams) return {};

  const aggregatedData = {};

  // Initialize aggregation object for every team
  Object.values(teams).forEach(team => {
    aggregatedData[team.id] = {
      teamId: team.id,
      displayOrder: team.displayOrder || 999,
      matchesPlayed: 0,
      totalKills: 0,
      killPoints: 0,
      placementPoints: 0,
      totalPoints: 0,
      // Track match-by-match points for future trendlines
      matchHistory: []
    };
  });

  // Aggregate only from COMPLETED matches
  Object.values(matches).forEach(match => {
    if (match.metadata.status !== 'COMPLETED' || !match.result) return;

    Object.entries(match.result).forEach(([teamId, matchResult]) => {
      if (aggregatedData[teamId]) {
        aggregatedData[teamId].matchesPlayed += 1;
        aggregatedData[teamId].totalKills += matchResult.totalKills || 0;
        aggregatedData[teamId].killPoints += matchResult.killPoints || 0;
        aggregatedData[teamId].placementPoints += matchResult.placementPoints || 0;
        aggregatedData[teamId].totalPoints += matchResult.totalPoints || 0;
        
        aggregatedData[teamId].matchHistory.push({
          matchId: match.metadata.id,
          matchNumber: match.metadata.matchNumber,
          points: matchResult.totalPoints || 0
        });
      }
    });
  });

  const standingsArray = Object.values(aggregatedData);

  // Apply Tie-Breaker Logic
  standingsArray.sort((a, b) => {
    // 1. Highest Total Points
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    
    // 2. Highest Placement Points
    if (b.placementPoints !== a.placementPoints) return b.placementPoints - a.placementPoints;
    
    // 3. Highest Kill Points
    if (b.killPoints !== a.killPoints) return b.killPoints - a.killPoints;
    
    // 4. Stable ID fallback (displayOrder)
    return a.displayOrder - b.displayOrder;
  });

  // Format final leaderboard with ranks
  const leaderboard = {};
  standingsArray.forEach((teamData, index) => {
    leaderboard[teamData.teamId] = {
      ...teamData,
      rank: index + 1
    };
  });

  return {
    leaderboard,
    summary: {
      matchesCount: Object.values(matches).filter(m => m.metadata.status === 'COMPLETED').length,
      lastCalculated: new Date().toISOString()
    }
  };
};
