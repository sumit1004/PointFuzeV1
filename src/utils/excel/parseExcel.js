import * as XLSX from 'xlsx';
import { GAME_LIST } from '../../constants/games';

export const parseExcel = (file, gameId) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to array of arrays
        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (!rawData || rawData.length < 2) {
          throw new Error('Excel file is empty or missing data rows.');
        }

        const game = GAME_LIST.find(g => g.id === gameId);
        const maxPlayers = game ? game.maxPlayersPerTeam : 4;
        
        // Remove header row and filter empty rows
        const rows = rawData.slice(1).filter(row => row.length > 0 && row.some(cell => !!cell));

        const parsedTeams = rows.map((row, index) => {
          const teamName = row[0]?.toString().trim() || '';
          const players = [];

          let colIndex = 1;
          for (let p = 1; p <= maxPlayers; p++) {
            const ign = row[colIndex]?.toString().trim() || '';
            const uid = row[colIndex + 1]?.toString().trim() || '';
            
            // Only push player if at least IGN or UID is provided
            if (ign || uid) {
              players.push({
                ign,
                uid
              });
            }
            colIndex += 2;
          }

          return {
            name: teamName,
            players
          };
        });

        resolve(parsedTeams);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};
