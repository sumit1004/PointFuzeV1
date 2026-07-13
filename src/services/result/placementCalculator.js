export const calculatePlacementPoints = (placement, pointConfig) => {
  if (!placement || placement <= 0) return 0;

  const pInt = parseInt(placement, 10);
  
  // Point config placements array is 0-indexed (0 = 1st place)
  if (pointConfig.placements && pointConfig.placements.length >= pInt) {
    return parseInt(pointConfig.placements[pInt - 1], 10) || 0;
  }

  return 0;
};
