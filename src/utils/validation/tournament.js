import { TOURNAMENT_STATUS } from '../../constants/tournamentStatus';
import { SUPPORTED_GAMES } from '../../constants/games';
import { CALCULATION_METHODS } from '../../constants/methods';

export const validateTournamentMetadata = (data) => {
  const errors = {};
  if (!data.name || data.name.trim() === '') errors.name = 'Tournament name is required';
  if (data.name && data.name.length > 50) errors.name = 'Name must be less than 50 characters';
  
  // Game and method are technically configuration, but checked here for basic validation
  if (!data.game || !SUPPORTED_GAMES[data.game.toUpperCase()]) errors.game = 'Invalid game selected';
  if (!data.calculationMethod || !Object.values(CALCULATION_METHODS).find(m => m.id === data.calculationMethod)) {
    errors.calculationMethod = 'Invalid calculation method';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePointConfig = (config) => {
  const errors = {};
  if (config.killPoint === undefined || config.killPoint < 0) errors.killPoint = 'Invalid kill point';
  
  if (!config.placements || Object.keys(config.placements).length === 0) {
    errors.placements = 'At least one placement point is required';
  } else {
    // Check if any placement is negative
    for (const [pos, pts] of Object.entries(config.placements)) {
      if (pts < 0) errors.placements = `Placement ${pos} cannot be negative`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
