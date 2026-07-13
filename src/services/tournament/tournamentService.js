import { database } from '../firebase/config';
import { ref, push, set, update, remove, onValue, get } from 'firebase/database';
import { TOURNAMENT_STATUS } from '../../constants/tournamentStatus';

const getTournamentsRef = (userId) => ref(database, `users/${userId}/tournaments`);
const getTournamentRef = (userId, tournamentId) => ref(database, `users/${userId}/tournaments/${tournamentId}`);

export const createTournament = async (userId, data) => {
  const newRef = push(getTournamentsRef(userId));
  const tournamentId = newRef.key;
  
  const timestamp = new Date().toISOString();
  
  const payload = {
    metadata: {
      id: tournamentId,
      name: data.name,
      description: data.description || '',
      status: data.status || TOURNAMENT_STATUS.DRAFT,
      createdAt: timestamp,
      updatedAt: timestamp,
      matchCount: 0,
      completedMatches: 0,
      currentMatch: 1,
      createdBy: userId,
    },
    configuration: {
      game: data.game,
      calculationMethod: data.calculationMethod,
      pointConfigId: 'custom', // In the future, could link to a global template ID
      pointConfig: data.pointConfig // Embedded for now for simplicity
    },
    matches: {},
    results: {},
    history: {
      [Date.now()]: { action: 'CREATED', timestamp }
    }
  };

  await set(newRef, payload);
  return tournamentId;
};

export const updateTournament = async (userId, tournamentId, updates) => {
  const tRef = getTournamentRef(userId, tournamentId);
  const timestamp = new Date().toISOString();
  
  // updates should be an object mapping paths, e.g. { 'metadata/name': 'New Name', 'metadata/updatedAt': timestamp }
  const finalUpdates = {
    ...updates,
    'metadata/updatedAt': timestamp
  };

  await update(tRef, finalUpdates);
};

export const deleteTournament = async (userId, tournamentId) => {
  const tRef = getTournamentRef(userId, tournamentId);
  await remove(tRef);
};

export const subscribeToUserTournaments = (userId, callback) => {
  if (!userId) return () => {};
  
  const unsubscribe = onValue(getTournamentsRef(userId), (snapshot) => {
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

export const getTournament = async (userId, tournamentId) => {
  const snapshot = await get(getTournamentRef(userId, tournamentId));
  return snapshot.exists() ? snapshot.val() : null;
};
