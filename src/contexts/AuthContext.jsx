import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../services/firebase/config';
import { ref as dbRef, onValue } from 'firebase/database';
import { updateUserLastLogin } from '../services/firebase/database';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeDB = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          await updateUserLastLogin(currentUser.uid);
        } catch (error) {
          console.error("Failed to update last login", error);
        }

        // Realtime listener for the user's database document
        const userRef = dbRef(database, `users/${currentUser.uid}`);
        unsubscribeDB = onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setUserData(null);
          }
          setLoading(false);
        });

      } else {
        setUserData(null);
        setLoading(false);
        if (unsubscribeDB) {
          unsubscribeDB();
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDB) {
        unsubscribeDB();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
