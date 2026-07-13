import { DEFAULT_POINTS } from '../../constants/defaultPoints';

export const getDefaultForGame = (gameId) => {
  if (!gameId) return null;
  const normalizedGameId = gameId.toLowerCase();
  
  // Return a deep copy so we don't mutate constants
  const defaults = DEFAULT_POINTS[normalizedGameId];
  if (!defaults) return null;

  return JSON.parse(JSON.stringify(defaults));
};

export const generateConfigFromTemplate = (gameId, customOverrides = {}) => {
  const base = getDefaultForGame(gameId);
  if (!base) return customOverrides;

  return {
    ...base,
    ...customOverrides,
    placements: {
      ...base.placements,
      ...(customOverrides.placements || {})
    }
  };
};
