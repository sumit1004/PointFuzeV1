export const calculateKillPoints = (teamInput, method, pointConfig) => {
  if (!teamInput) return 0;
  
  const multiplier = parseInt(pointConfig.killPoints || 1, 10);

  if (method === 'excel_players' || method === 'team_names_only') {
    // If playerKills exist (Method 1), sum them up. Otherwise use teamKills input (Method 2).
    let totalKills = 0;
    
    if (teamInput.playerKills && Object.keys(teamInput.playerKills).length > 0) {
      totalKills = Object.values(teamInput.playerKills).reduce((acc, curr) => acc + (parseInt(curr, 10) || 0), 0);
    } else {
      totalKills = parseInt(teamInput.teamKills, 10) || 0;
    }
    
    return totalKills * multiplier;
  }

  // Method 3 (Direct Score) has no kill points
  return 0;
};
