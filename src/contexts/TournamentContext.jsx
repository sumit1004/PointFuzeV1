import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase/config';
import { ref as dbRef, get } from 'firebase/database';
import { resultEngine } from '../services/result/resultEngine';
import { MATCH_STATUS } from '../constants/tournamentStatus';

const TournamentContext = createContext();

export const useTournament = () => useContext(TournamentContext);

// --- REDUCER ---
const tournamentReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'INIT_STATE':
      newState = action.payload;
      break;

    case 'ADD_MATCH': {
      const matchId = `match_${Date.now()}`;
      const matchNumber = Object.keys(state.matches || {}).length + 1;
      const newMatch = {
        metadata: { id: matchId, matchNumber, status: MATCH_STATUS.EDITING, mapName: `Match ${matchNumber}` },
        input: {},
        result: {},
        mvp: null
      };

      // Initialize inputs for all teams to 0
      Object.keys(state.teams || {}).forEach(teamId => {
        newMatch.input[teamId] = { placement: '', teamKills: '', playerKills: {} };
      });

      newState = {
        ...state,
        matches: { ...(state.matches || {}), [matchId]: newMatch }
      };
      break;
    }

    case 'UPDATE_MATCH_INPUT': {
      const { matchId, teamId, inputData } = action.payload;
      const match = state.matches[matchId];
      if (!match || match.metadata.status === MATCH_STATUS.COMPLETED) return state;

      const updatedInput = {
        ...match.input,
        [teamId]: { ...(match.input[teamId] || {}), ...inputData }
      };

      // Recalculate match instantly
      const recalculatedMatch = resultEngine.calculateMatch(
        { ...match, input: updatedInput },
        state.teams,
        state.configuration.calculationMethod,
        state.configuration.pointConfig
      );

      newState = {
        ...state,
        matches: {
          ...state.matches,
          [matchId]: recalculatedMatch
        }
      };
      break;
    }

    case 'CHANGE_MATCH_STATUS': {
      const { matchId, status } = action.payload;
      const match = state.matches[matchId];
      if (!match) return state;

      newState = {
        ...state,
        matches: {
          ...state.matches,
          [matchId]: {
            ...match,
            metadata: { ...match.metadata, status }
          }
        }
      };
      break;
    }

    case 'DUPLICATE_MATCH': {
      const { sourceMatchId } = action.payload;
      const sourceMatch = state.matches[sourceMatchId];
      if (!sourceMatch) return state;

      const newMatchId = `match_${Date.now()}`;
      const matchNumber = Object.keys(state.matches || {}).length + 1;

      const duplicatedMatch = {
        ...sourceMatch,
        metadata: { ...sourceMatch.metadata, id: newMatchId, matchNumber, status: MATCH_STATUS.EDITING, mapName: `${sourceMatch.metadata.mapName} (Copy)` }
      };

      newState = {
        ...state,
        matches: { ...state.matches, [newMatchId]: duplicatedMatch }
      };
      break;
    }

    case 'DELETE_MATCH': {
      const { matchId } = action.payload;
      const newMatches = { ...state.matches };
      delete newMatches[matchId];
      
      newState = {
        ...state,
        matches: newMatches
      };
      break;
    }

    case 'CALCULATE_OVERALL': {
      const overall = resultEngine.calculateOverall(state.matches, state.teams);
      newState = {
        ...state,
        overallResult: overall
      };
      break;
    }

    default:
      return state;
  }

  // Backup to localStorage on every state change (excluding initial load to avoid overwriting with old data immediately)
  if (action.type !== 'INIT_STATE') {
    localStorage.setItem(`pointfuze_backup_${newState.metadata.id}`, JSON.stringify(newState));
  }

  return newState;
};

// --- PROVIDER ---
export const TournamentProvider = ({ tournamentId, children }) => {
  const { user } = useAuth();
  const [tournament, dispatch] = useReducer(tournamentReducer, null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !tournamentId) {
      setLoading(false);
      return;
    }

    const loadTournament = async () => {
      setLoading(true);
      
      // 1. Check LocalStorage for disaster recovery
      const localBackup = localStorage.getItem(`pointfuze_backup_${tournamentId}`);
      if (localBackup) {
        try {
          const parsed = JSON.parse(localBackup);
          dispatch({ type: 'INIT_STATE', payload: parsed });
          setLoading(false);
          return;
        } catch (e) {
          console.warn('Failed to parse local backup', e);
        }
      }

      // 2. Fallback to fetching once from Firebase
      try {
        const tRef = dbRef(database, `users/${user.uid}/tournaments/${tournamentId}`);
        const snapshot = await get(tRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Initialize matches object if it doesn't exist
          if (!data.matches) data.matches = {};
          if (!data.overallResult) data.overallResult = {};
          
          dispatch({ type: 'INIT_STATE', payload: data });
          setError(null);
        } else {
          setError('Tournament not found');
        }
      } catch (err) {
        console.error("Error fetching tournament:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, [user, tournamentId]);

  return (
    <TournamentContext.Provider value={{ tournament, dispatch, loading, error }}>
      {children}
    </TournamentContext.Provider>
  );
};
