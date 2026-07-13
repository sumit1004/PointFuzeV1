import { generateMatchLeaderboard } from './leaderboardGenerator';
import { generateOverallStandings } from './overallResultGenerator';
import { detectMVP } from './mvpDetector';

export const resultEngine = {
  /**
   * Recalculates a single match based on its inputs.
   */
  calculateMatch: (matchData, teams, calculationMethod, pointConfig) => {
    const result = generateMatchLeaderboard(matchData.input, teams, calculationMethod, pointConfig);
    const mvp = detectMVP(matchData.input, calculationMethod);

    return {
      ...matchData,
      result,
      mvp
    };
  },

  /**
   * Aggregates all completed matches into the overall result.
   */
  calculateOverall: (allMatches, teams) => {
    return generateOverallStandings(allMatches, teams);
  }
};
