export const CALCULATION_METHODS = {
  EXCEL_PLAYERS: {
    id: 'excel_players',
    title: 'Excel + Players',
    description: 'Import player-level data via Excel. Highly automated.',
    advantages: ['No manual data entry', 'Tracks individual kills', 'Fastest for large events'],
  },
  TEAM_NAMES_ONLY: {
    id: 'team_names_only',
    title: 'Team Names Only',
    description: 'Manually enter Team Placements and Total Team Kills into a grid.',
    advantages: ['No Excel required', 'Simple to use', 'Good for small events'],
  },
  DIRECT_SCORE: {
    id: 'direct_score',
    title: 'Direct Score Entry',
    description: 'Manually type the final placement points and kill points.',
    advantages: ['Maximum control', 'Bypasses built-in calculators'],
  }
};

export const METHOD_LIST = Object.values(CALCULATION_METHODS);
