import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase/config';
import { ref as dbRef, onValue } from 'firebase/database';

const TournamentContext = createContext();

export const useTournament = () => {
  return useContext(TournamentContext);
};

export const TournamentProvider = ({ tournamentId, children }) => {
  const { user } = useAuth();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !tournamentId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const tRef = dbRef(database, `users/${user.uid}/tournaments/${tournamentId}`);
    
    const unsubscribe = onValue(tRef, (snapshot) => {
      if (snapshot.exists()) {
        setTournament(snapshot.val());
        setError(null);
      } else {
        setTournament(null);
        setError('Tournament not found');
      }
      setLoading(false);
    }, (err) => {
      console.error("Error fetching tournament:", err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, tournamentId]);

  return (
    <TournamentContext.Provider value={{ tournament, loading, error }}>
      {children}
    </TournamentContext.Provider>
  );
};
