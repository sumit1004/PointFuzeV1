export const detectMVP = (matchInput, method) => {
  if (method !== 'excel_players') return null; // Only Method 1 supports true player MVPs
  if (!matchInput) return null;

  let topPlayer = null;
  let maxKills = -1;

  Object.entries(matchInput).forEach(([teamId, teamInput]) => {
    if (teamInput.playerKills) {
      Object.entries(teamInput.playerKills).forEach(([playerId, killsStr]) => {
        const kills = parseInt(killsStr, 10) || 0;
        if (kills > maxKills) {
          maxKills = kills;
          topPlayer = { playerId, teamId, kills };
        }
      });
    }
  });

  return maxKills > 0 ? topPlayer : null;
};
