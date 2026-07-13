/**
 * Validates the inputs of a match before saving or marking as completed.
 */
export const validateMatchInput = (matchId, matchData, pointConfig) => {
  const errors = [];
  const warnings = [];
  
  if (!matchData.input) {
    errors.push({ type: 'MATCH', message: `Match ${matchData.metadata.matchNumber} is completely empty.` });
    return { isValid: false, errors, warnings };
  }

  const inputs = Object.values(matchData.input);
  const placements = new Set();
  
  inputs.forEach((teamInput, index) => {
    // Check Placements
    if (teamInput.placement) {
      const placementNum = parseInt(teamInput.placement, 10);
      if (placementNum <= 0) {
        errors.push({ type: 'PLACEMENT', message: `Invalid placement ${placementNum} detected.` });
      } else if (placements.has(placementNum)) {
        errors.push({ type: 'PLACEMENT', message: `Duplicate placement ${placementNum} detected.` });
      } else {
        placements.add(placementNum);
      }
    }

    // Check Negative Kills
    if (teamInput.teamKills !== undefined && parseInt(teamInput.teamKills, 10) < 0) {
      errors.push({ type: 'KILLS', message: `Negative team kills detected.` });
    }
    
    if (teamInput.playerKills) {
      Object.values(teamInput.playerKills).forEach(pKills => {
        if (parseInt(pKills, 10) < 0) {
          errors.push({ type: 'KILLS', message: `Negative player kills detected.` });
        }
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates an entire tournament state before Save & Exit.
 */
export const validateTournamentState = (localState, pointConfig) => {
  const errors = [];
  
  Object.entries(localState.matches).forEach(([matchId, matchData]) => {
    if (matchData.metadata.status === 'COMPLETED') {
      const { isValid, errors: matchErrors } = validateMatchInput(matchId, matchData, pointConfig);
      if (!isValid) {
        errors.push(...matchErrors.map(e => ({ ...e, message: `Match ${matchData.metadata.matchNumber}: ${e.message}` })));
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};
