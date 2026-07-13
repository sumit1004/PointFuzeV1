import { ref, set, get, update } from 'firebase/database';
import { database } from './config';

export const createUserRecord = async (uid, userData) => {
  const userRef = ref(database, `users/${uid}`);
  await set(userRef, userData);
};

export const getUserRecord = async (uid) => {
  const userRef = ref(database, `users/${uid}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
};

export const updateUserLastLogin = async (uid) => {
  const userRef = ref(database, `users/${uid}`);
  await update(userRef, { lastLogin: new Date().toISOString() });
};
