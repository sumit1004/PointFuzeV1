import { calculateKillPoints } from './killCalculator';
import { calculatePlacementPoints } from './placementCalculator';

export const generateMatchLeaderboard = (matchInput, teams, method, pointConfig) => {
  if (!matchInput || !teams) return {};

  const leaderboardArray = Object.values(teams).map(team => {
    const input = matchInput[team.id] || {};
    
    // Base Values
    const placement = parseInt(input.placement, 10) || 0;
    
    let totalKills = 0;
    if (input.playerKills && Object.keys(input.playerKills).length > 0) {
      totalKills = Object.values(input.playerKills).reduce((acc, curr) => acc + (parseInt(curr, 10) || 0), 0);
    } else {
      totalKills = parseInt(input.teamKills, 10) || 0;
    }

    let killPoints = 0;
    let placementPoints = 0;
    let totalPoints = 0;

    if (method === 'direct_score') {
      totalPoints = parseInt(input.totalPoints, 10) || 0;
    } else {
      killPoints = calculateKillPoints(input, method, pointConfig);
      placementPoints = calculatePlacementPoints(placement, pointConfig);
      totalPoints = killPoints + placementPoints;
    }

    return {
      teamId: team.id,
      displayOrder: team.displayOrder || 999,
      placement,
      totalKills,
      killPoints,
      placementPoints,
      totalPoints
    };
  });

  // Sort with Tie-Breaker Logic
  leaderboardArray.sort((a, b) => {
    // 1. Highest Total Points
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    
    // 2. Highest Placement Points (Survival bias)
    if (b.placementPoints !== a.placementPoints) return b.placementPoints - a.placementPoints;
    
    // 3. Highest Kill Points
    if (b.killPoints !== a.killPoints) return b.killPoints - a.killPoints;
    
    // 4. Stable ID fallback (displayOrder)
    return a.displayOrder - b.displayOrder;
  });

  // Re-map into key-value result object with assigned ranks
  const resultObject = {};
  leaderboardArray.forEach((teamData, index) => {
    resultObject[teamData.teamId] = {
      ...teamData,
      rank: index + 1
    };
  });

  return resultObject;
};
