import { database } from '../firebase/config';
import { ref, query, orderByChild, equalTo, onValue, push, set } from 'firebase/database';
import { TOURNAMENT_STATUS } from '../../constants/tournamentStatus';

const getTournamentsRef = (userId) => ref(database, `users/${userId}/tournaments`);

/**
 * Subscribes to only COMPLETED tournaments efficiently using Firebase server-side filtering.
 */
export const subscribeToHistory = (userId, callback) => {
  if (!userId) return () => {};
  
  const historyQuery = query(
    getTournamentsRef(userId), 
    orderByChild('metadata/status'), 
    equalTo(TOURNAMENT_STATUS.COMPLETED)
  );

  const unsubscribe = onValue(historyQuery, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const tournamentsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      callback(tournamentsArray);
    } else {
      callback([]);
    }
  });

  return unsubscribe;
};

/**
 * Duplicates a completed tournament into a fresh Draft.
 * Copies configurations and teams, but securely resets all match data and timestamps.
 */
export const duplicateTournamentToDraft = async (userId, originalTournament) => {
  const newRef = push(getTournamentsRef(userId));
  const newTournamentId = newRef.key;
  const timestamp = new Date().toISOString();

  // Reset team scores but keep their metadata
  const cleanTeams = { ...originalTournament.teams };
  Object.keys(cleanTeams).forEach(teamId => {
    cleanTeams[teamId].stats = {
      totalKills: 0,
      totalPlacementPoints: 0,
      totalPoints: 0,
      matchesPlayed: 0
    };
  });

  const payload = {
    metadata: {
      id: newTournamentId,
      name: `${originalTournament.metadata.name} (Copy)`,
      description: originalTournament.metadata.description || '',
      status: TOURNAMENT_STATUS.DRAFT,
      createdAt: timestamp,
      updatedAt: timestamp,
      matchCount: 0,
      completedMatches: 0,
      currentMatch: 1,
      createdBy: userId,
      isReadyForMatch: true
    },
    configuration: originalTournament.configuration,
    teams: cleanTeams,
    matches: {},
    overallResult: {},
    exports: {},
    history: {
      [Date.now()]: { action: 'DUPLICATED_FROM_HISTORY', originalId: originalTournament.metadata.id, timestamp }
    }
  };

  await set(newRef, payload);
  return newTournamentId;
};
