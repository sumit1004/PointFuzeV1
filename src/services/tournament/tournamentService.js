import { database } from '../firebase/config';
import { ref, push, set, update, remove, onValue, get } from 'firebase/database';
import { TOURNAMENT_STATUS } from '../../constants/tournamentStatus';

const getTournamentsRef = (userId) => ref(database, `users/${userId}/tournaments`);
const getTournamentRef = (userId, tournamentId) => ref(database, `users/${userId}/tournaments/${tournamentId}`);

export const initializeTournament = async (userId, data, teamsData = null) => {
  const newRef = push(getTournamentsRef(userId));
  const tournamentId = newRef.key;
  
  const timestamp = new Date().toISOString();
  
  // Format Teams using stable IDs instead of an array if they aren't already
  const formattedTeams = {};
  if (teamsData && Array.isArray(teamsData)) {
    teamsData.forEach((team, index) => {
      // Ensure team has a stable UUID, else generate one locally (though validation should provide it)
      const teamId = team.id || `team_${Date.now()}_${index}`;
      
      const formattedPlayers = {};
      if (team.players && Array.isArray(team.players)) {
        team.players.forEach((p, pIndex) => {
          const pId = p.id || `player_${Date.now()}_${pIndex}`;
          formattedPlayers[pId] = { ...p, id: pId };
        });
      }

      formattedTeams[teamId] = {
        ...team,
        id: teamId,
        displayOrder: team.displayOrder || index + 1,
        players: formattedPlayers
      };
    });
  }
  
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
      isReadyForMatch: !!teamsData && teamsData.length > 0
    },
    configuration: {
      game: data.game,
      calculationMethod: data.calculationMethod,
      pointConfigId: 'custom',
      pointConfig: data.pointConfig
    },
    teams: formattedTeams,
    matches: {},
    overallResult: {},
    exports: {},
    history: {
      [Date.now()]: { action: 'INITIALIZED', timestamp }
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
