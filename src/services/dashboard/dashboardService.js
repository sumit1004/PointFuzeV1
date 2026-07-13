import { database } from '../firebase/config';
import { ref as dbRef, onValue } from 'firebase/database';

/**
 * Realtime listener for user dashboard stats.
 * Uses onValue to keep data in sync automatically.
 * @param {string} userId - The Firebase UID
 * @param {function} callback - Callback function receiving the stats data
 * @returns {function} unsubscribe function
 */
export const listenToDashboardStats = (userId, callback) => {
  if (!userId) return () => {};

  const statsRef = dbRef(database, `users/${userId}/stats`);
  
  const unsubscribe = onValue(statsRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      // Default empty stats if none exist
      callback({
        total_tournaments: 0,
        total_matches: 0,
        total_images: 0
      });
    }
  }, (error) => {
    console.error("Error listening to dashboard stats:", error);
    callback(null);
  });

  return unsubscribe;
};

/**
 * Realtime listener for recent activity.
 * @param {string} userId - The Firebase UID
 * @param {function} callback - Callback function receiving the activity array
 * @returns {function} unsubscribe function
 */
export const listenToRecentActivity = (userId, callback) => {
  if (!userId) return () => {};

  const activityRef = dbRef(database, `users/${userId}/activity`);
  
  const unsubscribe = onValue(activityRef, (snapshot) => {
    if (snapshot.exists()) {
      // Convert object to array and sort if needed
      const data = snapshot.val();
      const activityArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      callback(activityArray);
    } else {
      callback([]);
    }
  }, (error) => {
    console.error("Error listening to recent activity:", error);
    callback([]);
  });

  return unsubscribe;
};
