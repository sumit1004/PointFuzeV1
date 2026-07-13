import { database } from '../firebase/config';
import { ref, push, serverTimestamp } from 'firebase/database';

/**
 * Logs export metadata for future analytics without saving the heavy image file.
 */
export const logExportAnalytics = async (uid, tournamentId, templateId, exportContext) => {
  if (!uid) return;
  
  try {
    const exportsRef = ref(database, `users/${uid}/exports`);
    await push(exportsRef, {
      tournamentId,
      templateId,
      context: exportContext, // 'MATCH' or 'OVERALL'
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Failed to log export analytics", error);
    // Non-blocking, so we don't throw
  }
};
